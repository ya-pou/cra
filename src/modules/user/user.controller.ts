import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service.js';
import { CreateUserDto } from './dto/createUserDto.js';
import { UpdateUserDto } from './dto/updateUserDto.js';

const userService = new UserService();

export class UserController {
  
  static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.findAll();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  static async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id
      if(!id) return res.status(400).json({message: 'Please enter an id'});
      const user = await userService.findOneById(+id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const dto: CreateUserDto = req.body;
      const newUser = await userService.createUser(dto);
      res.status(201).json(newUser)
    } catch (err) {
      next(err);
    }
  }

  static async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      if(!req.params.id) throw new Error('id obligatoire');
      const id = parseInt(req.params.id, 10);
      const updated = await userService.update(id, req.body as UpdateUserDto);
      console.log(updated);
      res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  }

}