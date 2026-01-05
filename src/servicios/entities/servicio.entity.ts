import { Chofer } from 'src/choferes/entities/chofere.entity';
import { EstatusServicio } from 'src/common/enums/estatus-servicio.enum';
import { Empresa } from 'src/empresas/entities/empresa.entity';
import { EvidenciaEntrega } from 'src/evidencia_entrega/entities/evidencia_entrega.entity';
import { Factura } from 'src/facturas/entities/factura.entity';
import { MonitoreoRuta } from 'src/monitoreo_ruta/entities/monitoreo_ruta.entity';
import { UnidadesTransporte } from 'src/unidades_transporte/entities/unidades_transporte.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('servicios')
export class Servicio {
  @PrimaryGeneratedColumn({ name: 'id_servicio' })
  idServicio: number;

  // Relacion con Empresa
  @ManyToOne(() => Empresa, (empresa) => empresa.servicios)
  @JoinColumn({ name: 'id_empresa' })
  empresa: Empresa;

  // Proporciona acceso directo al ID sin cargar todo el objeto empresa
  @Column({ name: 'id_empresa', nullable: false })
  idEmpresa: number;

  @ManyToOne(() => UnidadesTransporte, { nullable: true })
  @JoinColumn({ name: 'id_unidad_transporte' })
  unidadTransporte: UnidadesTransporte | null;

  @Column({ name: 'id_unidad_transporte', nullable: true })
  idUnidadTransporte: number | null;

  @ManyToOne(() => Chofer, { nullable: true })
  @JoinColumn({ name: 'id_chofer' })
  chofer: Chofer | null;

  @Column({ name: 'id_chofer', nullable: true })
  idChofer: number | null;

  @Column({ name: 'fecha_hora_programada', type: 'timestamp', nullable: true })
  fechaHoraProgramada: Date;

  @Column({
    name: 'fecha_hora_llegada_estimada',
    type: 'timestamp',
    nullable: true,
  })
  fechaHoraLlegadaEstimada: Date;

  @Column({ name: 'punto_origen', type: 'text' })
  puntoOrigen: string;

  @Column({ name: 'punto_destino', type: 'text' })
  puntoDestino: string;

  @Column({ name: 'descripcion_mercancia', type: 'text', nullable: true })
  descripcionMercancia: string;

  @Column({
    name: 'temperatura_minima_req',
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  temperaturaMinimaReq: number;

  @Column({
    name: 'temperatura_maxima_req',
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  temperaturaMaximaReq: number;

  @Column({ name: 'equipamiento_requerido', type: 'text', nullable: true })
  equipamientoReq: string;

  @Column({
    name: 'fecha_hora_inicial_real',
    type: 'timestamp',
    nullable: true,
  })
  fechaHorarInicialReal: Date;

  @Column({ name: 'fecha_hora_final_real', type: 'timestamp', nullable: true })
  fechaHorarFinalReal: Date;

  @Column({
    name: 'estatus_servicio',
    type: 'enum',
    enum: EstatusServicio,
    default: EstatusServicio.PENDIENTE,
  })
  estatusServicio: EstatusServicio;

  @Column({
    name: 'peso',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  peso: number;

  @Column({ name: 'tiempo', length: 50, nullable: true })
  tiempo: string;

  @Column({
    name: 'costo',
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: true,
  })
  costo: number;

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

  @OneToOne(() => Factura, (factura) => factura.servicio, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  facturas: Factura[];

  @OneToMany(() => EvidenciaEntrega, (evidencia) => evidencia.servicio, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  evidenciasEntrega: EvidenciaEntrega[];

  @OneToMany(() => MonitoreoRuta, (monitoreo_rute) => monitoreo_rute.servicio, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  monioreoRuta: MonitoreoRuta[];
}
