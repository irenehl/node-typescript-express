import { z } from 'zod';

export const CreateDepartmentSchema = z
  .object({
    name: z.string().min(2).max(50),
    location: z.string().min(2).max(100)
  })
  .required();

export const UpdateDepartmentSchema = z
  .object({
    name: z.string().min(2).max(50),
    location: z.string().min(2).max(100)
  })
  .partial();

export type CreateDepartmentDto = z.infer<typeof CreateDepartmentSchema>;
export type UpdateDeparmentDto = z.infer<typeof UpdateDepartmentSchema>;
