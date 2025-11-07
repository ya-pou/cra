import { NextFunction, Request, Response } from "express";
import { TaskService } from "./task.service.js";

const taskService = new TaskService();

export class TaskController {

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const tasks = await taskService.findAll();
      res.status(200).json(tasks);
    } catch (error) {
      next(error)
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      if(!id) return res.status(400).json({message: 'Please enter an id'});
      const task = await taskService.finOneById(+id);
      if(!task) return res.status(404).json({message: "Task not found"});
      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {title,description,hours,project} = req.body
      const newProject = await taskService.create({title,description,hours,project})
      res.status(201).json(newProject);
    } catch (error) {
      next(error);
    }
  }
}