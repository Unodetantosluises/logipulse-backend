import { PartialType } from '@nestjs/mapped-types';
import { CreateDetalleServicioDto } from './create-detalle_servicio.dto';

export class UpdateDetalleServicioDto extends PartialType(
  CreateDetalleServicioDto,
) {}
