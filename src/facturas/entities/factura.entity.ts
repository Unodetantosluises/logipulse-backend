import { Servicio } from 'src/servicios/entities/servicio.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('facuras')
export class Factura {
  @PrimaryGeneratedColumn({ name: 'id_factura' })
  idFactura: number;

  // Relacion Servicios
  // Una factura pertenece a cada servicio
  @OneToOne(() => Servicio, (servicio) => servicio.facturas)
  @JoinColumn({ name: 'id_servivio' })
  servicio: Servicio;

  @Column({ name: 'id_servicio', nullable: false })
  id_servicio: number;

  @Column({ name: 'fecha_expedicion', type: 'timestamp' })
  fechaExpedicion: Date;

  @Column({
    name: 'impuesto',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  impuesto: number;

  @Column({ name: 'importe_total', type: 'decimal', precision: 10, scale: 2 })
  importeTotal: number;

  @Column({ name: 'forma_pago' })
  forma_pago: string;
}
