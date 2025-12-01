import { Module } from '@nestjs/common';
import { DetalleServicioService } from './detalle_servicio.service';
import { DetalleServicioController } from './detalle_servicio.controller';

@Module({
  controllers: [DetalleServicioController],
  providers: [DetalleServicioService],
})
export class DetalleServicioModule {}
