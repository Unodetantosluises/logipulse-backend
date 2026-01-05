import { Servicio } from 'src/servicios/entities/servicio.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Empresa } from 'src/empresas/entities/empresa.entity';
import { UnidadesTransporte } from 'src/unidades_transporte/entities/unidades_transporte.entity';

@Entity('choferes')
export class Chofer {
  @PrimaryGeneratedColumn({ name: 'id_chofer' })
  idChofer: number;

  // Relacion con servicios: un chofer puede tener multiples servicios
  @OneToMany(() => Servicio, (servicio) => servicio.chofer)
  servicios: Servicio[];

  // Relacion con Empresa: muchos choferes pertenecen a una empresa
  @ManyToOne(() => Empresa, (empresa) => empresa.choferes)
  @JoinColumn({ name: 'id_empresa' })
  empresa: Empresa;

  @Column({ name: 'id_empresa', nullable: false })
  idEmpresa: number;

  // Relacion 1:1 con Unidad de Transporte (opcional)
  @OneToOne(() => UnidadesTransporte, (unidad) => unidad.chofer)
  unidadTransporte: UnidadesTransporte;

  @Column({ name: 'nombre', length: 150, nullable: false })
  nombre: string;

  @Column({ name: 'licencia', unique: true, length: 50, nullable: false })
  licencia: string;

  @Column({ name: 'telefono', length: 20 })
  telefono: string;

  @Column({ name: 'active', type: 'boolean', default: true })
  active: boolean;
}
