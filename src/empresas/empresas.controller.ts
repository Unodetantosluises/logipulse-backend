import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtPayload } from 'src/interfaces/JwtPayload';
import { UpdateEmpresaPasswordDto } from './dto/update-empresa-password.dto';

@Controller('empresas')
export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) {}

  // Ruta publica para crear una nueva empresa
  @Post()
  create(@Body() createEmpresaDto: CreateEmpresaDto) {
    return this.empresasService.create(createEmpresaDto);
  }

  // Ruta protegida para obtener el perfil de la empresa autenticada
  @UseGuards(AuthGuard('jwt')) // Proteccion de Rutas
  @Get('perfil')
  getProfile(@CurrentUser() user: JwtPayload) {
    return this.empresasService.findOne(user.idEmpresa);
  }

  // Ruta protegida pora actualizar el perfil de la empresa autenticada
  @UseGuards(AuthGuard('jwt')) // Proteccion de Rutas
  @Patch('perfil')
  updateProfile(
    @CurrentUser() user: JwtPayload,
    @Body() updateEmpresaDto: UpdateEmpresaDto,
  ) {
    return this.empresasService.update(user.idEmpresa, updateEmpresaDto);
  }

  // Ruta protegida para actualizar la contraseña de una empresa autenticada
  @UseGuards(AuthGuard('jwt')) // Proteccion de Rutas
  @Patch('perfil/password')
  updateProfilePassword(
    @CurrentUser() user: JwtPayload,
    @Body() updateProfilePasswordDto: UpdateEmpresaPasswordDto,
  ) {
    return this.empresasService.updateProfilePassword(
      user.idEmpresa,
      updateProfilePasswordDto,
    );
  }

  // Ruta portegida para eliminar el perfil de una empresa autenticada
  @UseGuards(AuthGuard('jwt')) // Proteccion de Rutas
  @Delete('perfil')
  deleteProfile(@CurrentUser() user: JwtPayload) {
    return this.empresasService.remove(user.idEmpresa);
  }

  // Rutas protegidas para SuperAdministrador(en dessarrollo futuro)
  // Solo el SuperAdmin podra ver una empresa, ver todas las empresas y eliminar o actualizar cualquier empresa
  @UseGuards(AuthGuard('jwt')) // Proteccion de Rutas
  @Get()
  findAll() {
    return this.empresasService.findAll();
  }

  @UseGuards(AuthGuard('jwt')) // Proteccion de Rutas
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    const idSolicitado = +id;
    if (idSolicitado !== user.idEmpresa) {
      throw new ForbiddenException(
        'No tienes permiso para ver la informacion de otra empresa.',
      );
    }
    return this.empresasService.findOne(idSolicitado);
  }

  @UseGuards(AuthGuard('jwt')) // Proteccion de Rutas
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmpresaDto: UpdateEmpresaDto) {
    return this.empresasService.update(+id, updateEmpresaDto);
  }

  @UseGuards(AuthGuard('jwt')) // Proteccion de Rutas
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    const idSolicitado = +id;
    if (idSolicitado !== user.idEmpresa) {
      throw new ForbiddenException(
        'No tienes permiso para realizar esta accion en otra empresa.',
      );
    }
    return this.empresasService.remove(idSolicitado);
  }
}
