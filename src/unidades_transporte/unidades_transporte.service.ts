import { Injectable, Logger } from '@nestjs/common';
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
    return this.unidadesTransporteRepository.find({ where: { idEmpresa } });
  }

  // Obtener una unidad de transporte por ID
  async findOne(id: number, idEmpresa: number) {
    // Buscar la unidad de transporte en la base de datos y que pertenezca a la empresa
    const unidadTransporte = await this.unidadesTransporteRepository.findOneBy({
      idUnidadTransporte: id,
      idEmpresa,
    });
    // Si no existe o no pertenece a la empresa, lanzar un error
    if (!unidadTransporte) {
      throw new Error(
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
    try {
      // Verificar que la unidad de transporte existe y pertenece a la empresa
      const unidadTransporte =
        await this.unidadesTransporteRepository.findOneBy({
          idUnidadTransporte: id,
          idEmpresa,
        });

      // Si no existe o no pertenece, lanzar un error
      if (!unidadTransporte) {
        throw new Error(
          `La unidad de transporte con ID ${id} no existe o no pertenece a tu empresa.`,
        );
      }

      // Actualizar la unidad de transporte
      await this.unidadesTransporteRepository.update(
        { idUnidadTransporte: id },
        updateUnidadesTransporteDto,
      );

      // Retornar la unidad de transporte actualizada
      const updated = await this.unidadesTransporteRepository.findOneBy({
        idUnidadTransporte: id,
        idEmpresa,
      });

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
    try {
      const unidadTransporte =
        await this.unidadesTransporteRepository.findOneBy({
          idUnidadTransporte: id,
          idEmpresa,
        });

      if (!unidadTransporte) {
        throw new Error(
          `La unidad de transporte con ID ${id} no existe o no pertenece a tu empresa.`,
        );
      }

      await this.unidadesTransporteRepository.delete({
        idUnidadTransporte: id,
      });

      return {
        message: 'Unidad de transporte eliminada correctamente',
      };
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
    try {
      // Verificar que la unidad exista y pertenezca a la empresa
      const unidad = await this.unidadesTransporteRepository.findOneBy({
        idUnidadTransporte: idUnidad,
        idEmpresa,
      });
      if (!unidad) {
        throw new Error(
          `La unidad con ID ${idUnidad} no existe o no pertenece a tu empresa.`,
        );
      }

      // Verificar que el chofer exista y pertenezca a la misma empresa
      const chofer = await this.choferRepository.findOneBy({
        idChofer: idChofer,
        idEmpresa,
      });
      if (!chofer) {
        throw new Error(
          `El chofer con ID ${idChofer} no existe o no pertenece a tu empresa.`,
        );
      }

      // Comprobar si el chofer ya está asignado a otra unidad
      const otraUnidad = await this.unidadesTransporteRepository.findOneBy({
        idChofer: idChofer,
      });
      if (otraUnidad && otraUnidad.idUnidadTransporte !== idUnidad) {
        throw new Error(
          `El chofer con ID ${idChofer} ya está asignado a la unidad ${otraUnidad.idUnidadTransporte}.`,
        );
      }

      // Asignar y guardar
      unidad.idChofer = idChofer;
      unidad.chofer = chofer;

      await this.unidadesTransporteRepository.save(unidad);

      return {
        ...unidad,
        message: 'Chofer asignado correctamente a la unidad',
      };
    } catch (error) {
      this.logger.error(error);
      throw new Error('Error al asignar el chofer a la unidad');
    }
  }
}
