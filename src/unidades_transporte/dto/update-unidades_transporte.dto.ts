import { PartialType } from '@nestjs/mapped-types';
import { CreateUnidadesTransporteDto } from './create-unidades_transporte.dto';

export class UpdateUnidadesTransporteDto extends PartialType(
  CreateUnidadesTransporteDto,
) {}
