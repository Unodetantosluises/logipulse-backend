import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateEmpresaPasswordDto {
  @IsString()
  @IsNotEmpty()
  @Length(8, 50, { message: 'La contraseña debe tern al menos 8 caracteres.' })
  contrasena: string;
}
