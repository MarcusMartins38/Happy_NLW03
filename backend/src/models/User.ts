import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Orphanage from "./Orphanage";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Orphanage, (orphanage) => orphanage.user, {
    cascade: ["insert", "update"],
  })
  @JoinColumn({ name: "user_id" })
  orphanages: Orphanage[];
}
