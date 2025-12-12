import { Injectable } from '@nestjs/common';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Servicio } from './entities/servicio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServiciosService {
  constructor(
    @InjectRepository(Servicio)
    private readonly servicioRepository: Repository<Servicio>,
  ) {}

  // Recibimos el DTO y el ID de la empresa del token(usuario)
  async create(createServicioDto: CreateServicioDto, idEmpresa: number) {
    const nuevoServicio = this.servicioRepository.create({
      ...createServicioDto,
      idEmpresa: idEmpresa, // Asignacion Automatica Segura
    });

    return await this.servicioRepository.save(nuevoServicio);
  }

  // Filtrar solo los servicios en base a su empresa
  async findAll(idEmpresa: number) {
    return await this.servicioRepository.find({
      where: { idEmpresa: idEmpresa },
      order: { fechaHoraProgramada: 'DESC' },
    });
  }

  async findOne(id: number, idEmpresa: number) {
    return await this.servicioRepository.findOneBy({
      idServicio: id,
      idEmpresa: idEmpresa,
    });
  }

  async update(
    id: number,
    idEmpresa: number,
    updateServicioDto: UpdateServicioDto,
  ) {
    // Verificar que el servicio pertenece a la empresa
    const servicio = await this.servicioRepository.findOneBy({
      idServicio: id,
      idEmpresa: idEmpresa,
    });

    if (!servicio) {
      throw new Error(
        `El servicio con ID ${id} no existe o no pertenece a tu empresa.`,
      );
    }

    // Actualizar solo los campos proporcionados
    await this.servicioRepository.update({ idServicio: id }, updateServicioDto);

    // Retornar el servicio actualizado
    return await this.servicioRepository.findOneBy({
      idServicio: id,
      idEmpresa: idEmpresa,
    });
  }

  async remove(id: number, idEmpresa: number) {
    const servicio = await this.servicioRepository.findOneBy({
      idServicio: id,
      idEmpresa: idEmpresa,
    });

    if (!servicio) {
      throw new Error(
        `El servicio con ID ${id} no existe o no pertenece a tu empresa.`,
      );
    }

    return await this.servicioRepository.delete({ idServicio: id });
  }
}
