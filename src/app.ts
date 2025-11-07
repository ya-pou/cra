import express from 'express';
import dotenv from "dotenv";
import userRoutes from './modules/user/user.routes.js';
import projectRoutes from './modules/project/project.routes.js';
import taskRoutes from './modules/task/task.routes.js';
import { setupSwagger } from './docs/swagger.js';

dotenv.config();
const app = express();

app.use(express.json());

// Swagger
setupSwagger(app);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

export default app;
