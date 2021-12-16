import { Column, Entity, BaseEntity,  ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./user.entity";

@Entity('post')
export class Post extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
  
  @Column()
  bio: string;

  @ManyToOne(
    () => Client,
    client => client.post,
  )
  @JoinColumn({
    name: 'user_id'
  })
  user: Client;

  @Column()
  media_url: string;

  @Column()
  like: number;

  @Column()
  dislike: number;
} 
