import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateDetalleServicioDto } from './dto/create-detalle_servicio.dto';
import { UpdateDetalleServicioDto } from './dto/update-detalle_servicio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DetalleServicio } from './entities/detalle_servicio.entity';
import { Servicio } from 'src/servicios/entities/servicio.entity';
import { EstatusServicio } from 'src/common/enums/estatus-servicio.enum';

@Injectable()
export class DetalleServicioService {
  private readonly logger = new Logger('DetalleServicioService');

  constructor(
    @InjectRepository(DetalleServicio)
    private readonly detalleRepository: Repository<DetalleServicio>,
    @InjectRepository(Servicio)
    private readonly servicioRepository: Repository<Servicio>,
  ) {}

  async create(createDto: CreateDetalleServicioDto, idEmpresa: number) {
    // 1. Validar que el Servicio Padre exista y sea de la empresa
    const servicio = await this.servicioRepository.findOneBy({
      idServicio: createDto.idServicio,
      idEmpresa: idEmpresa,
    });

    if (!servicio) {
      throw new NotFoundException(
        `El servicio ID ${createDto.idServicio} no existe o no pertenece a tu empresa.`,
      );
    }

    // --- NUEVA VALIDACIÓN DE NEGOCIO ---
    // Si el servicio está cancelado (o Finalizado), no permitimos cambios.
    if (servicio.estatusServicio === EstatusServicio.CANCELADO) {
      throw new BadRequestException(
        'Operación no permitida: No se pueden agregar productos a un servicio CANCELADO.',
      );
    }

    // Tip Pro: Probablemente tampoco quieras agregar cosas si ya finalizó
    if (servicio.estatusServicio === EstatusServicio.ENTREGADO) {
      throw new BadRequestException(
        'Operación no permitida: El servicio ya ha FINALIZADO.',
      );
    }
    // -----------------------------------

    // 2. Crear el detalle
    try {
      const detalle = this.detalleRepository.create({
        ...createDto,
        cantidadRecibida: createDto.cantidadRecibida ?? 0,
      });

      await this.detalleRepository.save(detalle);

      return {
        ...detalle,
        message: 'Producto agregado al servicio correctamente',
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAllByServicio(idServicio: number, idEmpresa: number) {
    // Validamos propiedad del servicio primero
    const servicio = await this.servicioRepository.findOneBy({
      idServicio,
      idEmpresa,
    });
    if (!servicio) throw new BadRequestException('Servicio no válido');

    return this.detalleRepository.find({
      where: { idServicio },
    });
  }

  async update(
    id: number,
    updateDto: UpdateDetalleServicioDto,
    idEmpresa: number,
  ) {
    // Buscamos el detalle Y verificamos que el servicio padre sea de la empresa (Join implícito)
    const detalle = await this.detalleRepository.findOne({
      where: { idDetalle: id },
      relations: ['servicio'],
    });

    if (!detalle || detalle.servicio.idEmpresa !== idEmpresa) {
      throw new NotFoundException(
        `El detalle de servicio con ID ${id} no existe o no pertenece a la empresa.`,
      );
    }

    try {
      await this.detalleRepository.update({ idDetalle: id }, updateDto);
      return { message: 'Detalle actualizado' };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async remove(id: number, idEmpresa: number) {
    // Buscamos el detalle Y verificamos que el servicio padre sea de la empresa (Join implícito)
    const detalle = await this.detalleRepository.findOne({
      where: { idDetalle: id },
      relations: ['servicio'],
    });

    if (!detalle || detalle.servicio.idEmpresa !== idEmpresa) {
      throw new NotFoundException(
        `El detalle de servicio con ID ${id} no existe o no pertenece a la empresa.`,
      );
    }

    try {
      await this.detalleRepository.delete({ idDetalle: id });
      return { message: 'Producto eliminado del servicio correctamente.' };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  private handleDBErrors(error: any): never {
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Error inesperado en la base de datos.',
    );
  }
}
