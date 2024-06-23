// src/routes/cart.ts
import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import cartController from '../controllers/cartController.js';

const router = Router();
const prisma = new PrismaClient();

router.post('/', cartController.addToCart)
router.get('/:userId', cartController.getCart)
router.delete('/:id', cartController.deleteFromCart)
router.patch('/increase/:id', cartController.increaseQuantity);
router.patch('/decrease/:id', cartController.decreaseQuantity);

export default router;
