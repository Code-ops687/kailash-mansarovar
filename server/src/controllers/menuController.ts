import { Request, Response } from 'express';
import { MenuService } from '../services/menuService';
import { sendResponse, sendError } from '../utils/response';
import { HTTP_STATUS } from '../constants';

const menuService = new MenuService();

export class MenuController {
  static async getAllMenuItems(req: Request, res: Response) {
    try {
      const { categoryId, page = 1, limit = 20 } = req.query;
      const result = await menuService.getAllMenuItems(
        categoryId as string,
        parseInt(page as string),
        parseInt(limit as string)
      );
      return sendResponse(res, HTTP_STATUS.OK, result);
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message);
    }
  }

  static async getMenuItemById(req: Request, res: Response) {
    try {
      const item = await menuService.getMenuItemById(req.params.id);
      return sendResponse(res, HTTP_STATUS.OK, item);
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message);
    }
  }

  static async searchMenuItems(req: Request, res: Response) {
    try {
      const { q } = req.query;
      if (!q) {
        return sendError(res, 400, 'Search query required');
      }
      const items = await menuService.searchMenuItems(q as string);
      return sendResponse(res, HTTP_STATUS.OK, items);
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message);
    }
  }

  static async getCategories(req: Request, res: Response) {
    try {
      const categories = await menuService.getCategories();
      return sendResponse(res, HTTP_STATUS.OK, categories);
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message);
    }
  }

  static async createMenuItem(req: Request, res: Response) {
    try {
      const item = await menuService.createMenuItem({ ...req.body, restaurantId: 'default' });
      return sendResponse(res, HTTP_STATUS.CREATED, item, 'Menu item created');
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message);
    }
  }

  static async updateMenuItem(req: Request, res: Response) {
    try {
      const item = await menuService.updateMenuItem(req.params.id, req.body);
      return sendResponse(res, HTTP_STATUS.OK, item, 'Menu item updated');
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message);
    }
  }

  static async deleteMenuItem(req: Request, res: Response) {
    try {
      const result = await menuService.deleteMenuItem(req.params.id);
      return sendResponse(res, HTTP_STATUS.OK, result);
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message);
    }
  }
}
