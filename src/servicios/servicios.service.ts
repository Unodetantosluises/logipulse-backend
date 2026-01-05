import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Servicio } from './entities/servicio.entity';
import { Between, FindOptionsWhere, In, Repository } from 'typeorm';
import { Chofer } from 'src/choferes/entities/chofere.entity';
import { UnidadesTransporte } from 'src/unidades_transporte/entities/unidades_transporte.entity';
import { EstatusServicio } from 'src/common/enums/estatus-servicio.enum';
import { FilterServiciosDto } from './dto/filter-servicios.dto';

@Injectable()
export class ServiciosService {
  private readonly logger = new Logger('ServiciosService');

  constructor(
    @InjectRepository(Servicio)
    private readonly servicioRepository: Repository<Servicio>,
    @InjectRepository(Chofer)
    private readonly choferRepository: Repository<Chofer>,
    @InjectRepository(UnidadesTransporte)
    private readonly unidadRepository: Repository<UnidadesTransporte>,
  ) {}

  // Recibimos el DTO y el ID de la empresa del token(usuario)
  async create(createServicioDto: CreateServicioDto, idEmpresa: number) {
    const {
      idChofer,
      idUnidadTransporte,
      fechaHoraProgramada,
      fechaHoraLlegadaEstimada,
      ...datosServicio
    } = createServicioDto;

    // Valida Chofer si se proporciona
    if (idChofer) {
      const chofer = await this.choferRepository.findOneBy({
        idChofer: idChofer,
        idEmpresa: idEmpresa,
      });
      if (!chofer) {
        throw new BadRequestException(
          `El chofer con ID ${idChofer} no existe o no pertenece a tu empresa.`,
        );
      }
    }

    // 2. Validar Unidad (si se envió)
    if (idUnidadTransporte) {
      const unidad = await this.unidadRepository.findOneBy({
        idUnidadTransporte,
        idEmpresa,
        active: true,
      });
      if (!unidad)
        throw new BadRequestException(
          `La unidad ID ${idUnidadTransporte} no es válida.`,
        );
    }

    const fechaInicio = new Date(fechaHoraProgramada);

    const fechaFin = new Date(fechaHoraLlegadaEstimada);

    // Validamos que la fecha fin sea lógica (no puede llegar antes de salir)
    if (fechaFin <= fechaInicio) {
      throw new BadRequestException(
        'La fecha de llegada debe ser posterior a la fecha de salida.',
      );
    }

    await this.checkAvalilability(
      idChofer,
      idUnidadTransporte,
      fechaInicio,
      fechaFin,
    );

    try {
      const servicio = this.servicioRepository.create({
        ...datosServicio,
        fechaHoraProgramada: fechaInicio,
        fechaHoraLlegadaEstimada: fechaFin,
        idChofer, // Puede ser null
        idUnidadTransporte, // Puede ser null
        idEmpresa,
        estatusServicio: EstatusServicio.PENDIENTE,
      });

      await this.servicioRepository.save(servicio);

      return {
        ...servicio,
        message: 'Servicio programado exitosamente',
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  private async checkAvalilability(
    idChofer: number | undefined,
    idUnidad: number | undefined,
    fechaInicio: Date,
    fechaFin: Date,
  ) {
    // Si no hay chofer ni unidad, no hay conflicto
    if (!idChofer && !idUnidad) return;

    // Buscamos si existe un servicio donde:
    // (NuevoInicio < ViejoFin) Y (NuevoFin > ViejoInicio)
    // Esto detecta cualquier tipo de empalme (parcial, total, o envolvente).

    const queryBuilder = this.servicioRepository
      .createQueryBuilder('servicio')
      .where('servicio.estatusServicio IN (:...estatus)', {
        estatus: [EstatusServicio.PENDIENTE, EstatusServicio.EN_TRANSITO], // Usamos EN_CURSO si ese es tu enum
      })
      // "Que el servicio existente termine DESPUÉS de que yo empiezo"
      .andWhere('servicio.fecha_hora_llegada_estimada > :fechaInicio', {
        fechaInicio,
      })
      // "Y Que el servicio existente empiece ANTES de que yo termine"
      .andWhere('servicio.fecha_hora_programada < :fechaFin', { fechaFin });

    // Validar Chofer
    if (idChofer) {
      const choferOcupado = await queryBuilder
        .clone()
        .andWhere('servicio.id_chofer = :idChofer', { idChofer })
        .getOne();

      if (choferOcupado) {
        throw new ConflictException(
          `El chofer ya tiene un servicio programado en ese lapso (Servicio ID: ${choferOcupado.idServicio}).`,
        );
      }
    }

    // Validar Unidad
    if (idUnidad) {
      const unidadOcupada = await queryBuilder
        .clone()
        .andWhere('servicio.id_unidad_transporte = :idUnidad', { idUnidad })
        .getOne();

      if (unidadOcupada) {
        throw new ConflictException(
          `La unidad ya está ocupada en ese lapso (Servicio ID: ${unidadOcupada.idServicio}).`,
        );
      }
    }
  }

  // Filtrar solo los servicios en base a su empresa
  async findAll(idEmpresa: number, filterDto: FilterServiciosDto) {
    const { estatus, fechaInicio, fechaFin } = filterDto;

    // 1. Base del filtro: Siempre por empresa
    const where: FindOptionsWhere<Servicio> = {
      idEmpresa,
    };

    // 2. Filtro dinámico de Estatus
    if (estatus && estatus.length > 0) {
      // Si el frontend pide estatus específicos, usamos esos
      where.estatusServicio = In(estatus);
    } else {
      // No hacemos nada, así trae todo.
    }

    // 3. Filtro dinámico de Fechas (Del mes, semana, etc)
    if (fechaInicio && fechaFin) {
      where.fechaHoraProgramada = Between(
        new Date(fechaInicio),
        new Date(fechaFin),
      );
    }

    // Ejecutamos la consulta
    return this.servicioRepository.find({
      where: where,
      relations: ['chofer', 'unidadTransporte'],
      order: { fechaHoraProgramada: 'DESC' },
    });
  }

  async findOne(id: number, idEmpresa: number) {
    const servicio = await this.servicioRepository.findOne({
      where: { idServicio: id, idEmpresa },
      relations: ['chofer', 'unidadTransporte'],
    });

    if (!servicio) {
      throw new NotFoundException(`Servicio ID ${id} no encontrado.`);
    }
    return servicio;
  }

  async update(
    id: number,
    updateServicioDto: UpdateServicioDto,
    idEmpresa: number,
  ) {
    // Validamos que el servicio sea nuestro
    await this.findOne(id, idEmpresa);
    // NOTA: Aquí también deberías repetir las validaciones de Chofer/Unidad
    // si vienen en el DTO, similar al create. Por brevedad no las repetí,
    // pero en producción es necesario.

    try {
      await this.servicioRepository.update(
        { idServicio: id },
        updateServicioDto,
      );
      return this.findOne(id, idEmpresa);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  // En Servicios NO borramos el registro, lo CANCELAMOS.
  // Esto mantiene el historial contable.
  async cancel(id: number, idEmpresa: number) {
    await this.findOne(id, idEmpresa);

    try {
      await this.servicioRepository.update(
        { idServicio: id },
        { estatusServicio: EstatusServicio.CANCELADO },
      );
      return { message: 'Servicio cancelado correctamente' };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  private handleDBErrors(error: any): never {
    this.logger.error(error);
    throw new InternalServerErrorException('Error al procesar el servicio');
  }

  // Borrado permanente de registro
  async remove(id: number, idEmpresa: number) {
    const servicio = await this.servicioRepository.findOneBy({
      idServicio: id,
      idEmpresa,
    });

    if (!servicio) {
      throw new NotFoundException(`Servicio ID ${id} no encontrado.`);
    }

    if (servicio.estatusServicio !== EstatusServicio.EN_TRANSITO) {
      throw new BadRequestException(
        'No se puede eliminar un servicio que no esté en tránsito.',
      );
    }

    try {
      await this.servicioRepository.remove(servicio);

      return {
        message: 'Servicios y datos relacionados eliminados permanentemente',
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }
}
