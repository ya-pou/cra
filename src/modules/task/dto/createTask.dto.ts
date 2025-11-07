import { IsString, Length, IsOptional, IsPositive, IsInt } from "class-validator";

export class CreateTaskDto {
  @IsString()
  @Length(1,50)
  title!: string;

  @IsString()
  @Length(0, 500)
  description?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  projectId?: number;
}