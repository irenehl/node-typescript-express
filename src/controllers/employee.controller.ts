import type { Response } from 'express';
import { Request } from '../types';
import {
  CreateEmployeeDto,
  CreateEmployeeSchema,
  UpdateEmployeeDto,
  UpdateEmployeeSchema
} from '../dtos/employee.dtos';
import { getDb } from '../config/connection';
import { PaginationSchema } from '../dtos/pagination.dtos';
import { Db, ObjectId, Sort } from 'mongodb';

export async function getEmployees(req: Request, res: Response) {
  const db: Db = getDb();
  const { page, limit } = PaginationSchema.parse(req.query);
  const { search, sort, order } = req.query;

  type PipelineStage = { [key: string]: unknown };

  const pipeline: PipelineStage[] = [
    {
      $lookup: {
        from: 'departments',
        localField: 'department',
        foreignField: '_id',
        as: 'department'
      }
    }
  ];

  if (search) {
    pipeline.push({
      $match: { fullName: { $regex: search, $options: 'i' } }
    });
  }

  const sortQuery: Sort = sort && order ? { [sort as string]: order === 'desc' ? -1 : 1 } : { fullName: 1 };
  pipeline.push({ $sort: sortQuery });
  pipeline.push({ $skip: (Number(page) - 1) * Number(limit) });
  pipeline.push({ $limit: Number(limit) });

  const total = await db.collection('employees').countDocuments();

  const result = await db.collection('employees').aggregate(pipeline).toArray();

  return res.status(200).json({
    data: result,
    totalPages: Math.ceil(total / Number(limit))
  });
}

export async function getEmployee(req: Request, res: Response) {
  const db = getDb();
  const cursor = db.collection('employees').aggregate([
    {
      $lookup: {
        from: 'departments',
        localField: 'department',
        foreignField: '_id',
        as: 'department'
      }
    },
    {
      $unwind: '$department'
    },
    {
      $match: {
        _id: new ObjectId(req.params.id)
      }
    }
  ]);

  const employee = await cursor.next();

  if (!employee) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  return res.status(200).json(employee);
}

export async function createEmployee(req: Request<CreateEmployeeDto>, res: Response) {
  const employee = CreateEmployeeSchema.parse(req.body);

  const db = getDb();

  if (await db.collection('employees').findOne({ email: employee.email })) {
    return res.status(400).json({ message: 'Employee already exists' });
  }

  if (!(await db.collection('departments').findOne({ _id: new ObjectId(employee.department) }))) {
    return res.status(400).json({ message: 'Department does not exist' });
  }

  const result = await db.collection('employees').insertOne({
    ...employee,
    department: new ObjectId(employee.department)
  });

  return res.status(201).json({
    message: 'Employee created successfully',
    data: {
      ...employee,
      _id: result.insertedId
    }
  });
}

export async function updateEmployee(req: Request<UpdateEmployeeDto>, res: Response) {
  const data = UpdateEmployeeSchema.parse(req.body);

  const db = getDb();

  if (!(await db.collection('employees').findOne({ _id: new ObjectId(req.params.id) }))) {
    return res.status(400).json({ message: 'Employee does not exist' });
  }

  if (data.department && !(await db.collection('departments').findOne({ _id: new ObjectId(data.department) }))) {
    return res.status(400).json({ message: 'Department does not exist' });
  }

  await db.collection('employees').updateOne(
    { _id: new ObjectId(req.params.id) },
    {
      $set: {
        ...data,
        department: new ObjectId(data?.department)
      }
    }
  );

  const employee = await db.collection('employees').findOne({ _id: new ObjectId(req.params.id) });

  return res.status(200).json({ message: 'Employee updated successfully', data: { ...employee } });
}

export async function deleteEmployee(req: Request, res: Response) {
  const db = getDb();

  const employee = await db.collection('employees').findOne({ _id: new ObjectId(req.params.id) });

  if (!employee) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  await db.collection('employees').deleteOne({ _id: new ObjectId(req.params.id) });

  return res.status(200).json({ message: 'Employee deleted successfully' });
}
