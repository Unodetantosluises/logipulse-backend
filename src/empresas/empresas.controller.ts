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

@Controller('empresas')
export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) {}

  @Post()
  create(@Body() createEmpresaDto: CreateEmpresaDto) {
    return this.empresasService.create(createEmpresaDto);
  }

  @UseGuards(AuthGuard('jwt')) // Proteccion de Rutas
  @Get('perfil')
  getProfile(@CurrentUser() user: JwtPayload) {
    return this.empresasService.findOne(user.idEmpresa);
  }

  @UseGuards(AuthGuard('jwt')) // Proteccion de Rutas
  @Patch('perfil')
  updateProfile(
    @CurrentUser() user: JwtPayload,
    @Body() updateEmpresaDto: UpdateEmpresaDto,
  ) {
    return this.empresasService.update(user.idEmpresa, updateEmpresaDto);
  }

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
  remove(@Param('id') id: string) {
    return this.empresasService.remove(+id);
  }
}
