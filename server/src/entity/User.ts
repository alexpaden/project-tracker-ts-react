import { Entity, Column } from 'typeorm'
import Model from './Model'

@Entity({ name: 'users' })
export class User extends Model {
  @Column({ type: 'varchar', length: 20 })
  username: string

  @Column()
  passwordHash: string
}
