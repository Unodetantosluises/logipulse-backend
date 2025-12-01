import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
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

  @Column({ name: 'numero_electronico', length: 20, nullable: true })
  numeroTelefonico: string;

  // Por seguridad esta en 'false' para que no devuelva la contraseña en las consultas por defecto
  @Column({ name: 'cantrasena', select: false })
  contrasena: string;

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
}
