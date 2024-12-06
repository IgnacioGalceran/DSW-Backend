import { NextFunction, Request, Response } from "express";

export default function sanitizeObraSocialInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    nombre: req.body?.nombre,
    cuit: req.body?.cuit,
    telefono: req.body?.telefono,
    email: req.body?.email,
    direccion: req.body?.direccion,
  };

  console.log("Input a sanitizar: ", req.body.sanitizedInput);

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });

  console.log("Inputsanitizado: ", req.body.sanitizedInput);

  next();
}
