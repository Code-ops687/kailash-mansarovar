import { Request, Response, NextFunction } from 'express';
import { prisma } from '../app';

export const getInventory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { restaurantId } = req.query;
    const inventory = await prisma.inventory.findMany({
      where: {
        restaurantId: String(restaurantId),
      },
      include: {
        ingredients: true,
      }
    });
    res.status(200).json({ success: true, data: inventory });
  } catch (error) {
    next(error);
  }
};

export const addIngredient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { inventoryId, name, quantity, unit, minThreshold } = req.body;
    
    const ingredient = await prisma.ingredient.create({
      data: {
        name,
        quantity: Number(quantity),
        unit,
        minThreshold: Number(minThreshold),
        inventoryId,
      }
    });
    
    res.status(201).json({ success: true, data: ingredient });
  } catch (error) {
    next(error);
  }
};

export const updateStock = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const ingredient = await prisma.ingredient.update({
      where: { id },
      data: { quantity: Number(quantity) }
    });

    res.status(200).json({ success: true, data: ingredient });
  } catch (error) {
    next(error);
  }
};
