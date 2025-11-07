import { Router } from 'express';
import { ProjectController } from './project.controller.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Gestion des projets
 */


/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Récupère la liste des projets
 *     description: Retourne tous les projets enregistrés dans la base de données.
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: Liste des projets récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/', ProjectController.getAll);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Récupère un projet par son identifiant
 *     description: Retourne les informations d’un projet spécifique à partir de son ID.
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identifiant unique du projet
 *     responses:
 *       200:
 *         description: Projet trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Aucun projet trouvé avec cet ID
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/:id', ProjectController.getById);

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Crée un nouveau projet
 *     description: Ajoute un projet dans la base de données.
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "mon projet"
 *               description:
 *                 type: string
 *                 example: "Ceci est mon projet"
 *     responses:
 *       201:
 *         description: Projet créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur interne du serveur
 */
router.post('/', ProjectController.create);

export default router;