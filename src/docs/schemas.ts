export const swaggerSchemas = {
  User: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      name: { type: 'string', example: 'John Doe' },
      email: { type: 'string', example: 'johndoe@mail.com' },
    },
  },
  Project: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      title: { type: 'string' },
    },
  },
  Task: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      title: { type: 'string' },
      description: { type: 'string' },
      hours: {type: 'number'}
    }
  }
};