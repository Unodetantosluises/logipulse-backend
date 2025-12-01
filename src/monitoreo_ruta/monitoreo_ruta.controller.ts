import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MonitoreoRutaService } from './monitoreo_ruta.service';
import { CreateMonitoreoRutaDto } from './dto/create-monitoreo_ruta.dto';
import { UpdateMonitoreoRutaDto } from './dto/update-monitoreo_ruta.dto';

@Controller('monitoreo-ruta')
export class MonitoreoRutaController {
  constructor(private readonly monitoreoRutaService: MonitoreoRutaService) {}

  @Post()
  create(@Body() createMonitoreoRutaDto: CreateMonitoreoRutaDto) {
    return this.monitoreoRutaService.create(createMonitoreoRutaDto);
  }

  @Get()
  findAll() {
    return this.monitoreoRutaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.monitoreoRutaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMonitoreoRutaDto: UpdateMonitoreoRutaDto) {
    return this.monitoreoRutaService.update(+id, updateMonitoreoRutaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.monitoreoRutaService.remove(+id);
  }
}
