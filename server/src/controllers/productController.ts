// server/src/controllers/productController.ts

import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import ApiError from '../utils/ApiError.js';

const prisma = new PrismaClient();

class ProductController {
    async createProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, description, img, price, user } = req.body;
            if (!title || !img || !price) {
                return next(ApiError.badRequest('Заполните все поля'));
            }
            const product = await prisma.product.create({
                data: { title, description, img, price, user },
            });
            return res.status(201).json(product);
        } catch (error) {
            next(error);
        }
    }

    async getProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const products = await prisma.product.findMany();
            return res.json(products);
        } catch (error) {
            next(error); 
        }
    }
}

export default new ProductController();
