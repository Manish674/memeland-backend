import config from "config";
import { Client } from "../entities/user.entity";
import { Post } from "../entities/post.entity";
import { createConnection } from "typeorm";

export const connectDB = async () => {
  try {
    await createConnection({
      type: 'postgres',
      host: config.get<string>('dbConfig.host'),
      port: config.get<number>('dbConfig.port'),
      username: config.get<string>('dbConfig.user'),
      database: config.get<string>('dbConfig.name'),
      password: undefined,
      entities: [Client, Post],
      synchronize: true
    })
    console.log("DB connected!")
  } catch(e) {
    console.log(e);
    throw new Error('Something went wrong with database connection! ')
  }
}
