import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ChoferesService } from './choferes.service';
import { CreateChofereDto } from './dto/create-chofere.dto';
import { UpdateChofereDto } from './dto/update-chofere.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('choferes')
export class ChoferesController {
  constructor(private readonly choferesService: ChoferesService) {}

  @Post()
  crearChofer(@Body() createChofereDto: CreateChofereDto) {
    return this.choferesService.create(createChofereDto);
  }

  @Get()
  findAll() {
    return this.choferesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.choferesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChofereDto: UpdateChofereDto) {
    return this.choferesService.update(+id, updateChofereDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.choferesService.remove(+id);
  }
}
