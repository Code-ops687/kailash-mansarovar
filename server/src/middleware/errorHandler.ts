import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import { sendError } from '../utils/response';
import { logger } from '../utils/logger';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('Error occurred', err);

  if (err instanceof AppError) {
    return sendError(res, err.statusCode, err.message);
  }

  if (err instanceof SyntaxError) {
    return sendError(res, 400, 'Invalid JSON');
  }

  return sendError(res, 500, 'Internal server error');
};

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
