import { ZodError, ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateSchema = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
         res.status(400).json({ error: "Task is required" });
         return 
      }
      next(error); 
    }
  };
};
