// src/index.ts
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { PrismaClient } from '@prisma/client';
import userRoutes from './routes/user.js'
import productRoutes from './routes/product.js';
import cartRoutes from './routes/cart.js';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;
const prisma = new PrismaClient();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

app.get('/', async (req: Request, res: Response) => {
  res.send(`
    <h1>Welcome to Node Express Prisma API Server!</h1>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
