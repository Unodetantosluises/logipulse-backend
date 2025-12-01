import { Module } from '@nestjs/common';
import { MonitoreoRutaService } from './monitoreo_ruta.service';
import { MonitoreoRutaController } from './monitoreo_ruta.controller';

@Module({
  controllers: [MonitoreoRutaController],
  providers: [MonitoreoRutaService],
})
export class MonitoreoRutaModule {}
