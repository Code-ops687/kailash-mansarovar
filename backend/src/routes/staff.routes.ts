import { Router } from 'express';
import { getStaff, createStaff } from '../controllers/staff.controller';

const router = Router();

router.get('/', getStaff);
router.post('/', createStaff);

export default router;
