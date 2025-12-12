import { Servicio } from 'src/servicios/entities/servicio.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('evidencia_entrega')
export class EvidenciaEntrega {
  @PrimaryGeneratedColumn({ name: 'id_evidencia' })
  idEvidencia: number;

  // Relacion con Servicios
  // Muchas evidencias de un servicio
  @ManyToOne(() => Servicio, { nullable: true })
  @JoinColumn({ name: 'id_servicio' })
  servicio: Servicio;

  @Column({ name: 'id_servicio', nullable: true })
  id_servicio: number;

  @Column({ name: 'foto_url', type: 'text' })
  fotoUrl: string;

  @Column({ name: 'firma_digital', type: 'text' })
  firmaDigital: string;

  @Column({ name: 'comentarios_recepcion', type: 'text' })
  comentariosRecepcion: string;
}
