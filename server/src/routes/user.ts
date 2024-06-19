import { Router } from 'express';
import UserController from '../controllers/userController.js';
import authenticate from '../middleware/userMiddleware.js';

const router = Router();

router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.get('/check', authenticate, UserController.check);

export default router;
