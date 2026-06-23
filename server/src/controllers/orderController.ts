import { Request, Response } from 'express';
import { OrderService } from '../services/orderService';
import { sendResponse, sendError } from '../utils/response';
import { HTTP_STATUS } from '../constants';

const orderService = new OrderService();

export class OrderController {
  static async createOrder(req: Request, res: Response) {
    try {
      const order = await orderService.createOrder(req.userId!, req.body);
      return sendResponse(res, HTTP_STATUS.CREATED, order, 'Order created successfully');
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message);
    }
  }

  static async getOrderById(req: Request, res: Response) {
    try {
      const order = await orderService.getOrderById(req.params.id);
      return sendResponse(res, HTTP_STATUS.OK, order);
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message);
    }
  }

  static async getMyOrders(req: Request, res: Response) {
    try {
      const { page = 1, limit = 20 } = req.query;
      const result = await orderService.getOrdersByUser(
        req.userId!,
        parseInt(page as string),
        parseInt(limit as string)
      );
      return sendResponse(res, HTTP_STATUS.OK, result);
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message);
    }
  }

  static async updateOrderStatus(req: Request, res: Response) {
    try {
      const { status } = req.body;
      const order = await orderService.updateOrderStatus(req.params.id, status);
      return sendResponse(res, HTTP_STATUS.OK, order, 'Order status updated');
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message);
    }
  }

  static async getAllOrders(req: Request, res: Response) {
    try {
      const { status, page = 1, limit = 20 } = req.query;
      const result = await orderService.getAllOrders(
        status as string,
        parseInt(page as string),
        parseInt(limit as string)
      );
      return sendResponse(res, HTTP_STATUS.OK, result);
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message);
    }
  }
}
