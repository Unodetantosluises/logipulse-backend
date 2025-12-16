import { Module } from '@nestjs/common';
import { UnidadesTransporte } from './entities/unidades_transporte.entity';
import { UnidadesTransporteService } from './unidades_transporte.service';
import { UnidadesTransporteController } from './unidades_transporte.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UnidadesTransporte])],
  controllers: [UnidadesTransporteController],
  providers: [UnidadesTransporteService],
  exports: [UnidadesTransporteService],
})
export class UnidadesTransporteModule {}
