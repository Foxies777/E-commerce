
import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

router.post('/', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.create({
    data: { email, password },
  });
  res.json(user);
});

export default router;
