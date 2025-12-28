import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ServiciosService } from './servicios.service';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { AuthGuard } from '@nestjs/passport';

import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtPayload } from 'src/interfaces/JwtPayload';

@UseGuards(AuthGuard('jwt')) // Proteccion de Rutas
@Controller('servicios')
export class ServiciosController {
  constructor(private readonly serviciosService: ServiciosService) {}

  @Post()
  crearServicio(
    @Body()
    createServicioDto: CreateServicioDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.serviciosService.create(createServicioDto, user.idEmpresa);
  }

  @Get()
  findAll(@CurrentUser() user: JwtPayload) {
    return this.serviciosService.findAll(user.idEmpresa);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.serviciosService.findOne(+id, user.idEmpresa);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateServicioDto: UpdateServicioDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.serviciosService.update(+id, user.idEmpresa, updateServicioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.serviciosService.remove(+id, user.idEmpresa);
  }
}
