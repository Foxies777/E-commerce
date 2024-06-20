// src/routes/cart.ts
import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get cart for a user
router.get('/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;
  const cart = await prisma.cart.findMany({
    where: { userId: Number(userId) },
    include: { product: true }
  });
  res.json(cart);
});

// Add product to cart
router.post('/', async (req: Request, res: Response) => {
  const { productId, userId } = req.body;
  const cartItem = await prisma.cart.create({
    data: { productId, userId },
  });
  res.json(cartItem);
});

// Remove product from cart
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.cart.delete({
    where: { id: Number(id) },
  });
  res.sendStatus(204);
});

export default router;
