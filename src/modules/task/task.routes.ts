import { Router } from 'express';
import { TaskController } from './task.controller.js';
import { validateDto } from '../../middleware/validate-dto.js';
import { CreateTaskDto } from './dto/createTask.dto.js';
import { UpdateTaskDto } from './dto/updateTask.dto.js';
import { authMiddleware } from '../../middleware/auth-middleware.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Gestion des tâches
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Récupère la liste des tâches
 *     description: Retourne toutes les tâches enregistrées dans la base de données.
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Liste des tâches récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/', authMiddleware, TaskController.getAllForUser);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Récupère une tâche par son identifiant
 *     description: Retourne les informations d’une tâche spécifique à partir de son ID.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identifiant unique de la tâche
 *     responses:
 *       200:
 *         description: Tâche trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Aucune tâche trouvée avec cet ID
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/:id', authMiddleware, TaskController.getById);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crée une nouvelle tâche
 *     description: Ajoute une nouvelle tâche dans la base de données. Une tâche peut être associée à un projet ou être indépendante.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       201:
 *         description: Tâche créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur interne du serveur
 */
router.post('/',
  authMiddleware,
  validateDto(CreateTaskDto),
  TaskController.create
);

/**
 * @swagger
 * /tasks/{id}:
 *   patch:
 *     summary: Met à jour une tache
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTaskDto'
 *     responses:
 *       200:
 *         description: Tache mise à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseTaskDto'
 *       404:
 *         description: Tache non trouvé
 */
router.patch('/:id', authMiddleware, validateDto(UpdateTaskDto), TaskController.update);

export default router;