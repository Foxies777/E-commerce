import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';

const prisma = new PrismaClient();

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return next(ApiError.unauthorized('Токен не предоставлен'));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number; email: string };
        const user = await prisma.user.findUnique({ where: { id: decoded.id } });
        if (!user) {
            return next(ApiError.unauthorized('Пользователь не найден'));
        }

        req.user = user;
        next();
    } catch (error) {
        return next(ApiError.unauthorized('Некорректный токен'));
    }
};

export default authenticate;
