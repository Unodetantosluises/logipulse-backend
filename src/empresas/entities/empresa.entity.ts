import { Matches, MinLength } from 'class-validator';
import { Servicio } from 'src/servicios/entities/servicio.entity';
import { UnidadesTransporte } from 'src/unidades_transporte/entities/unidades_transporte.entity';
import { Chofer } from 'src/choferes/entities/chofere.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('empresa') // nombre exacto de la tabla
export class Empresa {
  @PrimaryGeneratedColumn({ name: 'id_empresa' })
  idEmpresa: number;

  @Column({ name: 'nombre_empresa', length: 150 })
  nombreEmpresa: string;

  @Column({ name: 'razon_social', length: 150, nullable: true })
  razonSocial: string;

  @Column({ name: 'giro_empresarial', length: 100, nullable: true })
  giroEmpresarial: string;

  @Column({ unique: true, length: 20 })
  rfc: string;

  @Column('text')
  direccion: string;

  @Column({ name: 'representante_legal', length: 150, nullable: true })
  representanteLegal: string;

  @Column({ length: 20, nullable: true })
  curp: string;

  @Column({ name: 'correo_electronico', unique: true, length: 100 })
  correoElectronico: string;

  @Column({ name: 'numero_telefonico', length: 20, nullable: true })
  numeroTelefonico: string;

  // Por seguridad esta en 'false' para que no devuelva la contraseña en las consultas por defecto
  @Column({ name: 'contrasena', select: false })
  @MinLength(8, {
    message: 'la contraseña deb tener al menos ocho caracteres.',
  })
  @Matches(/((?=.*\d)(?=.*[a-zA-Z])(?=.*[\W]).{8,})/, {
    message:
      'La contraseña es muy debil. Debe tener una letra, un numero y un caracter especial.',
  })
  contrasena: string;

  @Column({
    name: 'logo',
    type: 'text',
    default: 'default-logipulse.png',
    nullable: true,
  })
  logo: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
  })
  updatedAt: Date;

  // Esta es una propiedad virtual para que NestJS pueda buscar los servicios
  @OneToMany(() => Servicio, (servicio) => servicio.empresa)
  servicios: Servicio[];

  // Una empresa puede tener varias unidades de transporte
  @OneToMany(
    () => UnidadesTransporte,
    (unidadTransporte) => unidadTransporte.empresa,
  )
  unidadesTransporte: UnidadesTransporte[];

  // Una empresa puede tener varios choferes
  @OneToMany(() => Chofer, (chofer) => chofer.empresa)
  choferes: Chofer[];
}
