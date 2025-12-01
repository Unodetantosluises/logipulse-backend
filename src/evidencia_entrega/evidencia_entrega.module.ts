import { Module } from '@nestjs/common';
import { EvidenciaEntregaService } from './evidencia_entrega.service';
import { EvidenciaEntregaController } from './evidencia_entrega.controller';

@Module({
  controllers: [EvidenciaEntregaController],
  providers: [EvidenciaEntregaService],
})
export class EvidenciaEntregaModule {}
