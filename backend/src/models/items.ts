import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import Orphanage from './Orphanage';

@Entity('items')
export default class Items {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Orphanage, orphanage => orphanage.items)
  @JoinColumn({ name: 'orphanage_id'})
  orphanage: Orphanage;
}