import { Request, Response, NextFunction } from "express";
import { AppError } from "./errors.js";

export function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      error: true,
      data: null,
    });
  }

  return res.status(500).json({
    message: error.message,
    error: true,
    data: null,
  });
}
