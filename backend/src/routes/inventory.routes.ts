import { Router } from 'express';
import { getInventory, addIngredient, updateStock } from '../controllers/inventory.controller';

const router = Router();

router.get('/', getInventory);
router.post('/ingredient', addIngredient);
router.patch('/ingredient/:id/stock', updateStock);

export default router;
