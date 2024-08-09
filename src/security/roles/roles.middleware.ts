import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";

export default function sanitizeRolInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    funciones: req.body.funciones.length
      ? req.body.funciones.map((id: string) => new ObjectId(id))
      : req.body.funciones,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });

  next();
}
