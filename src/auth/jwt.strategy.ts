import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from 'src/interfaces/JwtPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService) {
    const jwtSecret = config.get<string>('JWT_SECRET');

    if (!jwtSecret) {
      throw new Error('JWT_SECRET enviornment variable is not defined');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  // Esto se ejecuta automáticamente si el token es válido
  validate(payload: JwtPayload) {
    // Lo que retornes aquí se inyectará en 'req.user' en tus controladores
    return {
      idEmpresa: payload.id,
      email: payload.email,
      nombre: payload.nombre,
    };
  }
}
