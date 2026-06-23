import { Request, Response, NextFunction } from 'express';
import { prisma } from '../app';

export const auditLog = (action: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // We capture the original send to log after response is sent
    const originalSend = res.send;

    res.send = function (body: any): Response {
      res.send = originalSend;
      res.send(body);

      // Only log successful actions
      if (res.statusCode >= 200 && res.statusCode < 300) {
        // Extract restaurantId and userId (assume set by auth middleware)
        const restaurantId = req.body.restaurantId || req.query.restaurantId || (req as any).user?.restaurantId;
        const userId = (req as any).user?.id;

        if (restaurantId) {
          prisma.auditLog.create({
            data: {
              action,
              details: {
                method: req.method,
                url: req.originalUrl,
                ip: req.ip,
                body: req.method !== 'GET' ? req.body : undefined,
              },
              restaurantId: String(restaurantId),
              userId: userId || null,
            }
          }).catch(err => console.error('Audit Log Error:', err));
        }
      }
      return res;
    };
    next();
  };
};
