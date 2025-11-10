import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Project } from '../project/project.entity.js';
import { BaseEntity } from '../../entities/base.entity.js';
import { Task } from '../task/task.entity.js';

@Entity('users')
export class User extends BaseEntity {
  @Column({ length: 100 })
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Project, project => project.client)
  projects!: Project[];

  @OneToMany(() => Task, task => task.project)
  tasks?: Task[];
}