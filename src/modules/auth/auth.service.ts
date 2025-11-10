import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { AppDataSource } from '../../config/data-source.js';
import { User } from '../user/user.entity.js';
// import { HttpError } from '../../errors/http-error.js';

export class AuthService {
  private userRepo = AppDataSource.getRepository(User);

  async register(name: string, email: string, password: string) {
    const existing = await this.userRepo.findOne({ where: { email } });
    if (existing) throw new Error('Email already in use');

    const hash = await bcrypt.hash(password, 10);
    const newUser = this.userRepo.create({ name, email, password: hash });
    const saved = await this.userRepo.save(newUser);

    const token = this.generateToken(saved.id, saved.email);
    return { user: saved, token };
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) throw new Error('Invalid credentials');
    console.log(email, password);
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Invalid credentials');

    const token = this.generateToken(user.id, user.email);
    return { user, token };
  }

  private generateToken(userId: number, email: string) {
    // if(!userId) throw Error('userId obligatoire');
    // if(!email) throw Error('email obligatoire');
    return jwt.sign(
      { 
        userId, 
        email,
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
      },
      process.env.JWT_SECRET || 'dev_secret',
    );
  }
}

export const authService = new AuthService();