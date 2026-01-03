import { Module } from '@nestjs/common';
import { UnidadesTransporte } from './entities/unidades_transporte.entity';
import { UnidadesTransporteService } from './unidades_transporte.service';
import { UnidadesTransporteController } from './unidades_transporte.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chofer } from 'src/choferes/entities/chofere.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UnidadesTransporte, Chofer])],
  controllers: [UnidadesTransporteController],
  providers: [UnidadesTransporteService],
  exports: [UnidadesTransporteService],
})
export class UnidadesTransporteModule {}
