import { Router } from 'express';
import { MenuController } from '../controllers/menuController';
import { authMiddleware, requireRole, optionalAuth } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { createMenuItemSchema, updateMenuItemSchema } from '../validators';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// Public routes
router.get('/', optionalAuth, asyncHandler(MenuController.getAllMenuItems));
router.get('/search', optionalAuth, asyncHandler(MenuController.searchMenuItems));
router.get('/categories', asyncHandler(MenuController.getCategories));
router.get('/:id', optionalAuth, asyncHandler(MenuController.getMenuItemById));

// Admin only routes
router.post('/', authMiddleware, requireRole(['ADMIN', 'MANAGER']), validateRequest(createMenuItemSchema), asyncHandler(MenuController.createMenuItem));
router.put('/:id', authMiddleware, requireRole(['ADMIN', 'MANAGER']), validateRequest(updateMenuItemSchema), asyncHandler(MenuController.updateMenuItem));
router.delete('/:id', authMiddleware, requireRole(['ADMIN']), asyncHandler(MenuController.deleteMenuItem));

export default router;
