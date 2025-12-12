import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateServicioDto {
  @IsNotEmpty()
  @IsDateString()
  fechaHoraProgramada: Date;

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
