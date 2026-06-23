import { Request, Response, NextFunction } from 'express';
import { prisma } from '../app';

export const getCoupons = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { restaurantId } = req.query;
    const coupons = await prisma.coupon.findMany({
      where: {
        restaurantId: String(restaurantId),
      }
    });
    res.status(200).json({ success: true, data: coupons });
  } catch (error) {
    next(error);
  }
};

export const createCoupon = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, discountType, discountVal, minOrderVal, validFrom, validTo, restaurantId } = req.body;
    
    const coupon = await prisma.coupon.create({
      data: {
        code: code.toUpperCase(),
        discountType,
        discountVal: Number(discountVal),
        minOrderVal: Number(minOrderVal),
        validFrom: new Date(validFrom),
        validTo: new Date(validTo),
        restaurantId,
      }
    });
    
    res.status(201).json({ success: true, data: coupon });
  } catch (error) {
    next(error);
  }
};
