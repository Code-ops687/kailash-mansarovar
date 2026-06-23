import { Router } from 'express';
import { PaymentController } from '../controllers/paymentController';
import { authMiddleware, requireRole } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { createPaymentSchema } from '../validators';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

router.post('/', authMiddleware, validateRequest(createPaymentSchema), asyncHandler(PaymentController.createPayment));
router.get('/order/:orderId', authMiddleware, asyncHandler(PaymentController.getPaymentByOrderId));
router.post('/:id/refund', authMiddleware, requireRole(['ADMIN', 'CASHIER']), asyncHandler(PaymentController.refundPayment));

export default router;
