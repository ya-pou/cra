import { NextFunction, Request, Response } from "express";
import { TaskService } from "./task.service.js";
import { CreateTaskDto } from "./dto/createTask.dto.js";
import { UpdateTaskDto } from "./dto/updateTask.dto.js";
import { AuthRequest } from "../../middleware/auth-middleware.js";

const taskService = new TaskService();

export class TaskController {

  static async getAllForUser(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const tasks = await taskService.findAllForUser(req.user!.userId);
      res.status(200).json(tasks);
    } catch (error) {
      next(error)
    }
  }

  static async getById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      if(!id) return res.status(400).json({message: 'Please enter an id'});
      const task = await taskService.finOneById(+id, req.user!.userId);
      if(!task) return res.status(404).json({message: "Task not found"});
      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const dto: CreateTaskDto = req.body
      const newProject = await taskService.create(dto, userId);
      res.status(201).json(newProject);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if(!req.params.id) throw new Error('id obligatoire');
      const id = parseInt(req.params.id, 10);
      const updated = await taskService.update(id, req.body as UpdateTaskDto, req.user!.userId);
      res.status(200).json(updated);
    } catch (error) {
      next(error)
    }
  }
}