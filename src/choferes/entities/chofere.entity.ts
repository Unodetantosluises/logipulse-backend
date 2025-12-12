import { Servicio } from 'src/servicios/entities/servicio.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('choferes')
export class Chofer {
  @PrimaryGeneratedColumn({ name: 'id_chofer' })
  idChofer: number;

  // Relacion con servicios
  // Un chofer puede tener multiples Servicios
  @OneToMany(() => Servicio, (servicio) => servicio.chofer)
  @JoinColumn({ name: 'id_servicio' })
  servicio: Servicio;

  @Column({ name: 'id_servicio', nullable: false })
  idServicio: number;

  @Column({ name: 'nombre', length: 150, nullable: false })
  nombre: string;

  @Column({ name: 'licencia', unique: true, length: 50, nullable: false })
  licencia: string;

  @Column({ name: 'telefono', length: 20 })
  telefono: string;
}
