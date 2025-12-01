import { Injectable } from '@nestjs/common';
import { CreateUnidadesTransporteDto } from './dto/create-unidades_transporte.dto';
import { UpdateUnidadesTransporteDto } from './dto/update-unidades_transporte.dto';

@Injectable()
export class UnidadesTransporteService {
  create(createUnidadesTransporteDto: CreateUnidadesTransporteDto) {
    return 'This action adds a new unidadesTransporte';
  }

  findAll() {
    return `This action returns all unidadesTransporte`;
  }

  findOne(id: number) {
    return `This action returns a #${id} unidadesTransporte`;
  }

  update(id: number, updateUnidadesTransporteDto: UpdateUnidadesTransporteDto) {
    return `This action updates a #${id} unidadesTransporte`;
  }

  remove(id: number) {
    return `This action removes a #${id} unidadesTransporte`;
  }
}
