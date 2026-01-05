import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { EstadoOperativo } from 'src/common/enums/estado-operativo.enum';
import { Servicio } from 'src/servicios/entities/servicio.entity';
import { Empresa } from 'src/empresas/entities/empresa.entity';
import { Chofer } from 'src/choferes/entities/chofere.entity';

@Entity('unidades_transporte')
export class UnidadesTransporte {
  @PrimaryGeneratedColumn({ name: 'id_unidad_transporte' })
  idUnidadTransporte: number;

  @OneToMany(() => Servicio, (servicio) => servicio.unidadTransporte)
  servicios: Servicio[];

  // Relación con Empresa (muchas unidades -> 1 empresa)
  @ManyToOne(() => Empresa, (empresa) => empresa.unidadesTransporte)
  @JoinColumn({ name: 'id_empresa' })
  empresa: Empresa;

  @Column({ name: 'id_empresa' })
  idEmpresa: number;

  // Relación 1:1 con Chofer (una unidad tiene un chofer asignado)
  @OneToOne(() => Chofer, (chofer) => chofer.unidadTransporte, {
    nullable: true,
  })
  @JoinColumn({ name: 'id_chofer' })
  chofer: Chofer | null;

  @Column({ name: 'id_chofer', type: 'number', nullable: true })
  idChofer: number | null;

  @Column({ name: 'placas', unique: true, length: 20 })
  placas: string;

  @Column({ name: 'altura', precision: 5, scale: 2 })
  altura: number;

  @Column({ name: 'largo', precision: 5, scale: 2 })
  largo: number;

  @Column({ name: 'tipo_unidad', length: 50 })
  tipoUnidad: string;

  @Column({
    name: 'estado_operativo',
    type: 'enum',
    enum: EstadoOperativo,
    enumName: 'estado_operativo_enum',
    default: EstadoOperativo.DISPONIBLE,
  })
  estadoOperativo: EstadoOperativo;

  @Column({ name: 'capacidad_carga', precision: 10, scale: 2 })
  capacidadCarga: number;

  @Column({ name: 'tiene_refrigeracion', default: false })
  tieneRefrigeracion: boolean;

  @Column({ name: 'active', type: 'boolean', default: true })
  active: boolean;
}
