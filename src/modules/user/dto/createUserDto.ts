import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsString()
  @Length(1,50)
  name!: string;

  @IsString()
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}