import { NextFunction, Request, Response } from "express";

export default function sanitizeMedicosInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    usuario: {
      uid: req.body.uid,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      dni: req.body.dni,
      tipoDni: req.body.tipoDni,
      rol: { id: req.body.rol },
    },
    telefono: req.body.telefono,
    especialidad: { id: req.body.especialidad },
    matricula: req.body.matricula,
    horaDesde: req.body.horaDesde,
    horaHasta: req.body.horaHasta,
    diasAtencion: req.body.diasAtencion,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });

  Object.keys(req.body.sanitizedInput.usuario).forEach((key) => {
    if (req.body.sanitizedInput.usuario[key] === undefined) {
      delete req.body.sanitizedInput.usuario[key];
    }
  });

  next();
}
