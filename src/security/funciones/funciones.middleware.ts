import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";

export default function sanitizeFuncionInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    roles: req.body.roles.length
      ? req.body.roles.map((id: string) => new ObjectId(id))
      : req.body.roles,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });

  next();
}
