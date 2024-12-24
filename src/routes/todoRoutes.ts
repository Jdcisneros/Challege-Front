import { z } from "zod";
import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  editTodo,
} from "../controller/todoController";
import express from "express";
import { validateSchema } from "../config/validate";



const router = express.Router();

const todoSchema = z.object({
  task: z.string().min(1, "Task is required"),
});

/**
 * @openapi
 * /api/todo:
 *   get:
 *     summary: Get all todos
 *     description: Returns a list of all todos.
 *     responses:
 *       200:
 *         description: A list of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   task:
 *                     type: string
 *             
 */
router.get('/', getTodos);

/**
 * @openapi
 * /api/todo:
 *   post:
 *     summary: Create a new todo
 *     description: Creates a new task in the todo list.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               task:
 *                 type: string
 *               
 *     responses:
 *       201:
 *         description: Todo created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', validateSchema(todoSchema), createTodo);

/**
 * @openapi
 * /api/todo/{id}:
 *   get:
 *     summary: Get a todo by ID
 *     description: Returns a single todo by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the todo
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 task:
 *                   type: string
 *                
 *       404:
 *         description: Todo not found
 */
router.get('/:id', validateSchema(todoSchema), getTodoById);

/**
 * @openapi
 * /api/todo/{id}:
 *   put:
 *     summary: Update a todo by ID
 *     description: Updates a specific todo.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the todo to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               task:
 *                 type: string
 *                 
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Todo not found
 */
router.put('/:id', validateSchema(todoSchema), editTodo);

/**
 * @openapi
 * /api/todo/{id}:
 *   delete:
 *     summary: Delete a todo by ID
 *     description: Deletes a specific todo.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the todo to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *       404:
 *         description: Todo not found
 */
router.delete('/:id',  deleteTodo);

export default router;
