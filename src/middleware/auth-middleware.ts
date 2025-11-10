import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
// import { HttpError } from '../errors/http-error';

export interface AuthRequest extends Request {
  user?: { userId: number; email: string };
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header) throw new Error('Missing authorization header');

  const token = header.split(' ')[1];
  if(!token) throw new Error('Can\'t find token');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret') as unknown as {
      userId: number;
      email: string;
    };
    req.user = decoded;
    next();
  } catch {
    throw new Error('Invalid or expired token');
  }
}