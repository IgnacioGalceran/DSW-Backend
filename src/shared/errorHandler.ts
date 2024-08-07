import { Request, Response, NextFunction } from "express";
import { InvalidId, InvalidJson, NotFound, Repeated } from "./errors.js";

export function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (
    error instanceof NotFound ||
    error instanceof InvalidId ||
    error instanceof Repeated ||
    error instanceof InvalidJson
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
