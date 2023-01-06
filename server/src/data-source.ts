import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Project } from './entity/Project'
import { Bug } from './entity/Bug'
import { Note } from './entity/Note'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: false,
  entities: [Project, Bug, Note],
  migrations: [],
  subscribers: [],
})
