import { Injectable } from '@nestjs/common';
import { CreateChofereDto } from './dto/create-chofere.dto';
import { UpdateChofereDto } from './dto/update-chofere.dto';

@Injectable()
export class ChoferesService {
  create(createChofereDto: CreateChofereDto) {
    return 'This action adds a new chofere';
  }

  findAll() {
    return `This action returns all choferes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chofere`;
  }

  update(id: number, updateChofereDto: UpdateChofereDto) {
    return `This action updates a #${id} chofere`;
  }

  remove(id: number) {
    return `This action removes a #${id} chofere`;
  }
}
