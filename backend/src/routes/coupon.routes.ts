import { Router } from 'express';
import { getCoupons, createCoupon } from '../controllers/coupon.controller';

const router = Router();

router.get('/', getCoupons);
router.post('/', createCoupon);

export default router;
