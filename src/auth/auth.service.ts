import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EmpresasService } from '../empresas/empresas.service';
import { LoginAuthDto } from './login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly empresasService: EmpresasService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const { correoElectronico, contrasena } = loginAuthDto;

    const empresa =
      await this.empresasService.findOneByEmailForAuth(correoElectronico);

    if (!empresa) {
      throw new HttpException(
        'Credenciales inválidas (Correo no existe)',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isPasswordValid = bcrypt.compareSync(contrasena, empresa.contrasena);

    if (!isPasswordValid) {
      throw new HttpException(
        'Credenciales invalidas (Contraseña erronea)',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = {
      idEmpresa: empresa.idEmpresa,
      email: empresa.correoElectronico,
      nombre: empresa.nombreEmpresa,
    };
    const token = this.jwtService.sign(payload);

    return {
      empresa: {
        id: empresa.idEmpresa,
        email: empresa.correoElectronico,
        nombre: empresa.nombreEmpresa,
      },
      token: token,
    };
  }
}
