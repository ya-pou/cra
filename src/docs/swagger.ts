import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { swaggerSchemas } from './schemas.js';

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CRA API',
      version: '1.0.0',
      description: 'API de compte rendu d\'activité',
    },
    servers: [
      {    
        url: process.env.API_BASE_URL || 'http://localhost:3000/api',
        description: `${process.env.NODE_ENV || 'development'} environment`,
      },
    ],
    components: {schemas: swaggerSchemas},
  },
  apis: ['src/modules/*/*.routes.ts']
}

const swaggerSpec = swaggerJsDoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}