import { Injectable } from '@nestjs/common';
import { CreateEvidenciaEntregaDto } from './dto/create-evidencia_entrega.dto';
import { UpdateEvidenciaEntregaDto } from './dto/update-evidencia_entrega.dto';

@Injectable()
export class EvidenciaEntregaService {
  create(createEvidenciaEntregaDto: CreateEvidenciaEntregaDto) {
    return 'This action adds a new evidenciaEntrega';
  }

  findAll() {
    return `This action returns all evidenciaEntrega`;
  }

  findOne(id: number) {
    return `This action returns a #${id} evidenciaEntrega`;
  }

  update(id: number, updateEvidenciaEntregaDto: UpdateEvidenciaEntregaDto) {
    return `This action updates a #${id} evidenciaEntrega`;
  }

  remove(id: number) {
    return `This action removes a #${id} evidenciaEntrega`;
  }
}
