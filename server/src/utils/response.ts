import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  statusCode: number;
}

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  data: T,
  message?: string
): Response => {
  return res.status(statusCode).json({
    success: statusCode < 400,
    data,
    message,
    statusCode,
  } as ApiResponse<T>);
};

export const sendError = (
  res: Response,
  statusCode: number,
  error: string,
  message?: string
): Response => {
  return res.status(statusCode).json({
    success: false,
    error,
    message: message || error,
    statusCode,
  } as ApiResponse);
};
