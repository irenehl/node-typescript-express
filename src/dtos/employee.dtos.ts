import { z } from 'zod';

export const CreateEmployeeSchema = z
  .object({
    role: z.string().min(2).max(50),
    fullName: z.string().min(2).max(100),
    email: z.string().email(),
    phone: z.string().min(10).max(15),
    startDate: z.string(),
    salary: z.number().positive(),
    department: z.string().length(24)
  })
  .required();

export const UpdateEmployeeSchema = z
  .object({
    role: z.string().min(2).max(50),
    fullName: z.string().min(2).max(100),
    email: z.string().email(),
    phone: z.string().min(10).max(15),
    startDate: z.string(),
    salary: z.number().positive(),
    department: z.string().length(24)
  })
  .partial();

export type CreateEmployeeDto = z.infer<typeof CreateEmployeeSchema>;
export type UpdateEmployeeDto = z.infer<typeof UpdateEmployeeSchema>;
