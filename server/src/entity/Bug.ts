import {
    PrimaryGeneratedColumn,
    Entity,
    BaseEntity,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Project } from './Project';

@Entity({ name: 'bugs' })
export class Bug extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 60 })
    title: string;

    @Column()
    description: string;

    @ManyToOne(() => Project, (project) => project)
    @JoinColumn({ name: 'projectId' })
    project: Project;
    @Column()
    projectId: string;
}
  