import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUnidadesTransporteDto } from './dto/create-unidades_transporte.dto';
import { UpdateUnidadesTransporteDto } from './dto/update-unidades_transporte.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UnidadesTransporte } from './entities/unidades_transporte.entity';
import { Chofer } from 'src/choferes/entities/chofere.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UnidadesTransporteService {
  // Logger para ver errores en la consola
  private readonly logger = new Logger('UnidadesTransporteService');

  constructor(
    @InjectRepository(UnidadesTransporte)
    private unidadesTransporteRepository: Repository<UnidadesTransporte>,
    @InjectRepository(Chofer)
    private choferRepository: Repository<Chofer>,
  ) {}

  // Crear una nueva unidad de transporte
  async create(
    createUnidadesTransporteDto: CreateUnidadesTransporteDto,
    idEmpresa: number,
  ) {
    try {
      // Crear la unidad de transporte asignada a la empresa autenticada
      const unidadTransporte = this.unidadesTransporteRepository.create({
        ...createUnidadesTransporteDto,
        idEmpresa,
      });

      // Guardar en la base de datos
      await this.unidadesTransporteRepository.save(unidadTransporte);

      // Retornar la unidad de transporte creada
      return {
        ...unidadTransporte,
        message: 'Unidad de transporte creada exitosamente',
      };
    } catch (error) {
      this.logger.error(error);
      throw new Error('Error al crear la unidad de transporte');
    }
  }

  // Obtener todas las unidades de transporte
  async findAll(idEmpresa: number) {
    return this.unidadesTransporteRepository.find({
      where: { idEmpresa, active: true },
      relations: ['chofer'],
    });
  }

  // Obtener una unidad de transporte por ID
  async findOne(id: number, idEmpresa: number) {
    // Buscar la unidad de transporte en la base de datos y que pertenezca a la empresa
    const unidadTransporte = await this.unidadesTransporteRepository.findOne({
      where: {
        idUnidadTransporte: id,
        idEmpresa: idEmpresa,
        active: true,
      },
      relations: ['chofer'],
    });
    // Si no existe o no pertenece a la empresa, lanzar un error
    if (!unidadTransporte) {
      throw new NotFoundException(
        `La unidad de transporte con ID ${id} no existe o no pertenece a tu empresa.`,
      );
    }
    // Retornar la unidad de transporte encontrada
    return unidadTransporte;
  }

  // Actualizar una unidad de transporte por ID
  async update(
    id: number,
    updateUnidadesTransporteDto: UpdateUnidadesTransporteDto,
    idEmpresa: number,
  ) {
    await this.findOne(id, idEmpresa);

    try {
      // Actualizar la unidad de transporte
      await this.unidadesTransporteRepository.update(
        { idUnidadTransporte: id },
        updateUnidadesTransporteDto,
      );

      // Retornar la unidad de transporte actualizada
      const updated = await this.findOne(id, idEmpresa);
      // Retornar el resultado
      return {
        ...updated,
        message: 'Unidad de transporte actualizada correctamente',
      };
    } catch (error) {
      this.logger.error(error);
      throw new Error('Error al actualizar la unidad de transporte');
    }
  }

  // Eliminar una unidad de transporte por ID
  async remove(id: number, idEmpresa: number) {
    await this.findOne(id, idEmpresa);

    try {
      // Soft delete
      await this.unidadesTransporteRepository.update(
        { idUnidadTransporte: id },
        { active: false, idChofer: null },
      );

      return { message: 'Unidad de transporte eliminada correctamente' };
    } catch (error) {
      this.logger.error(error);
      throw new Error('Error al eliminar la unidad de transporte');
    }
  }

  // Asignar un chofer a una unidad de transporte (1:1)
  async assignChoferToUnidad(
    idUnidad: number,
    idChofer: number,
    idEmpresa: number,
  ) {
    // 1. Validar Unidad
    // Nota: Tu findOne ya trae la relación 'chofer', así que podemos ver quién la maneja
    const unidad = await this.findOne(idUnidad, idEmpresa);

    // --- NUEVA VALIDACIÓN: ¿La unidad ya está ocupada? ---
    // Si la unidad tiene chofer Y ese chofer NO es el mismo que intentamos asignar...
    if (unidad.idChofer && unidad.idChofer !== idChofer) {
      // Lanzamos error indicando quién la está ocupando
      throw new ConflictException(
        `La unidad ${unidad.placas} ya está ocupada por el chofer ${unidad.chofer?.nombre}. Debes desvincularlo primero.`,
      );
    }
    // -----------------------------------------------------

    // 2. Validar Chofer (que exista, sea de la empresa y esté activo)
    const chofer = await this.choferRepository.findOneBy({
      idChofer: idChofer,
      idEmpresa,
      active: true,
    });

    if (!chofer) {
      throw new NotFoundException(`El chofer con ID ${idChofer} no existe.`);
    }

    // 3. Validar Disponibilidad del Chofer
    // Buscamos si este chofer está en OTRA unidad que esté ACTIVA
    const otraUnidad = await this.unidadesTransporteRepository.findOneBy({
      idChofer: idChofer,
      active: true,
    });

    // Si encontramos una unidad Y no es la misma a la que lo queremos subir...
    if (otraUnidad && otraUnidad.idUnidadTransporte !== idUnidad) {
      throw new ConflictException(
        `El chofer ${chofer.nombre} ya está asignado a la unidad ${otraUnidad.placas} (ID: ${otraUnidad.idUnidadTransporte}).`,
      );
    }

    // 4. Asignar
    try {
      unidad.chofer = chofer;
      unidad.idChofer = idChofer; // Aseguramos consistencia

      await this.unidadesTransporteRepository.save(unidad);

      return {
        message: 'Chofer asignado correctamente',
        unidad: { id: unidad.idUnidadTransporte, chofer: chofer.nombre },
      };
    } catch (error) {
      this.logger.error(error);
      throw new Error('Error al eliminar la unidad de transporte');
    }
  }

  async unassignChofer(idUnidad: number, idEmpresa: number) {
    // 1. Validar Unidad
    const unidad = await this.findOne(idUnidad, idEmpresa);

    unidad.chofer = null;
    unidad.idChofer = null;

    await this.unidadesTransporteRepository.save(unidad);

    return { message: 'Chofer Desvinculado de la unidad' };
  }
}
