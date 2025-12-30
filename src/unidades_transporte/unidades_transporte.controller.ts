import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UnidadesTransporteService } from './unidades_transporte.service';
import { CreateUnidadesTransporteDto } from './dto/create-unidades_transporte.dto';
import { UpdateUnidadesTransporteDto } from './dto/update-unidades_transporte.dto';

@Controller('unidades-transporte')
export class UnidadesTransporteController {
  constructor(
    private readonly unidadesTransporteService: UnidadesTransporteService,
  ) {}

  @Post()
  create(@Body() createUnidadesTransporteDto: CreateUnidadesTransporteDto) {
    return this.unidadesTransporteService.create(createUnidadesTransporteDto);
  }

  @Get()
  findAll() {
    return this.unidadesTransporteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unidadesTransporteService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUnidadesTransporteDto: UpdateUnidadesTransporteDto,
  ) {
    return this.unidadesTransporteService.update(
      +id,
      updateUnidadesTransporteDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unidadesTransporteService.remove(+id);
  }
}
