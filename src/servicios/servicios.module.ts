import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiciosService } from './servicios.service';
import { ServiciosController } from './servicios.controller';
import { Servicio } from './entities/servicio.entity';
import { Chofer } from 'src/choferes/entities/chofere.entity';
import { UnidadesTransporte } from 'src/unidades_transporte/entities/unidades_transporte.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Servicio, Chofer, UnidadesTransporte])],
  controllers: [ServiciosController],
  providers: [ServiciosService],
  exports: [ServiciosModule],
})
export class ServiciosModule {}
