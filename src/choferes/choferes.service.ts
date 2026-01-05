import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateChofereDto } from './dto/create-chofere.dto';
import { UpdateChofereDto } from './dto/update-chofere.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chofer } from './entities/chofere.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChoferesService {
  // Logger para ver errores en la consola
  private readonly logger = new Logger('ChoferesService');

  constructor(
    @InjectRepository(Chofer)
    private readonly choferRepository: Repository<Chofer>,
  ) {}

  async create(createChofereDto: CreateChofereDto, idEmpresa: number) {
    try {
      //
      const chofer = this.choferRepository.create({
        ...createChofereDto,
        idEmpresa,
        active: true,
      });

      await this.choferRepository.save(chofer);

      return {
        ...chofer,
        message: 'Chofer creado exitosamente',
      };
    } catch (error) {
      this.logger.error(error);
      throw new Error('Error al crear el chofer');
    }
  }

  // Obtener todos los choferes
  async findAll(idEmpresa: number) {
    return this.choferRepository.find({
      where: { idEmpresa: idEmpresa, active: true },
      order: { nombre: 'ASC' },
    });
  }

  // Obtener un chofer por ID
  async findOne(id: number, idEmpresa: number) {
    const chofer = await this.choferRepository.findOneBy({
      idChofer: id,
      idEmpresa: idEmpresa,
      active: true,
    });
    if (!chofer) {
      throw new NotFoundException(
        `El chofer con ID ${id} no existe o no pertenece a tu empresa.`,
      );
    }
    return chofer;
  }

  async update(
    id: number,
    updateChofereDto: UpdateChofereDto,
    idEmpresa: number,
  ) {
    try {
      const chofer = await this.choferRepository.findOneBy({
        idChofer: id,
        idEmpresa,
      });

      if (!chofer) {
        throw new Error(
          `El chofer con ID ${id} no existe o no pertenece a tu empresa.`,
        );
      }

      await this.choferRepository.update({ idChofer: id }, updateChofereDto);

      const updated = await this.choferRepository.findOneBy({
        idChofer: id,
        idEmpresa,
      });

      return {
        ...updated,
        message: 'Chofer actualizado correctamente',
      };
    } catch (error) {
      this.logger.error(error);
      throw new Error('Error al actualizar al chofer');
    }
  }

  // Eliminar chofer por IDs
  async remove(id: number, idEmpresa: number) {
    await this.findOne(id, idEmpresa);

    try {
      // Eliminación lógica
      await this.choferRepository.update(
        { idChofer: id, idEmpresa: idEmpresa },
        { active: false },
      );

      return { message: 'Chofer eliminado correctamente' };
    } catch (error) {
      this.logger.error(error);
      throw new Error('Error al eliminar el chofer');
    }
  }
}
