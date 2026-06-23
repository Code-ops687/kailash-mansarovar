import { PrismaClient } from '@prisma/client';
import { CreateOrderInput } from '../validators';
import { NotFoundError, ValidationError } from '../utils/errors';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export class OrderService {
  async createOrder(userId: string, data: CreateOrderInput) {
    // Validate menu items exist
    const menuItemIds = data.items.map(item => item.menuItemId);
    const menuItems = await prisma.menuItem.findMany({
      where: { id: { in: menuItemIds } },
    });

    if (menuItems.length !== data.items.length) {
      throw new ValidationError('Some menu items not found');
    }

    // Calculate totals
    let totalAmount = 0;
    const orderItems = data.items.map(item => {
      const menuItem = menuItems.find(m => m.id === item.menuItemId);
      const itemTotal = (menuItem?.finalPrice || 0) * item.quantity;
      totalAmount += itemTotal;
      return {
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        price: menuItem?.finalPrice || 0,
        addOns: item.addOns ? JSON.stringify(item.addOns) : null,
        specialInstructions: item.specialInstructions,
      };
    });

    // Apply coupon if provided
    let discountAmount = 0;
    let couponId: string | undefined;
    if (data.couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: data.couponCode },
      });
      if (coupon && new Date() < coupon.expiryDate && coupon.isActive) {
        if (coupon.minOrderAmount && totalAmount < coupon.minOrderAmount) {
          throw new ValidationError(`Minimum order amount ${coupon.minOrderAmount} required`);
        }
        discountAmount = coupon.discountType === 'PERCENTAGE' ? (totalAmount * coupon.discountValue) / 100 : coupon.discountValue;
        if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
          discountAmount = coupon.maxDiscount;
        }
        couponId = coupon.id;
      }
    }

    // Calculate tax (18% GST)
    const taxAmount = ((totalAmount - discountAmount) * 18) / 100;
    const finalAmount = totalAmount - discountAmount + taxAmount;

    // Create order
    const order = await prisma.order.create({
      data: {
        userId,
        orderNumber: `ORD-${uuidv4().substring(0, 8).toUpperCase()}`,
        tableNumber: data.tableNumber,
        totalAmount,
        taxAmount,
        discountAmount,
        finalAmount,
        specialNotes: data.specialNotes,
        estimatedTime: 30,
        orderItems: {
          createMany: {
            data: orderItems,
          },
        },
        ...(couponId && { coupon: { connect: { id: couponId } } }),
      },
      include: {
        orderItems: { include: { menuItem: true } },
      },
    });

    return order;
  }

  async getOrderById(id: string) {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: { include: { menuItem: true } },
        payment: true,
      },
    });

    if (!order) {
      throw new NotFoundError('Order not found');
    }

    return order;
  }

  async getOrdersByUser(userId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: { userId },
        include: { orderItems: { include: { menuItem: true } } },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.order.count({ where: { userId } }),
    ]);

    return {
      orders,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  async updateOrderStatus(orderId: string, status: string) {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new NotFoundError('Order not found');

    const updated = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: status as any,
        completedAt: status === 'COMPLETED' ? new Date() : undefined,
      },
      include: { orderItems: { include: { menuItem: true } } },
    });

    return updated;
  }

  async getAllOrders(status?: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const where: any = {};
    if (status) where.status = status;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: { user: { select: { firstName: true, lastName: true, phone: true } }, orderItems: { include: { menuItem: true } } },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.order.count({ where }),
    ]);

    return {
      orders,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }
}
