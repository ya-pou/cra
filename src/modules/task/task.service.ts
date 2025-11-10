import { plainToInstance } from "class-transformer";
import { AppDataSource } from "../../config/data-source.js";
import { ResponseTaskDto } from "./dto/responseTask.dto.js";
import { Task } from "./task.entity.js";
import { CreateTaskDto } from "./dto/createTask.dto.js";
import { ProjectService } from "../project/project.service.js";
import { UpdateTaskDto } from "./dto/updateTask.dto.js";
const projectService = new ProjectService();


export class TaskService {

  private taskRepo = AppDataSource.getRepository(Task);

  async findAll(): Promise<ResponseTaskDto[]> { 
    const tasks = await this.taskRepo.find();
    return plainToInstance(ResponseTaskDto,tasks)
  }

  async finOneById(id: number): Promise<ResponseTaskDto | null> {
    const task = await this.taskRepo.findOneBy({id});
    return plainToInstance(ResponseTaskDto,task)
  }

  async create(task: CreateTaskDto): Promise<ResponseTaskDto> {
    const newTask: Partial<Task> = { ...task };

    if (task.projectId) {
      const project = await projectService.findOneById(task.projectId);
      if (!project) {
        throw new Error(`Project with id ${task.projectId} not found`);
      }
      newTask.project = project;
    }
    newTask.hours = 1;
    const createdTask = this.taskRepo.create(newTask);
    const savedTask = await this.taskRepo.save(createdTask);

    return plainToInstance(ResponseTaskDto, savedTask);
  }

  async update(id: number, dto: UpdateTaskDto): Promise<ResponseTaskDto> {
    const task = await this.taskRepo.findOne({ where: { id } });
    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }
    Object.assign(task, dto);
    const updated = await this.taskRepo.save(task);
    const reloaded = await this.taskRepo.findOne({ where: { id } });
    return plainToInstance(ResponseTaskDto, reloaded, { excludeExtraneousValues: true });  
  }

}