import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { authMiddleware } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { registerSchema, loginSchema } from '../validators';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

router.post('/register', validateRequest(registerSchema), asyncHandler(AuthController.register));
router.post('/login', validateRequest(loginSchema), asyncHandler(AuthController.login));
router.post('/logout', authMiddleware, asyncHandler(AuthController.logout));
router.post('/refresh', asyncHandler(AuthController.refreshToken));
router.get('/me', authMiddleware, asyncHandler(AuthController.getCurrentUser));

export default router;
