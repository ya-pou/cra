import { AppDataSource } from "../../config/data-source.js";
import { Task } from "./task.entity.js";


export class TaskService {

  private taskRepo = AppDataSource.getRepository(Task);

  async findAll(): Promise<Task[]> { 
    return this.taskRepo.find();
  }

  async finOneById(id: number): Promise<Task | null> {
    return this.taskRepo.findOneBy({id});
  }

  async create(task: Partial<Task>): Promise<Task> {
    const newProject = this.taskRepo.create(task);
    return this.taskRepo.save(newProject);
  }

}