import { Request, Response } from 'express';
import { PaymentService } from '../services/paymentService';
import { sendResponse, sendError } from '../utils/response';
import { HTTP_STATUS } from '../constants';

const paymentService = new PaymentService();

export class PaymentController {
  static async createPayment(req: Request, res: Response) {
    try {
      const payment = await paymentService.createPayment(req.body);
      return sendResponse(res, HTTP_STATUS.CREATED, payment, 'Payment created successfully');
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message);
    }
  }

  static async getPaymentByOrderId(req: Request, res: Response) {
    try {
      const payment = await paymentService.getPaymentByOrderId(req.params.orderId);
      return sendResponse(res, HTTP_STATUS.OK, payment);
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message);
    }
  }

  static async refundPayment(req: Request, res: Response) {
    try {
      const payment = await paymentService.refundPayment(req.params.id);
      return sendResponse(res, HTTP_STATUS.OK, payment, 'Payment refunded successfully');
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message);
    }
  }
}
