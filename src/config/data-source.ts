import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Task } from '../modules/task/task.entity.js';
import { User } from '../modules/user/user.entity.js';
import { Project } from '../modules/project/project.entity.js';

const isDev = process.env.NODE_ENV !== 'production';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT|| '3306', 10),
  username: process.env.DB_USER || 'cra_user',
  password: process.env.DB_PASSWORD || 'cra_pass',
  database: process.env.DB_NAME || 'cra_db',
  entities: [Task, User, Project],
  synchronize: process.env.TYPEORM_SYNC
    ? process.env.TYPEORM_SYNC === 'true'
    : isDev,
  logging: process.env.TYPEORM_LOGGING
    ? process.env.TYPEORM_LOGGING === 'true'
    : isDev
});