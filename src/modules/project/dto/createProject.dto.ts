import { IsOptional, IsString, Length } from "class-validator";

export class CreateProjectDto {
  @IsString()
  @Length(3, 100)
  name!: string;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  description?: string;
}