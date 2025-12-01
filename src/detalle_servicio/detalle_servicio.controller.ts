import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetalleServicioService } from './detalle_servicio.service';
import { CreateDetalleServicioDto } from './dto/create-detalle_servicio.dto';
import { UpdateDetalleServicioDto } from './dto/update-detalle_servicio.dto';

@Controller('detalle-servicio')
export class DetalleServicioController {
  constructor(private readonly detalleServicioService: DetalleServicioService) {}

  @Post()
  create(@Body() createDetalleServicioDto: CreateDetalleServicioDto) {
    return this.detalleServicioService.create(createDetalleServicioDto);
  }

  @Get()
  findAll() {
    return this.detalleServicioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detalleServicioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetalleServicioDto: UpdateDetalleServicioDto) {
    return this.detalleServicioService.update(+id, updateDetalleServicioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detalleServicioService.remove(+id);
  }
}
