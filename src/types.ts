import dotenv from 'dotenv';
import { z } from 'zod';
import { Request as ERequest } from 'express';

dotenv.config();

export interface Request<T = null> extends ERequest {
  body: T;
}

const EnvSchema = z.object({
  MONGODB_URI: z.string(),
  PORT: z.string().optional(),
  API_KEY: z.string()
});

export type Env = z.infer<typeof EnvSchema>;
export const EnvVars = EnvSchema.parse(process.env);
