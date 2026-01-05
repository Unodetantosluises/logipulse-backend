import { IsOptional, IsEnum, IsDateString } from 'class-validator';
import { EstatusServicio } from 'src/common/enums/estatus-servicio.enum';
import { Transform } from 'class-transformer';

export class FilterServiciosDto {
  @IsOptional()
  @Transform(({ value }) => {
    // Si viene como string "PENDIENTE,EN_CURSO", lo convertimos a array
    if (typeof value === 'string') {
      return value.split(',');
    }
    return value as string[];
  })
  @IsEnum(EstatusServicio, { each: true }) // Valida que CADA elemento sea válido
  estatus?: EstatusServicio[];

  // Filtros de fecha (para lo de "servicios del mes")
  @IsOptional()
  @IsDateString()
  fechaInicio?: string;

  @IsOptional()
  @IsDateString()
  fechaFin?: string;
}
