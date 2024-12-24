import { NextFunction, Request, Response } from "express";
import Todo from "../models/todoModel";

export const getTodos = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todos = await Todo.findAll();
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

export const getTodoById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    if (!todo) {
      res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};

export const createTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { task } = req.body;
    if (!task) {
      res.status(400).json({ error: "Task is required" });
      return
    }

    const newTodo = await Todo.create({ task });
    res.status(200).json(newTodo);
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findByPk(id);
    if (!todo) {
      res.status(400).json({ error: "Todo is required" });
    }

    await todo?.destroy();
    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

export const editTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { task } = req.body;

    if (!task) {
      res.status(400).json({ error: "Task is required" });
      return
    }
    const todo = await Todo.findByPk(id);
    if (!todo) {
       res.status(404).json({ error: "Task not found" });
       return
    } else {
      todo.task = task;
      await todo.save();
    }
    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};
