import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EvidenciaEntregaService } from './evidencia_entrega.service';
import { CreateEvidenciaEntregaDto } from './dto/create-evidencia_entrega.dto';
import { UpdateEvidenciaEntregaDto } from './dto/update-evidencia_entrega.dto';

@Controller('evidencia-entrega')
export class EvidenciaEntregaController {
  constructor(private readonly evidenciaEntregaService: EvidenciaEntregaService) {}

  @Post()
  create(@Body() createEvidenciaEntregaDto: CreateEvidenciaEntregaDto) {
    return this.evidenciaEntregaService.create(createEvidenciaEntregaDto);
  }

  @Get()
  findAll() {
    return this.evidenciaEntregaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.evidenciaEntregaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEvidenciaEntregaDto: UpdateEvidenciaEntregaDto) {
    return this.evidenciaEntregaService.update(+id, updateEvidenciaEntregaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evidenciaEntregaService.remove(+id);
  }
}
