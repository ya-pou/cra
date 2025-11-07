import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Task } from '../task/task.entity.js';
import { User } from '../user/user.entity.js';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @ManyToOne(() => User, user => user.projects, { onDelete: 'CASCADE' })
  client!: User;

  @OneToMany(() => Task, task => task.project)
  tasks?: Task[];
}