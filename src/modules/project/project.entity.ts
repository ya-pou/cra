import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Task } from '../task/task.entity.js';
import { User } from '../user/user.entity.js';
import { BaseEntity } from '../../entities/base.entity.js';

@Entity('projects')
export class Project extends BaseEntity {

  @Column({ length: 150 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @ManyToOne(() => User, user => user.projects, { onDelete: 'CASCADE' })
  client!: User;

  @OneToMany(() => Task, task => task.project)
  tasks?: Task[];

}