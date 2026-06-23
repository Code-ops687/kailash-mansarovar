import { Request, Response, NextFunction } from 'express';
import { prisma } from '../app';
import { getIO } from '../websocket/socket';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { restaurantId, tableId, items, orderType, notes } = req.body;

    // Calculate total
    let totalAmount = 0;
    const orderItemsData = items.map((item: any) => {
      totalAmount += item.price * item.quantity;
      return {
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        price: item.price,
        notes: item.notes,
      };
    });

    const taxAmount = totalAmount * 0.05; // 5% tax for example
    const finalAmount = totalAmount + taxAmount;

    // Generate Order Number
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        restaurantId,
        tableId,
        orderType,
        totalAmount,
        taxAmount,
        finalAmount,
        notes,
        orderItems: {
          create: orderItemsData,
        },
      },
      include: {
        orderItems: {
          include: {
            menuItem: true,
          }
        },
        table: true,
      }
    });

    // Emit socket event to kitchen
    const io = getIO();
    io.to(`kitchen_${restaurantId}`).emit('newOrder', order);

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { restaurantId, status } = req.query;
    
    const orders = await prisma.order.findMany({
      where: {
        ...(restaurantId ? { restaurantId: String(restaurantId) } : {}),
        ...(status ? { status: String(status) } : {}),
      },
      include: {
        orderItems: {
          include: {
            menuItem: true,
          }
        },
        table: true,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });
    
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await prisma.order.update({
      where: { id },
      data: { status },
      include: {
        orderItems: {
          include: { menuItem: true }
        },
        table: true,
      }
    });

    // Emit updates
    const io = getIO();
    io.to(`kitchen_${order.restaurantId}`).emit('orderUpdated', order);
    io.to(`order_${order.id}`).emit('statusUpdated', { status: order.status });

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};
