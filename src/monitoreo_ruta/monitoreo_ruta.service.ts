import { Injectable } from '@nestjs/common';
import { CreateMonitoreoRutaDto } from './dto/create-monitoreo_ruta.dto';
import { UpdateMonitoreoRutaDto } from './dto/update-monitoreo_ruta.dto';

@Injectable()
export class MonitoreoRutaService {
  create(createMonitoreoRutaDto: CreateMonitoreoRutaDto) {
    return 'This action adds a new monitoreoRuta';
  }

  findAll() {
    return `This action returns all monitoreoRuta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} monitoreoRuta`;
  }

  update(id: number, updateMonitoreoRutaDto: UpdateMonitoreoRutaDto) {
    return `This action updates a #${id} monitoreoRuta`;
  }

  remove(id: number) {
    return `This action removes a #${id} monitoreoRuta`;
  }
}
