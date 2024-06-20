// src/routes/product.ts
import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get all products
router.get('/', async (req: Request, res: Response) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

// Create a new product
router.post('/', async (req: Request, res: Response) => {
  const { title, description, price, img, userId } = req.body;
  const product = await prisma.product.create({
    data: { title, description, price, img, userId },
  });
  res.json(product);
});

export default router;
