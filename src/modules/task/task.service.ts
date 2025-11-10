import { plainToInstance } from "class-transformer";
import { AppDataSource } from "../../config/data-source.js";
import { ResponseTaskDto } from "./dto/responseTask.dto.js";
import { Task } from "./task.entity.js";
import { CreateTaskDto } from "./dto/createTask.dto.js";
import { ProjectService } from "../project/project.service.js";
import { UpdateTaskDto } from "./dto/updateTask.dto.js";
import { User } from "../user/user.entity.js";
const projectService = new ProjectService();


export class TaskService {

  private taskRepo = AppDataSource.getRepository(Task);
  private userRepo = AppDataSource.getRepository(User);

  async findAllForUser(userId: number): Promise<ResponseTaskDto[]> { 
    const tasks = await this.taskRepo.find({ where: { user: { id: userId } }});
    return plainToInstance(ResponseTaskDto, tasks)
  }

  async finOneById(id: number, userId: number): Promise<ResponseTaskDto | null> {
    const task = await this.taskRepo.findOne({
      where: {
        id: id,
        user: { id: userId }
      },
      relations: ['project'],
    });

    if (!task) throw new Error("Task not found or access denied");    console.log(userId);
    return plainToInstance(ResponseTaskDto,task)
  }

  async create(task: CreateTaskDto, userId: number): Promise<ResponseTaskDto> {
    const newTask: Partial<Task> = { ...task };
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if(!user) { throw new Error('User not found'); }

    newTask.user = user

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

  async update(id: number, dto: UpdateTaskDto, userId: number): Promise<ResponseTaskDto> {
    const task = await this.taskRepo.findOne({
      where: { id: id, user: { id: userId } },
    });

    if (!task) throw new Error("Task not found or access denied");

    Object.assign(task, dto);
    const updated = await this.taskRepo.save(task);
    const reloaded = await this.taskRepo.findOne({ where: { id } });
    return plainToInstance(ResponseTaskDto, reloaded, { excludeExtraneousValues: true });  
  }

}