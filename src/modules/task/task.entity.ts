import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "../project/project.entity.js";
import { BaseEntity } from "../../entities/base.entity.js";

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
}