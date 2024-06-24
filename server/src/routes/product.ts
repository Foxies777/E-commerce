// src/routes/product.ts
import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import ProductController from '../controllers/productController.js';
const router = Router();
const prisma = new PrismaClient();

router
  .post('/', ProductController.createProduct)
  .get('/', ProductController.getProducts);

export default router;
