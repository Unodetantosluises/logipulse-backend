import { Servicio } from 'src/servicios/entities/servicio.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('monitoreo_rute')
export class MonitoreoRuta {
  @PrimaryGeneratedColumn({ name: 'id_log' })
  idLog: number;

  // Relacion con el servicio
  @ManyToOne(() => Servicio, (servicio) => servicio.idServicio)
  @JoinColumn({ name: 'id_servicio' })
  servicio: Servicio;

  @Column({ name: 'id_servicio', nullable: false })
  id_servicio: number;

  @Column({ name: 'fecha_hora_registro', type: 'timestamp' })
  fechaHoaraRegistro: Date;

  @Column({ name: 'ubicacion_actual_gps', type: 'string', length: 100 })
  ubicacionActualGps: string;

  @Column({
    name: 'temperatura_actual',
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  temperaturaActual: number;

  @Column({ name: 'incidencia_reportada', type: 'text' })
  incidenciaReportada: string;
}
