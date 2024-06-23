// server/src/controllers/cartController.ts

import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import ApiError from '../utils/ApiError.js';

const prisma = new PrismaClient();

class CartController {
    async addToCart(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId, productId } = req.body;
            if (!userId || !productId) {
                return next(ApiError.badRequest('Необходимо указать userId и productId'));
            }
            const cart = await prisma.cart.create({
                data: {
                    userId: Number(userId),
                    productId: Number(productId)
                }
            });
            res.status(201).json(cart);
        } catch (error) {
            next(error);
        }
    }

    async deleteFromCart(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const cartItem = await prisma.cart.delete({
                where: { id: Number(id) }
            });
            res.json({ message: 'Cart item deleted', cartItem });
        } catch (error) {
            next(error);
        }
    }

    async getCart(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            const cart = await prisma.cart.findMany({
                where: { userId: Number(userId) },
                include: { product: true }
            });
            res.json(cart);
        } catch (error) {
            next(error);
        }
    }
    async increaseQuantity(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const cartItem = await prisma.cart.update({
                where: { id: Number(id) },
                data: { count: { increment: 1 } }
            });
            res.json(cartItem);
        } catch (error) {
            next(error);
        }
    }

    async decreaseQuantity(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const cartItem = await prisma.cart.update({
                where: { id: Number(id) },
                data: { count: { decrement: 1 } }
            });
            if (cartItem.count <= 0) {
                await prisma.cart.delete({
                    where: { id: Number(id) }
                });
                return res.json({ message: 'Cart item deleted' });
            }
            res.json(cartItem);
        } catch (error) {
            next(error);
        }
    }
}

export default new CartController();
