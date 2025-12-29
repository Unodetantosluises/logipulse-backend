import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Empresa } from './entities/empresa.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UpdateEmpresaPasswordDto } from './dto/update-empresa-password.dto';

@Injectable()
export class EmpresasService {
  // Logger para ver errores en la consola
  private readonly logger = new Logger('EmpresasService');

  constructor(
    @InjectRepository(Empresa)
    private empresaRepository: Repository<Empresa>,
  ) {}

  async create(createEmpresaDto: CreateEmpresaDto) {
    try {
      const { contrasena, ...empresaData } = createEmpresaDto;

      const empresa = this.empresaRepository.create({
        ...empresaData,
        contrasena: bcrypt.hashSync(contrasena, 10),
      });

      await this.empresaRepository.save(empresa);

      const result = { ...empresa } as Partial<Empresa>;

      delete result.contrasena;

      return {
        ...result,
        message: 'Empresa creada exitosamente',
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  findAll() {
    return this.empresaRepository.find({ where: { active: true } });
  }

  async findOne(id: number) {
    const empresa = await this.empresaRepository.findOneBy({
      idEmpresa: id,
      active: true,
    });
    if (!empresa) {
      throw new BadRequestException(
        `La empresa con ID ${id} no existe o esta desactivada.`,
      );
    }
    return empresa;
  }

  async findOneByEmailForAuth(correo: string) {
    return this.empresaRepository
      .createQueryBuilder('empresa')
      .where('empresa.correoElectronico = :correo', { correo })
      .addSelect('empresa.contrasena')
      .getOne();
  }

  async update(id: number, updateEmpresaDto: UpdateEmpresaDto) {
    try {
      const empresa = await this.empresaRepository.findOneBy({ idEmpresa: id });
      if (!empresa) {
        throw new BadRequestException(`La empresa con ID ${id} no existe.`);
      }

      // Clonar DTO para manipular sin modificar el original
      const updateData = { ...updateEmpresaDto };

      // Aplica la actualizacion
      await this.empresaRepository.update({ idEmpresa: id }, updateData);

      // Obtiene la entidad actualizada
      const updated = await this.empresaRepository.findOneBy({ idEmpresa: id });

      // Elimina contraseña del resultado antes de devolver
      const result = { ...(updated as any) } as Partial<Empresa>;
      delete result.contrasena;

      return {
        ...result,
        message: 'Empresa actualizada correctamente',
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async updateProfilePassword(
    id: number,
    updateEmpresaPasswordDto: UpdateEmpresaPasswordDto,
  ) {
    // Busca la empresa con el id que se hace la peticion
    try {
      const empresa = await this.empresaRepository.findOneBy({ idEmpresa: id });
      if (!empresa) {
        throw new BadRequestException(`La empresa con ID ${id} no existe.`);
      }

      // Encriptamos la contraseña directamente
      const newPasswordHash = bcrypt.hashSync(
        updateEmpresaPasswordDto.contrasena,
        10,
      );

      // Actualizamos en base de datos
      await this.empresaRepository.update(
        { idEmpresa: id },
        { contrasena: newPasswordHash },
      );

      // Respuesta
      return {
        message: 'Contraseña actualizada correctamente',
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async remove(id: number) {
    try {
      const empresa = await this.empresaRepository.findOneBy({ idEmpresa: id });
      if (!empresa) {
        throw new BadRequestException(`La empresa con ID ${id} no existe.`);
      }

      if (!empresa.active) {
        return { message: 'La empresa ya está desactivada.' };
      }

      await this.empresaRepository.update({ idEmpresa: id }, { active: false });

      const updated = await this.empresaRepository.findOneBy({ idEmpresa: id });

      const result = { ...(updated as Partial<Empresa>) };
      // Asegura que no se exponga la contraseña
      delete result.contrasena;

      return {
        ...result,
        message: 'Empresa desactivada exitosamente',
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  private handleDBErrors(error: any): never {
    const dbError = error as { code?: string; detail?: string };

    if (dbError.code === '23505') {
      throw new BadRequestException(
        `Ya existe una empresa con ese registro(Verifica RFC, Correo o Telefono). Detalle: ${dbError.detail}`,
      );
    }
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Error inesperado, revise los logs del servidor.',
    );
  }
}
