
import userControllers from './userController';
import { Router } from 'express';

const router = Router();

router.post('/login', userControllers.authUser);
router.get('/login', userControllers.login);

export default router;
