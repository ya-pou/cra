import { plainToInstance } from "class-transformer";
import { AppDataSource } from "../../config/data-source.js";
import { CreateProjectDto } from "./dto/createProject.dto.js";
import { Project } from "./project.entity.js";
import { ResponseProjectDto } from "./dto/responseProject.dto.js";


export class ProjectService {

  private projectRepo = AppDataSource.getRepository(Project);

  async findAll(): Promise<ResponseProjectDto[]> { 
    const projects = await this.projectRepo.find();
    return plainToInstance(ResponseProjectDto, projects)
  }

  async finOneById(id: number): Promise<ResponseProjectDto | null> {
    const project = await this.projectRepo.findOneBy({id});
    return plainToInstance(ResponseProjectDto, project);
  }

  async create(project: CreateProjectDto): Promise<Project> {
    const newProject = this.projectRepo.create(project);
    const save = await this.projectRepo.save(newProject);
    return plainToInstance(ResponseProjectDto, save);
  }

}