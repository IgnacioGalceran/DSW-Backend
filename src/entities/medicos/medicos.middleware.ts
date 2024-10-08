import { NextFunction, Request, Response } from "express";

export default function sanitizeMedicosInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("middle medicos");
  req.body.sanitizedInput = {
    usuario: {
      uid: req.body?.usuario?.uid,
      nombre: req.body?.usuario?.nombre,
      apellido: req.body?.usuario?.apellido,
      dni: req.body?.usuario?.dni,
      tipoDni: req.body?.usuario?.tipoDni,
      rol: { id: req.body?.usuario?.rol },
    },
    email: req.body?.email,
    password: req.body?.password,
    especialidad: { id: req.body?.especialidad },
    matricula: req.body?.matricula,
    horaDesde: req.body?.horaDesde,
    horaHasta: req.body?.horaHasta,
    diasAtencion: req.body?.diasAtencion,
  };

  console.log(req.body.sanitizedInput);

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
