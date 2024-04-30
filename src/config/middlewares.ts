import type { Request, Response, NextFunction } from 'express';
import { EnvVars } from '../types';
import logger from './logger';
import { getDb } from './connection';
import { MongoError } from 'mongodb';
import { ZodError } from 'zod';

export function apiKeyMiddleware(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers['x-api-key'];

  if (apiKey !== EnvVars.API_KEY) {
    res.status(401).json({ message: 'Unauthorized' });
  } else {
    next();
  }
}

export function httpLoggerMiddleware(req: Request, res: Response, next: NextFunction) {
  const start = process.hrtime();
  res.on('finish', () => {
    const elapsed = process.hrtime(start);
    const responseTime = elapsed[0] * 1000 + elapsed[1] / 1e6;
    logger.info(`HTTP ${req.method} ${req.originalUrl}, ${res.statusCode}, ${responseTime.toFixed(2)} ms`);
  });
  next();
}

/**
 * @openapi
 * /health:
 *   get:
 *     tags:
 *      - health
 *     summary: Check the health of the application.
 *     description: Check the health of the application and database connection.
 *     responses:
 *       200:
 *         description: Employee created successfully.
 *         content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/HealthCheck'
 */
export async function healthMiddleware(req: Request, res: Response) {
  const db = getDb();
  const ping = await db.command({ ping: 1 });

  const data = {
    uptime: process.uptime(),
    date: new Date(),
    db: ping.ok === 1 ? 'connected' : 'disconnected'
  };

  return res.status(200).json(data);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function errorHandlerMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  logger.error(err.stack || err.message);

  if (err instanceof ZodError) {
    const messages = err.errors.map((e) => `${e.path.join('.')} - ${e.message}`).join(', ');
    return res.status(400).json({ message: 'Validation error', errors: messages });
  } else if (err instanceof MongoError) {
    return res.status(500).json({ message: `Database error: ${err.message}` });
  } else {
    return res.status(500).json({ message: err.message || 'Something went wrong' });
  }
}
