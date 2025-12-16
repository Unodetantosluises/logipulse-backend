import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvidenciaEntregaService } from './evidencia_entrega.service';
import { EvidenciaEntregaController } from './evidencia_entrega.controller';
import { EvidenciaEntrega } from './entities/evidencia_entrega.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EvidenciaEntrega])],
  controllers: [EvidenciaEntregaController],
  providers: [EvidenciaEntregaService],
  exports: [EvidenciaEntregaService],
})
export class EvidenciaEntregaModule {}
