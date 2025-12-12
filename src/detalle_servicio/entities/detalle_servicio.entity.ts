import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EstadoProducto } from 'src/common/enums/estado-producto.enum';

@Entity('detalle_servicio')
export class DetalleServicio {
  @PrimaryGeneratedColumn({ name: 'id_detale' })
  idDetalle: number;

  @Column({ name: 'nombre_producto' })
  nombreProducto: string;

  @Column({ name: 'cantidad_esperada', nullable: true })
  cantidadEsperada: number;

  @Column({ name: 'cantidad_recibidad' })
  cantidadRecibida: number;

  @Column({
    type: 'enum',
    enum: 'estado_producto',
    default: EstadoProducto.BUENO,
  })
  estadoProducto: EstadoProducto;
}
