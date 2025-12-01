import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('choferes')
export class Chofere {
  @PrimaryGeneratedColumn({ name: 'id_chofer' })
  idChofer: number;

  @Column({ name: 'nombre', length: 150 })
  nombre: string;

  @Column({ name: 'licencia', unique: true, length: 50 })
  licencia: string;

  @Column({ name: 'telefono', length: 20 })
  telefono: string;
}
