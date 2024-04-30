import { Department } from './department.model';

export type Employee = {
  _id: string;
  role: string;
  fullName: string;
  email: string;
  phone: string;
  startDate: string;
  salary: number;
  department: Department;
};
