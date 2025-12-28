import { IsString, Length, IsOptional, IsEmail } from 'class-validator';

export class CreateEmpresaDto {
  @IsString()
  @Length(3, 150, {
    message: 'El nombre de la empresa debe tener al menos 3 caracteres.',
  })
  public nombreEmpresa: string;

  @IsString()
  @IsOptional()
  razonSocial?: string;

  @IsString()
  @IsOptional()
  giroEmpresarial?: string;

  @IsString()
  @Length(12, 13, {
    message: 'El RFC debe tener entre 12 y 13 caracteres.',
  })
  rfc: string;

  @IsString()
  @IsOptional()
  direccion?: string;

  @IsString()
  @IsOptional()
  representanteLegal?: string;

  @IsString()
  @IsOptional()
  @Length(18, 18, { message: 'La CURP debe tener exactamente 18 caracteres.' })
  curp?: string;

  @IsEmail({}, { message: 'El correo electronico no es valido.' })
  correoElectronico: string;

  @IsString()
  @IsOptional()
  numeroTelefonico?: string;

  @IsString()
  @Length(8, 50, { message: 'La contraseña debe tener al menos 8 caracteres.' })
  contrasena: string;
}
