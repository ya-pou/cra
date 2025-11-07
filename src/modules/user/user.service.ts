import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../config/data-source.js";
import { User } from "./user.entity.js";


export class UserService {

  private userRepo = AppDataSource.getRepository(User);

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findOneById(id: number): Promise<User | null> {
    console.log(id);
    return this.userRepo.findOneBy({id});
  }

  async createUser(user: Partial<User>): Promise<User> {
    const newUser = this.userRepo.create(user);
    return this.userRepo.save(newUser);
  }

}
