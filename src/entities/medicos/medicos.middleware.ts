import { NextFunction, Request, Response } from "express";

export default function sanitizeMedicosInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    usuario: {
      uid: req.body?.usuario?.uid,
      nombre: req.body?.usuario?.nombre,
      apellido: req.body?.usuario?.apellido,
      dni: req.body?.usuario?.dni,
      tipoDni: req.body?.usuario?.tipoDni,
    },
    email: req.body?.email,
    password: req.body.password,
    repeatPassword: req.body.repeatPassword,
    especialidad: { id: req.body?.especialidad },
    obrasocial: req.body?.obrasocial,
    matricula: req.body?.matricula,
    horaDesde: req.body?.horaDesde,
    horaHasta: req.body?.horaHasta,
    diasAtencion: req.body?.diasAtencion,
    indisponibilidad: req.body?.indisponibilidad,
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
  console.log(req.body.sanitizedInput);

  next();
}
