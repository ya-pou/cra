import { AppDataSource } from "../../config/data-source.js";
import { Project } from "./project.entity.js";


export class ProjectService {

  private projectRepo = AppDataSource.getRepository(Project);

  async findAll(): Promise<Project[]> { 
    return this.projectRepo.find();
  }

  async finOneById(id: number): Promise<Project | null> {
    return this.projectRepo.findOneBy({id});
  }

  async create(project: Partial<Project>): Promise<Project> {
    const newProject = this.projectRepo.create(project);
    return this.projectRepo.save(newProject);
  }

}