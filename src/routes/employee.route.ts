import { Router } from 'express';
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee
} from '../controllers/employee.controller';

const router = Router();

/**
 * @openapi
 * /employees/{id}:
 *   get:
 *     tags:
 *      - employees
 *     summary: Retrieve a single employee
 *     description: Retrieve details of a specific employee by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the employee to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detailed information about an employee.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 */
router.get('/:id', getEmployee);

/**
 * @openapi
 * /employees:
 *   get:
 *     tags:
 *      - employees
 *     summary: Retrieve a list of employees
 *     description: Retrieve a list of all employees in the organization.
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
 *        description: Search for employees by fullName.
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
 *         description: A list of employees.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PaginatedEmployees'
 */
router.get('/', getEmployees);

/**
 * @openapi
 * /employees:
 *   post:
 *     tags:
 *      - employees
 *     summary: Create a new employee
 *     description: Creates a new employee in the organization.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       201:
 *         description: Employee created successfully.
 */
router.post('/', createEmployee);

/**
 * @openapi
 * /employees/{id}:
 *   patch:
 *     tags:
 *      - employees
 *     summary: Update an existing employee
 *     description: Updates details of an existing employee by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the employee to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: Employee updated successfully.
 */
router.patch('/:id', updateEmployee);

/**
 * @openapi
 * /employees/{id}:
 *   delete:
 *     tags:
 *      - employees
 *     summary: Delete an employee
 *     description: Deletes an employee by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the employee to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Employee deleted successfully.
 */
router.delete('/:id', deleteEmployee);

export default router;
