import { Entity, Column } from 'typeorm'
import Model from './Model'

@Entity({ name: 'projects' })
export class Project extends Model {
  @Column({ type: 'varchar', length: 60 })
  name: string
}
