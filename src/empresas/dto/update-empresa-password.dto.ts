import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class UpdateEmpresaPasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8, {
    message: 'la contraseña deb tener al menos ocho caracteres.',
  })
  @Matches(/((?=.*\d)(?=.*[a-zA-Z])(?=.*[\W]).{8,})/, {
    message:
      'La contraseña es muy debil. Debe tener una letra, un numero y un caracter especial.',
  })
  contrasena: string;
}
