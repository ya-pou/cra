import { plainToInstance } from "class-transformer";
import { AppDataSource } from "../../config/data-source.js";
import { CreateProjectDto } from "./dto/createProject.dto.js";
import { Project } from "./project.entity.js";
import { ResponseProjectDto } from "./dto/responseProject.dto.js";
import { UpdateProjectDto } from "./dto/updateProject.dto.js";


export class ProjectService {

  private projectRepo = AppDataSource.getRepository(Project);

  async findAll(): Promise<ResponseProjectDto[]> { 
    const projects = await this.projectRepo.find();
    return plainToInstance(ResponseProjectDto, projects)
  }

  async findOneById(id: number): Promise<ResponseProjectDto | null> {
    const project = await this.projectRepo.findOneBy({id});
    return plainToInstance(ResponseProjectDto, project);
  }

  async create(project: CreateProjectDto): Promise<Project> {
    const newProject = this.projectRepo.create(project);
    const save = await this.projectRepo.save(newProject);
    return plainToInstance(ResponseProjectDto, save);
  }

  async update(id: number, dto: UpdateProjectDto): Promise<ResponseProjectDto> {
    const project = await this.projectRepo.findOne({ where: { id } });
    if (!project) {
      throw new Error(`Project with id ${id} not found`);
    }
    Object.assign(project, dto);
    const updated = await this.projectRepo.save(project);
    const reloaded = await this.projectRepo.findOne({ where: { id } });
    return plainToInstance(ResponseProjectDto, reloaded, { excludeExtraneousValues: true });  
  }
}