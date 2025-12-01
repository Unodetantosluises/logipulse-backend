import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresasModule } from './empresas/empresas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env/.env.local', '.env'], // La ruta debe correponder a donde tienes el archivo
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DATABSE_HOST'),
        port: Number(config.get<string>('PORT_NUMBER')), // El puerto de tu base de datos Postgres
        username: config.get<string>('DATABASE_USER'), // Tu usuario de Postgres
        password: config.get<string>('DATABASE_PASSWORD'), // Tu contraseña de Postgres
        database: config.get<string>('DATABASE_NAME'), //El nombre de tu base de datos
        autoLoadEntities: true, // Carga entiddades automaticas
        synchronize: false, // Dejalo en false para evitar pérdida de datos en producción
      }),
    }),
    EmpresasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
