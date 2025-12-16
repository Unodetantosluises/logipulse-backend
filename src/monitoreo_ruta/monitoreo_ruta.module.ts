import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitoreoRutaService } from './monitoreo_ruta.service';
import { MonitoreoRutaController } from './monitoreo_ruta.controller';
import { MonitoreoRuta } from './entities/monitoreo_ruta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MonitoreoRuta])],
  controllers: [MonitoreoRutaController],
  providers: [MonitoreoRutaService],
  exports: [MonitoreoRutaService],
})
export class MonitoreoRutaModule {}
