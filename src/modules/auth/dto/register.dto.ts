import { Expose } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @Expose()
  @IsString()
  name!: string;

  @Expose()
  @IsEmail()
  email!: string;

  @Expose()
  @IsString()
  @MinLength(6)
  password!: string;
}