import { Request, Response, NextFunction } from "express";
import { InvalidId, NotFound, Repeated } from "./errors.js";

export function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("Error Handler:", res);

  if (
    error instanceof NotFound ||
    error instanceof InvalidId ||
    error instanceof Repeated
  ) {
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
