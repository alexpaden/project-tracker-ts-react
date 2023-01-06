import {
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Entity,
    BaseEntity,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Project } from './Project';
  
  type Priority = 'low' | 'medium' | 'high';
  
  @Entity({ name: 'bugs' })
  export class Bug extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'varchar', length: 60 })
    title: string;
  
    @Column()
    description: string;
  
    @Column({
      type: 'enum',
      enum: ['low', 'medium', 'high'],
      default: 'low',
    })
    priority: Priority;
  
    @ManyToOne(() => Project, (project) => project)
    @JoinColumn({ name: 'projectId' })
    project: Project;
    @Column()
    projectId: string;
  
    @Column({ default: false })
    isResolved: boolean;
  
    @Column({ type: 'timestamp', nullable: true })
    closedAt: Date | null;
  
    @Column({ type: 'timestamp', nullable: true })
    reopenedAt: Date | null;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @Column({ nullable: true })
    updatedAt: Date;
  }
  