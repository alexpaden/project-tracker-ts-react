import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Project } from './entity/Project'
import { Bug } from './entity/Bug'
import { Note } from './entity/Note'
import { User } from './entity/User'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: false,
  entities: [Project, Bug, Note, User],
  migrations: [],
  subscribers: [],
})
