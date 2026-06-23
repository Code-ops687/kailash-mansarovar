import { Request, Response, NextFunction } from 'express';
import { prisma } from '../app';
import bcrypt from 'bcrypt';

export const getStaff = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { restaurantId } = req.query;
    const staff = await prisma.user.findMany({
      where: {
        restaurantId: String(restaurantId),
      },
      include: {
        staffProfile: true,
        role: true,
      }
    });
    // Remove passwords before sending
    const safeStaff = staff.map(user => {
      const { password, ...rest } = user;
      return rest;
    });
    res.status(200).json({ success: true, data: safeStaff });
  } catch (error) {
    next(error);
  }
};

export const createStaff = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, firstName, lastName, restaurantId, roleId, department, position, shift } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const staffUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        restaurantId,
        roleId,
        staffProfile: {
          create: {
            department,
            position,
            shift,
          }
        }
      },
      include: {
        staffProfile: true,
        role: true,
      }
    });

    const { password: _, ...safeUser } = staffUser;
    res.status(201).json({ success: true, data: safeUser });
  } catch (error) {
    next(error);
  }
};
