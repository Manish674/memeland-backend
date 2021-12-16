import { Column, Entity, BaseEntity,  OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";

@Entity('client')
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column({
    unique: true,
    length: 50
  })
  username: String;

  @OneToMany(
    () => Post,
    post => post.user,
  )
  post: Post[];

  @Column()
  password: String;

  @Column({
    unique: true,
    length: 150
  })

  email: String;
} 
