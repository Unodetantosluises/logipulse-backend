import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { ServiciosService } from './servicios.service';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { AuthGuard } from '@nestjs/passport';

interface AuthUser {
  idEmpresa: number;
  email: string;
  nombre: string;
}

type RequestWithUser = ExpressRequest & { user: AuthUser };

@UseGuards(AuthGuard('jwt')) // Proteccion de Rutas
@Controller('servicios')
export class ServiciosController {
  constructor(private readonly serviciosService: ServiciosService) {}

  @Post()
  create(
    @Body() createServicioDto: CreateServicioDto,
    @Req() req: RequestWithUser,
  ) {
    const idEmpresa = req.user.idEmpresa;
    return this.serviciosService.create(createServicioDto, idEmpresa);
  }

  @Get()
  findAll(@Req() req: RequestWithUser) {
    const idEmpresa = req.user.idEmpresa;
    return this.serviciosService.findAll(idEmpresa);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    const idEmpresa = req.user.idEmpresa;
    return this.serviciosService.findOne(+id, idEmpresa);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateServicioDto: UpdateServicioDto,
    @Req() req: RequestWithUser,
  ) {
    const idEmpresa = req.user.idEmpresa;
    return this.serviciosService.update(+id, idEmpresa, updateServicioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    const idEmpresa = req.user.idEmpresa;
    return this.serviciosService.remove(+id, idEmpresa);
  }
}
