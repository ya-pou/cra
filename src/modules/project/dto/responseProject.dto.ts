import { Expose } from "class-transformer";
import { Task } from "../../task/task.entity.js";
import { User } from "../../user/user.entity.js";

export class ResponseProjectDto {
  @Expose()
  id!: number;
  @Expose()
  name!: string; 
  @Expose()
  description!: string;
  @Expose()
  client!: User;
  @Expose()
  tasks!: Task[];
  @Expose()
  createdAt!: Date;
  @Expose()
  updatedAt?: Date;
}