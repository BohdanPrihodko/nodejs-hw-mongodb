import { Router } from 'express';
import contactsRoutes from './contacts.js';
import authRoutes from './auth.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use('/contacts', authenticate, contactsRoutes);
router.use('/auth', authRoutes);

export default router;
