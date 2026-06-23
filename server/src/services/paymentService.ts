import { PrismaClient } from '@prisma/client';
import { CreatePaymentInput } from '../validators';
import { NotFoundError, ValidationError } from '../utils/errors';

const prisma = new PrismaClient();

export class PaymentService {
  async createPayment(data: CreatePaymentInput) {
    // Get order
    const order = await prisma.order.findUnique({
      where: { id: data.orderId },
    });

    if (!order) {
      throw new NotFoundError('Order not found');
    }

    if (order.paymentStatus === 'COMPLETED') {
      throw new ValidationError('Payment already completed for this order');
    }

    // Create payment
    const payment = await prisma.payment.create({
      data: {
        orderId: data.orderId,
        userId: order.userId,
        amount: data.amount,
        paymentMethod: data.paymentMethod,
        status: 'COMPLETED', // In real implementation, integrate with payment gateway
      },
    });

    // Update order payment status
    await prisma.order.update({
      where: { id: data.orderId },
      data: { paymentStatus: 'COMPLETED', paymentMethod: data.paymentMethod },
    });

    return payment;
  }

  async getPaymentByOrderId(orderId: string) {
    const payment = await prisma.payment.findUnique({
      where: { orderId },
    });

    if (!payment) {
      throw new NotFoundError('Payment not found');
    }

    return payment;
  }

  async refundPayment(paymentId: string) {
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
    });

    if (!payment) {
      throw new NotFoundError('Payment not found');
    }

    const refunded = await prisma.payment.update({
      where: { id: paymentId },
      data: { status: 'REFUNDED' },
    });

    await prisma.order.update({
      where: { id: payment.orderId },
      data: { paymentStatus: 'REFUNDED' },
    });

    return refunded;
  }
}
