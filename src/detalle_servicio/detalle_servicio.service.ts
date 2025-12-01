import { Injectable } from '@nestjs/common';
import { CreateDetalleServicioDto } from './dto/create-detalle_servicio.dto';
import { UpdateDetalleServicioDto } from './dto/update-detalle_servicio.dto';

@Injectable()
export class DetalleServicioService {
  create(createDetalleServicioDto: CreateDetalleServicioDto) {
    return 'This action adds a new detalleServicio';
  }

  findAll() {
    return `This action returns all detalleServicio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detalleServicio`;
  }

  update(id: number, updateDetalleServicioDto: UpdateDetalleServicioDto) {
    return `This action updates a #${id} detalleServicio`;
  }

  remove(id: number) {
    return `This action removes a #${id} detalleServicio`;
  }
}
