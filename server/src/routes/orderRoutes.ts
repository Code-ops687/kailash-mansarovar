import { Router } from 'express';
import { OrderController } from '../controllers/orderController';
import { authMiddleware, requireRole } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { createOrderSchema, updateOrderStatusSchema } from '../validators';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// Customer routes
router.post('/', authMiddleware, validateRequest(createOrderSchema), asyncHandler(OrderController.createOrder));
router.get('/my-orders', authMiddleware, asyncHandler(OrderController.getMyOrders));
router.get('/:id', authMiddleware, asyncHandler(OrderController.getOrderById));

// Admin/Kitchen routes
router.get('/', authMiddleware, requireRole(['ADMIN', 'MANAGER', 'KITCHEN_STAFF']), asyncHandler(OrderController.getAllOrders));
router.put('/:id/status', authMiddleware, requireRole(['ADMIN', 'KITCHEN_STAFF', 'WAITER']), validateRequest(updateOrderStatusSchema), asyncHandler(OrderController.updateOrderStatus));

export default router;
