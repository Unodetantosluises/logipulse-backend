import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleServicioService } from './detalle_servicio.service';
import { DetalleServicioController } from './detalle_servicio.controller';
import { DetalleServicio } from './entities/detalle_servicio.entity';
@Module({
  imports: [TypeOrmModule.forFeature([DetalleServicio])],
  controllers: [DetalleServicioController],
  providers: [DetalleServicioService],
  exports: [DetalleServicioService],
})
export class DetalleServicioModule {}
