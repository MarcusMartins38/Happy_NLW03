import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import Image from "./Image";
import Items from "./items";
import User from "./User";

enum InstituteType {
  ORPHANAGE = 'orphanage',
  ASYLUM = 'asylum',
}

@Entity("orphanages")
export default class Orphanage {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  about: string;

  @Column()
  instructions: string;

  @Column()
  opening_hours: string;

  @Column()
  open_on_weekends: boolean;
  
  @Column({
    default: 'orphanage'
  })
  institute_type: InstituteType;

  // @Column("string", { array: true })
  // donation_items: string[];

  // @Column()
  // user_id: string;

  @OneToMany(() => Items, (item) => item.orphanage, {
    cascade: ["insert", "update"],
  })
  @JoinColumn({ name: "orphanage_id" })
  items: Items[];

  @OneToMany(() => Image, (image) => image.orphanage, {
    cascade: ["insert", "update"],
  })
  @JoinColumn({ name: "orphanage_id" })
  images: Image[];

  @ManyToOne(() => User, (user) => user.orphanages)
  @JoinColumn({ name: "user_id" })
  user: User;
}
