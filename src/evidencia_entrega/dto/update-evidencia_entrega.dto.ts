import { PartialType } from '@nestjs/mapped-types';
import { CreateEvidenciaEntregaDto } from './create-evidencia_entrega.dto';

export class UpdateEvidenciaEntregaDto extends PartialType(CreateEvidenciaEntregaDto) {}
