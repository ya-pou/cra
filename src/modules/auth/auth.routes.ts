import { Router } from 'express';
import { AuthController } from './auth.controller.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';
import { validateDto } from '../../middleware/validate-dto.js';

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterDto'
 *     responses:
 *       201:
 *         description: Utilisateur créé + JWT
 */
router.post('/register', validateDto(RegisterDto), AuthController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connecte un utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDto'
 *     responses:
 *       200:
 *         description: JWT + infos utilisateur
 */
router.post('/login', validateDto(LoginDto), AuthController.login);

export default router;