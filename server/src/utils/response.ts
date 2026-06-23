import { Response } from 'express';

export const sendResponse = (
  res: Response,
  statusCode: number,
  data?: any,
  message?: string
) => {
  return res.status(statusCode).json({
    success: true,
    message: message || 'Request successful',
    data,
  });
};

export const sendError = (
  res: Response,
  statusCode: number,
  message: string
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    data: null,
  });
};
