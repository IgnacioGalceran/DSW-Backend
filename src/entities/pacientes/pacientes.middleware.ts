import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";

export default function sanitizePacientesInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    rol: req.body.rol,
    tipoDni: req.body.tipoDni,
    dni: req.body.dni,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });

  next();
}
