import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() LoginAuthDto: LoginAuthDto) {
    console.log('Datos recibidos en el backend:', LoginAuthDto);
    return this.authService.login(LoginAuthDto);
  }
}
