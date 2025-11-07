import { ResponseProjectDto } from "../../project/dto/responseProject.dto.js";

export class ResponseTaskDto {

  id!: number;
  title!: string;
  description!: string;
  project?: ResponseProjectDto[];
}