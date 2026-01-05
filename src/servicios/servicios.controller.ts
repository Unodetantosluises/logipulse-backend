import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseGuards,
  ParseIntPipe,
  Delete,
  Query,
} from '@nestjs/common';
import { ServiciosService } from './servicios.service';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { AuthGuard } from '@nestjs/passport';

import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtPayload } from 'src/interfaces/JwtPayload';
import { FilterServiciosDto } from './dto/filter-servicios.dto';

@UseGuards(AuthGuard('jwt')) // Proteccion de Rutas
@Controller('servicios')
export class ServiciosController {
  constructor(private readonly serviciosService: ServiciosService) {}

  @Post()
  create(
    @CurrentUser() user: JwtPayload,
    @Body() createServicioDto: CreateServicioDto,
  ) {
    return this.serviciosService.create(createServicioDto, user.idEmpresa);
  }

  @Get()
  findAll(
    @CurrentUser() user: JwtPayload,
    @Query() filterDto: FilterServiciosDto,
  ) {
    return this.serviciosService.findAll(user.idEmpresa, filterDto);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.serviciosService.findOne(id, user.idEmpresa);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: JwtPayload,
    @Body() updateServicioDto: UpdateServicioDto,
  ) {
    return this.serviciosService.update(id, updateServicioDto, user.idEmpresa);
  }

  @Patch(':id/cancelar')
  cancel(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.serviciosService.cancel(id, user.idEmpresa);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.serviciosService.remove(id, user.idEmpresa);
  }
}
