import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../config/data-source.js";
import { User } from "./user.entity.js";
import { plainToInstance } from "class-transformer";
import { ResponseUserDto } from "./dto/responseUserDto.js";
import { CreateUserDto } from "./dto/createUserDto.js";
import { UpdateUserDto } from "./dto/updateUserDto.js";


export class UserService {

  private userRepo = AppDataSource.getRepository(User);

  async findAll(): Promise<ResponseUserDto[]> {
    const users = await this.userRepo.find();
    return plainToInstance(ResponseUserDto, users);
  }
  
  //Faire des dto et alimenter le validateDto pour valider les paramètres et les query
  async findOneById(id: number): Promise<ResponseUserDto | null> {
    const user = await this.userRepo.findOneBy({id});
    return plainToInstance(ResponseUserDto, user);
  }

  async createUser(user: CreateUserDto): Promise<ResponseUserDto> {
    const newUser = this.userRepo.create(user);
    const save = await this.userRepo.save(newUser);
    return plainToInstance(ResponseUserDto, save);
  }

  async update(id: number, dto: UpdateUserDto): Promise<ResponseUserDto> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    // Merge les champs modifiables
    Object.assign(user, dto);

    const updated = await this.userRepo.save(user);
    const reloaded = await this.userRepo.findOne({ where: { id } });
    return plainToInstance(ResponseUserDto, reloaded, { excludeExtraneousValues: true });  
  }
}
