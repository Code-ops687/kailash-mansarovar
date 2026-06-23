import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { sendResponse, sendError } from '../utils/response';
import { HTTP_STATUS } from '../constants';

const authService = new AuthService();

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const result = await authService.register(req.body);

      res.cookie('accessToken', result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 15 * 60 * 1000, // 15 minutes
      });

      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return sendResponse(res, HTTP_STATUS.CREATED, result, 'Registration successful');
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message);
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const result = await authService.login(req.body);

      res.cookie('accessToken', result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 15 * 60 * 1000,
      });

      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return sendResponse(res, HTTP_STATUS.OK, result, 'Login successful');
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message);
    }
  }

  static async logout(req: Request, res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return sendResponse(res, HTTP_STATUS.OK, null, 'Logout successful');
  }

  static async refreshToken(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies?.refreshToken;
      if (!refreshToken) {
        return sendError(res, 401, 'No refresh token');
      }

      const tokens = await authService.refreshToken(refreshToken);

      res.cookie('accessToken', tokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 15 * 60 * 1000,
      });

      return sendResponse(res, HTTP_STATUS.OK, tokens, 'Token refreshed');
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message);
    }
  }

  static async getCurrentUser(req: Request, res: Response) {
    try {
      const user = await authService.getCurrentUser(req.userId!);
      return sendResponse(res, HTTP_STATUS.OK, user);
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message);
    }
  }
}
