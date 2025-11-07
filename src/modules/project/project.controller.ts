import { NextFunction, Request, Response } from "express";
import { ProjectService } from "./project.service.js";

const projectService = new ProjectService();

export class ProjectController {

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const projects = await projectService.findAll();
      res.status(200).json(projects);
    } catch (error) {
      next(error)
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      if(!id) return res.status(400).json({message: 'Please enter an id'});
      const project = await projectService.finOneById(+id);
      if(!project) return res.status(404).json({message: "Project not found"});
      res.status(200).json(project);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {name,description,client,tasks} = req.body
      const newProject = await projectService.create({name,description,client,tasks})
      res.status(201).json(newProject);
    } catch (error) {
      next(error);
    }
  }
}