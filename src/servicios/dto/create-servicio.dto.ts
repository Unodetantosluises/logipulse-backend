import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateServicioDto {
  @IsNotEmpty()
  @IsDateString()
  fechaHoraProgramada: string;

  @IsNotEmpty()
  @IsDateString()
  fechaHoraLlegadaEstimada: string;

  @IsString()
  @IsNotEmpty()
  puntoOrigen: string;

  @IsString()
  @IsNotEmpty()
  puntoDestino: string;

  @IsString()
  @IsOptional()
  descripcionMercancia?: string;

  @IsNumber()
  @IsOptional()
  temperaturaMinimaReq?: number;

  @IsNumber()
  @IsOptional()
  temperaturaMaximaReq?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  costo?: number;

  @IsString()
  @IsOptional()
  equipamientoReq?: string;

  @IsNumber()
  @IsOptional()
  idUnidadTransporte?: number;

  @IsNumber()
  @IsOptional()
  idChofer?: number;
}
