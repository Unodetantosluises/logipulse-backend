import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EstadoOperativo } from 'src/common/enums/estado-operativo.enum';
import { Servicio } from 'src/servicios/entities/servicio.entity';

@Entity('unidades_transporte')
export class UnidadesTransporte {
  @PrimaryGeneratedColumn({ name: 'id_unidad_transporte' })
  idUnidadTransporte: number;

  @OneToMany(() => Servicio, (servicio) => servicio.unidadTransporte)
  servicios: Servicio[];

  @Column({ name: 'placas', unique: true, length: 20 })
  placas: string;

  @Column({ name: 'altura', precision: 5, scale: 2 })
  altura: number;

  @Column({ name: 'largo', precision: 5, scale: 2 })
  largo: number;

  @Column({ name: 'tipo_unidad', length: 50 })
  tipoUnidad: string;

  @Column({
    type: 'enum',
    enum: EstadoOperativo,
    default: EstadoOperativo.DISPONIBLE,
  })
  estadoOperativo: EstadoOperativo;

  @Column({ name: 'capacidad_carga', precision: 10, scale: 2 })
  capacidadCarga: number;

  @Column({ name: 'tiene_refrigeracion', default: true })
  tieneRefrigeracion: boolean;
}
