import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDetalleServicioDto {
  @IsString()
  @IsNotEmpty()
  nombreProducto: string;

  @IsNumber()
  @IsNotEmpty()
  cantidadEsperada: number;

  @IsNumber()
  @IsNotEmpty()
  cantidadRecibidad: number;
}
