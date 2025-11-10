import { Expose } from "class-transformer";
import { ResponseProjectDto } from "../../project/dto/responseProject.dto.js";

export class ResponseTaskDto {
  @Expose()
  id!: number;
  @Expose()
  title!: string;
  @Expose()
  description!: string;
  @Expose()
  project?: ResponseProjectDto[];
  @Expose()
  createdAt!: Date;
  @Expose()
  updatedAt?: Date;
}