import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import { generateJWT } from '../utils/generateJWT.js';
import ApiError from '../utils/ApiError.js';

const prisma = new PrismaClient();

class UserController {
    async registration(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest('Заполните все поля'));
        }

        const candidate = await prisma.user.findUnique({ where: { email } });
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'));
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await prisma.user.create({
            data: { email, password: hashPassword },
        });

        const token = generateJWT(user.id, user.email);
        return res.json({ token });
    }

    async login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return next(ApiError.internal('Пользователь не существует'));
        }

        const comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.internal('Неверный пароль'));
        }

        const token = generateJWT(user.id, user.email);
        return res.json({ token });
    }

    async check(req: Request, res: Response) {
        if (!req.user) {
            return res.status(401).json({ message: 'Не авторизован' });
        }
        const { id, email } = req.user;
        const token = generateJWT(id, email);
        return res.json({ token });
    }
    async getUser(req: Request, res: Response) {
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: { id: Number(id) }
        });
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }
        return res.json(user);
    }

}

export default new UserController();
