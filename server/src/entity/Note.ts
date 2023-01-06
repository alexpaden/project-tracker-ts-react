import { Bug } from './Bug';
import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';

  @Entity({ name: 'notes' })
  export class Note extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    body: string;
  
    @ManyToOne(() => Bug, (bug) => bug)
    @JoinColumn({ name: 'bugId' })
    bug: Bug;
    @Column()
    bugId: string;
  }
  