import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import Model from './Model'
import { User } from './User'
import { Bug } from './Bug'

@Entity({ name: 'projects' })
export class Project extends Model {
  @Column({ type: 'varchar', length: 60 })
  name: string

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: 'createdById' })
  createdBy: User
  @Column()
  createdById: string

  @OneToMany(() => Bug, (bugs) => bugs.project)
  @JoinColumn()
  bugs: Bug[]
}
