import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateEmpresaDto {
  @IsString()
  @IsOptional()
  @Length(3, 150, {
    message: 'El nombre de la empresa debe tener entre 3 y 150 caracteres',
  })
  nombreEmpresa?: string;

  @IsString()
  @IsOptional()
  @Length(3, 150, {
    message: 'La razón social debe tener entre 3 y 150 caracteres',
  })
  razonSocial?: string;

  @IsString()
  @IsOptional()
  giroEmporesarial?: string;

  @IsString()
  @IsOptional()
  @Length(12, 13, {
    message: 'El RFC debe tener entre 12 y 13 caracteres',
  })
  rfc?: string;

  @IsString()
  @IsOptional()
  direccion?: string;

  @IsString()
  @IsOptional()
  representanteLegaL?: string;

  @IsString()
  @IsOptional()
  @Length(18, 18, { message: 'La CURP debe tenr exactamente 18 caracteres.' })
  curp?: string;

  @IsEmail({}, { message: 'El correo electronico no es valida.' })
  @IsOptional()
  correoElectronico?: string;

  @IsString()
  @IsOptional()
  numeroTelefoncio?: string;

  @IsString()
  @IsOptional()
  @Length(6, 50, { message: 'La contraseña debe tern al menos 6 caracteres.' })
  contrasena?: string;
}
