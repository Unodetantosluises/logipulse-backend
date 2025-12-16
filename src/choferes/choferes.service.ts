import { Injectable } from '@nestjs/common';
import { CreateChofereDto } from './dto/create-chofere.dto';
import { UpdateChofereDto } from './dto/update-chofere.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chofer } from './entities/chofere.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChoferesService {
  constructor(
    @InjectRepository(Chofer)
    private readonly choferRepository: Repository<Chofer>,
  ) {}

  async create(createChofereDto: CreateChofereDto) {
    const nuevoChofer = this.choferRepository.create({
      ...createChofereDto,
    });

    return await this.choferRepository.save(nuevoChofer);
  }

  findAll() {
    return `This action returns all choferes`;
  }

  async findOne(id: number) {
    return await this.choferRepository.findOneBy({
      idChofer: id,
    });
  }

  async update(id: number, updateChofereDto: UpdateChofereDto) {
    const chofer = await this.choferRepository.findOneBy({
      idChofer: id,
    });

    if (!chofer) {
      throw new Error(
        `El chofer con ID ${id} no existe o no pertenece a tu empresa.`,
      );
    }

    await this.choferRepository.update({ idChofer: id }, updateChofereDto);

    return await this.choferRepository.findOneBy({
      idChofer: id,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} chofere`;
  }
}
