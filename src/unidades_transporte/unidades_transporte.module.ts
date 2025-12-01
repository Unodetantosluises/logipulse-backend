import { Module } from '@nestjs/common';
import { UnidadesTransporteService } from './unidades_transporte.service';
import { UnidadesTransporteController } from './unidades_transporte.controller';

@Module({
  controllers: [UnidadesTransporteController],
  providers: [UnidadesTransporteService],
})
export class UnidadesTransporteModule {}
