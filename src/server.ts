import app from './app.js';
import { AppDataSource } from './config/data-source.js';

const PORT = process.env.PORT || 3000;

async function initializeDatabase() {
  try {
    await AppDataSource.initialize();
    console.log('Database connection etablished');
  } catch (error) {
    console.log(error as any);
    throw new Error('Probleme de connexion')
    process.exit(1);
  }
}

async function startServer(){
  await initializeDatabase();
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
  }).on("error", (error) => {
    throw new Error(error.message);
  })
}

startServer();