import type { Response } from 'express';
import { getDb } from '../config/connection';
import { Request } from '../types';
import {
  CreateDepartmentDto,
  CreateDepartmentSchema,
  UpdateDeparmentDto,
  UpdateDepartmentSchema
} from '../dtos/department.dtos';
import { PaginationSchema } from '../dtos/pagination.dtos';
import { ObjectId, Sort } from 'mongodb';

export async function createDepartment(req: Request<CreateDepartmentDto>, res: Response) {
  const department = CreateDepartmentSchema.parse(req.body);

  const db = getDb();

  if (await db.collection('departments').findOne({ name: { $eq: department.name } })) {
    return res.status(400).json({ message: 'Department already exists' });
  }

  const result = await db.collection('departments').insertOne(department);

  return res.status(201).json({
    message: 'Department created successfully',
    data: {
      ...department,
      _id: result.insertedId
    }
  });
}

export async function getDepartment(req: Request, res: Response) {
  const db = getDb();
  const department = await db.collection('departments').findOne({ _id: new ObjectId(req.params.id) });

  if (!department) {
    return res.status(404).json({ message: 'Department not found' });
  }

  return res.status(200).json(department);
}

export async function getDepartments(req: Request, res: Response) {
  const db = getDb();
  const { page, limit } = PaginationSchema.parse(req.query);
  const { search, sort, order } = req.query;

  const searchQuery = search ? { name: { $regex: search, $options: 'i' } } : {};

  const sortQuery: Sort = sort && order ? { [sort as string]: order === 'desc' ? -1 : 1 } : {};

  const total = await db.collection('departments').countDocuments(searchQuery);

  const result = await db
    .collection('departments')
    .find(searchQuery)
    .sort(sortQuery)
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit))
    .toArray();

  return res.status(200).json({
    data: result,
    totalPages: Math.ceil(total / Number(limit))
  });
}

export async function updateDepartment(req: Request<UpdateDeparmentDto>, res: Response) {
  const data = UpdateDepartmentSchema.parse(req.body);

  const db = getDb();

  if (!(await db.collection('departments').findOne({ _id: new ObjectId(req.params.id) }))) {
    return res.status(400).json({ message: 'Department does not exists' });
  }

  await db.collection('departments').updateOne({ _id: new ObjectId(req.params.id) }, { $set: data });

  const deparment = await db.collection('departments').findOne({ _id: new ObjectId(req.params.id) });

  return res.status(200).json({ message: 'Department updated successfully', data: { ...deparment } });
}

export async function deleteDepartment(req: Request, res: Response) {
  const db = getDb();

  const department = await db.collection('departments').findOne({ _id: new ObjectId(req.params.id) });

  if (!department) {
    return res.status(404).json({ message: 'Department not found' });
  }

  await db.collection('departments').deleteOne({ _id: new ObjectId(req.params.id) });

  return res.status(200).json({ message: 'Department deleted successfully' });
}
