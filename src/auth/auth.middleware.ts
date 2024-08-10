import { NextFunction, Request, Response } from "express";
import { firebaseApp } from "../../firebaseConfig.js";
import { ObjectId } from "mongodb";

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = (req.headers.authorization || req.headers.Authorization)
    ?.toString()
    .replace(/^Bearer\s/, "");

  if (!token) {
    return res.status(400).json({
      message: "Proporcione un Token",
      data: undefined,
      error: true,
    });
  }

  try {
    const decodedToken = await firebaseApp.auth().verifyIdToken(token);
    console.log(decodedToken);
    req.headers.firebaseUid = decodedToken.uid;
    next();
  } catch (error: any) {
    next(error);
  }
}

export function sanitizeMedicosInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    uid: req.body.uid,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    dni: req.body.dni,
    tipoDni: req.body.tipoDni,
    matricula: req.body.matricula,
    telefono: req.body.telefono,
    horaDesde: req.body.horaDesde,
    horaHasta: req.body.horaHasta,
    diasAtencion: req.body.diasAtencion,
    especialidad: new ObjectId(req.body.especialidad),
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    console.log(req.body.sanitizedInput[key]);
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });

  next();
}

export function sanitizePacientesInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    uid: req.body.uid,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    dni: req.body.dni,
    tipoDni: req.body.tipoDni,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    console.log(req.body.sanitizedInput[key]);
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });

  next();
}
