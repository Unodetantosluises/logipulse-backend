import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresasModule } from './empresas/empresas.module';
import { AuthModule } from './auth/auth.module';
import { UnidadesTransporteModule } from './unidades_transporte/unidades_transporte.module';
import { ChoferesModule } from './choferes/choferes.module';
import { ServiciosModule } from './servicios/servicios.module';
import { DetalleServicioModule } from './detalle_servicio/detalle_servicio.module';
import { MonitoreoRutaModule } from './monitoreo_ruta/monitoreo_ruta.module';
import { EvidenciaEntregaModule } from './evidencia_entrega/evidencia_entrega.module';
import { FacturasModule } from './facturas/facturas.module';
import { FileUploadResolver } from './file-upload/file-upload.resolver';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env/.env.local', // La ruta debe correponder a donde tienes el archivo
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = `${Date.now()})`
        } 
      })
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DATABASE_HOST'),
        port: Number(config.get<string>('PORT_NUMBER')), // El puerto de tu base de datos Postgres
        username: config.get<string>('DATABASE_USER'), // Tu usuario de Postgres
        password: config.get<string>('DATABASE_PASSWORD'), // Tu contraseña de Postgres
        database: config.get<string>('DATABASE_NAME'), //El nombre de tu base de datos
        autoLoadEntities: true, // Carga entiddades automaticas
        synchronize: false, // Dejalo en false para evitar pérdida de datos en producción
      }),
    }),
    EmpresasModule,
    AuthModule,
    UnidadesTransporteModule,
    ChoferesModule,
    ServiciosModule,
    DetalleServicioModule,
    MonitoreoRutaModule,
    EvidenciaEntregaModule,
    FacturasModule,
  ],
  controllers: [],
  providers: [FileUploadResolver],
})
export class AppModule {}
