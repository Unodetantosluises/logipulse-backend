import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChofereDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  licencia: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;
}
