import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EstadoProducto } from 'src/common/enums/estado-producto.enum';
import { Servicio } from 'src/servicios/entities/servicio.entity';

@Entity('detalle_servicio')
export class DetalleServicio {
  @PrimaryGeneratedColumn({ name: 'id_detalle' })
  idDetalle: number;

  @Column({ name: 'id_servicio' })
  idServicio: number;

  // RELACIÓN CON EL PADRE (SERVICIO)
  @ManyToOne(() => Servicio, (servicio) => servicio.detalles, {
    onDelete: 'CASCADE', // Si borras el servicio, se borran sus productos
  })
  @JoinColumn({ name: 'id_servicio' })
  servicio: Servicio;

  @Column({ name: 'nombre_producto' })
  nombreProducto: string;

  @Column({ name: 'cantidad_esperada', nullable: true })
  cantidadEsperada: number;

  @Column({ name: 'cantidad_recibida', default: 0 })
  cantidadRecibida: number;

  @Column({
    name: 'estado_producto',
    type: 'enum',
    enum: 'estado_producto',
    default: EstadoProducto.BUENO,
  })
  estadoProducto: EstadoProducto;

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

  @OneToMany(() => DetalleServicio, (detalle) => detalle.servicio, {
    cascade: true,
  })
  detalles: DetalleServicio[];
}
