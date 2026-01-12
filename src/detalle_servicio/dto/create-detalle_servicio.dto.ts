import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { EstadoProducto } from 'src/common/enums/estado-producto.enum';

export class CreateDetalleServicioDto {
  @IsInt()
  @IsNotEmpty()
  idServicio: number; // ¿A qué viaje pertenece este producto?

  @IsString()
  @IsNotEmpty()
  nombreProducto: string;

  @IsNumber()
  @IsOptional()
  @Min(1)
  cantidadEsperada?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  cantidadRecibida?: number;

  @IsOptional()
  @IsEnum(EstadoProducto)
  estadoProducto?: EstadoProducto;
}
