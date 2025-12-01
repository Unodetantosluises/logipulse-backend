import { PartialType } from '@nestjs/mapped-types';
import { CreateMonitoreoRutaDto } from './create-monitoreo_ruta.dto';

export class UpdateMonitoreoRutaDto extends PartialType(CreateMonitoreoRutaDto) {}
