import { Request, Response, NextFunction } from "express";
import { CustomError } from "./customErrors";
import { ZodError } from "zod";

export function errorMiddleWave(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: err.issues,
    });
  }

  const statusCode =
    err instanceof CustomError ? err.statusCode : 500;

  res.status(statusCode).json({
    message: err.message,
  });
}