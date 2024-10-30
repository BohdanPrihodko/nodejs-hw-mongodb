import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerUserSchema, loginUserSchema } from '../validation/auth.js';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshSession,
} from '../controllers/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUser),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUser),
);

router.post('/logout', ctrlWrapper(logoutUser));
router.post('/refresh', ctrlWrapper(refreshSession));

export default router;
