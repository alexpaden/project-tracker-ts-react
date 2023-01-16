import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Project } from './entity/Project'
import { Bug } from './entity/Bug'
import { Note } from './entity/Note'
import { User } from './entity/User'
import dotenv from 'dotenv'
dotenv.config()

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.LDB_HOST as string,
  port: process.env.LDB_PORT as unknown as number,
  username: process.env.LDB_USERNAME as string,
  password: process.env.LDB_PASSWORD as string,
  database: process.env.LDB_DATABASE as string,
  synchronize: true,
  logging: false,
  entities: [Project, Bug, Note, User],
  migrations: ['./migrations/**.ts'],
  subscribers: [],
})
