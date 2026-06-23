import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  const method = req.method;
  const url = req.originalUrl;

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const status = res.statusCode;
    logger.info(`${method} ${url} - ${status} - ${duration}ms`);
  });

  next();
};
