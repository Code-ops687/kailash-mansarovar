import { Request, Response, NextFunction } from 'express';
import { prisma } from '../app';

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { restaurantId } = req.query;
    const categories = await prisma.category.findMany({
      where: restaurantId ? { restaurantId: String(restaurantId) } : undefined,
    });
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, image, restaurantId } = req.body;
    const category = await prisma.category.create({
      data: { name, description, image, restaurantId },
    });
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};
