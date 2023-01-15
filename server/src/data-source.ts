import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Project } from './entity/Project'
import { Bug } from './entity/Bug'
import { Note } from './entity/Note'
import { Member } from './entity/Member'
import { User } from './entity/User'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: false,
  entities: [Project, Bug, Note, User, Member],
  migrations: [],
  subscribers: [],
})
