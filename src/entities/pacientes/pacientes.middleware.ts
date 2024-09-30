import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";

export default function sanitizePacientesInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    usuario: {
      uid: req.body.usuario.uid,
      nombre: req.body.usuario.nombre,
      apellido: req.body.usuario.apellido,
      dni: req.body.usuario.dni,
      tipoDni: req.body.usuario.tipoDni,
      // rol: { id: req.body.usuario.rol },
    },
    email: req.body.email,
    password: req.body.password,
    repeatPassword: req.body.repeatPassword,
  };
  Object.keys(req.body.sanitizedInput.usuario).forEach((key) => {
    if (req.body.sanitizedInput.usuario[key] === undefined) {
      delete req.body.sanitizedInput.usuario[key];
    }
  });

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });

  console.log(req.body.sanitizedInput);
  next();
}
