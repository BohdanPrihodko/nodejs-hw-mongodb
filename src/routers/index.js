import { Router } from 'express';
import contactsRoutes from './contacts.js';
import authRoutes from './auth.js';

const router = Router();

router.use('/contacts', contactsRoutes);
router.use('/auth', authRoutes);

export default router;
