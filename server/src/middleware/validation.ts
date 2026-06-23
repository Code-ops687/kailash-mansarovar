import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { ValidationError } from '../utils/errors';

export const validateRequest =
  (schema: ZodSchema, dataLocation: 'body' | 'query' | 'params' = 'body') =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = dataLocation === 'body' ? req.body : dataLocation === 'query' ? req.query : req.params;
      const validated = schema.parse(data);

      if (dataLocation === 'body') req.body = validated;
      else if (dataLocation === 'query') req.query = validated;
      else req.params = validated;

      next();
    } catch (error: any) {
      const message = error.errors?.[0]?.message || 'Validation failed';
      throw new ValidationError(message);
    }
  };
