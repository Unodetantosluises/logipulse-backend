import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUnidadesTransporteDto {
  @IsString()
  @IsNotEmpty()
  placas: string;

  @IsNumber()
  @IsNotEmpty()
  altura: number;

  @IsNumber()
  @IsNotEmpty()
  largo: number;

  @IsString()
  @IsNotEmpty()
  tipoUnidad: string;

  @IsNumber()
  @IsNotEmpty()
  capacidadCarga: number;

  @IsBoolean()
  @IsNotEmpty()
  tieneRefrigeracion: boolean;
}
