import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";

export default function sanitizePacientesInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    usuario: {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      tipoDni: req.body.tipoDni,
      dni: req.body.dni,
      rol: { id: req.body.rol },
    },
  };

  Object.keys(req.body.sanitizedInput.usuario).forEach((key) => {
    if (req.body.sanitizedInput.usuario[key] === undefined) {
      delete req.body.sanitizedInput.usuario[key];
    }
  });

  next();
}
