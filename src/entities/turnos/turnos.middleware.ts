import { NextFunction, Request, Response } from "express";

export default function sanitizeTurnoInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    fecha: req.body.fecha,
    medico: { id: req.body.medico },
    paciente: { id: req.body.paciente },
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });

  next();
}
