import { Request, Response, NextFunction } from 'express';
import { prisma } from '../app';

export const getMenuItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { restaurantId, categoryId } = req.query;
    const menuItems = await prisma.menuItem.findMany({
      where: {
        ...(restaurantId ? { restaurantId: String(restaurantId) } : {}),
        ...(categoryId ? { categoryId: String(categoryId) } : {}),
      },
      include: {
        category: true,
        addOns: true,
      }
    });
    res.status(200).json({ success: true, data: menuItems });
  } catch (error) {
    next(error);
  }
};

export const createMenuItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, price, categoryId, restaurantId, image, isVeg, isJain, spiceLevel, calories, prepTime } = req.body;
    const menuItem = await prisma.menuItem.create({
      data: {
        name,
        description,
        price: Number(price),
        categoryId,
        restaurantId,
        image,
        isVeg,
        isJain,
        spiceLevel,
        calories,
        prepTime,
      },
    });
    res.status(201).json({ success: true, data: menuItem });
  } catch (error) {
    next(error);
  }
};
