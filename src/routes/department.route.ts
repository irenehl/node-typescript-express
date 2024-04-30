import {
  createDepartment,
  deleteDepartment,
  getDepartment,
  getDepartments,
  updateDepartment
} from '../controllers/department.controller';
import { Router } from 'express';

const router = Router();

/**
 * @openapi
 * /departments:
 *   get:
 *     tags:
 *      - departments
 *     summary: Retrieve a list of departments
 *     description: Retrieve a list of all departments in the organization.
 *     parameters:
 *      - in: query
 *        name: page
 *        required: false
 *        description: Page number to retrieve.
 *        schema:
 *          type: integer
 *      - in: query
 *        name: limit
 *        required: false
 *        description: Number of items to retrieve per page.
 *        schema:
 *          type: integer
 *      - in: query
 *        name: search
 *        required: false
 *        description: Search for departments by name.
 *        schema:
 *          type: string
 *      - in: query
 *        name: sort
 *        required: false
 *        description: Column to sort by.
 *        schema:
 *          type: string
 *      - in: query
 *        name: order
 *        required: false
 *        description: Order to sort by.
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: A list of departments.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PaginatedDepartments'
 */
router.get('/', getDepartments);

/**
 * @openapi
 * /departments/{id}:
 *   get:
 *     tags:
 *      - departments
 *     summary: Retrieve a single department
 *     description: Retrieve details of a specific department by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the department to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detailed information about a department.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Department'
 */
router.get('/:id', getDepartment);

/**
 * @openapi
 * /departments:
 *   post:
 *     tags:
 *      - departments
 *     summary: Create a new department
 *     description: Creates a new department in the organization.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDepartmentDto'
 *     responses:
 *       201:
 *         description: Department created successfully.
 */
router.post('/', createDepartment);

/**
 * @openapi
 * /departments/{id}:
 *   patch:
 *     tags:
 *      - departments
 *     summary: Update an existing department
 *     description: Updates details of an existing department by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the department to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Department'
 *     responses:
 *       200:
 *         description: Department updated successfully.
 */
router.patch('/:id', updateDepartment);

/**
 * @openapi
 * /departments/{id}:
 *   delete:
 *     tags:
 *      - departments
 *     summary: Delete a department
 *     description: Deletes a department by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the department to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Department deleted successfully.
 */
router.delete('/:id', deleteDepartment);

export default router;
