import { Task } from "../../task/task.entity.js";
import { User } from "../../user/user.entity.js";

export class ResponseProjectDto {
  id!: number;
  name!: string; 
  description!: string;
  client!: User;
  tasks!: Task[];
  createdAt!: Date;
  updatedAt?: Date;
}