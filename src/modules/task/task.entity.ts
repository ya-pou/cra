import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "../project/project.entity.js";
import { BaseEntity } from "../../entities/base.entity.js";
import { User } from "../user/user.entity.js";

@Entity('tasks')
export class Task extends BaseEntity {
  @Column({ length: 150 })
  title!: string;

  @Column('text')
  description!: string;

  @Column({ type: 'float' })
  hours!: number;

  @ManyToOne(() => Project, project => project.tasks, { onDelete: 'SET NULL', nullable: true })
  project?: Project;

  @ManyToOne(() => User, user => user.tasks, { onDelete: 'SET NULL', nullable: true })
  user?: User;
}