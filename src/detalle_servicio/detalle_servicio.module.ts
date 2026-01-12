import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleServicioService } from './detalle_servicio.service';
import { DetalleServicioController } from './detalle_servicio.controller';
import { DetalleServicio } from './entities/detalle_servicio.entity';
import { Servicio } from 'src/servicios/entities/servicio.entity';
@Module({
  imports: [TypeOrmModule.forFeature([DetalleServicio, Servicio])],
  controllers: [DetalleServicioController],
  providers: [DetalleServicioService],
  exports: [DetalleServicioService],
})
export class DetalleServicioModule {}
