import { NextFunction, Request, Response } from "express";
import { firebaseApp } from "../../firebaseConfig.js";
import { ObjectId } from "mongodb";
import { ExpiredToken, InvalidToken } from "../shared/errors.js";

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(req.headers);
  const token =
    (req.headers.authorization || req.headers.Authorization)
      ?.toString()
      .replace(/^Bearer\s/, "") || "";

  console.log(token);

  if (token === "") {
    return next(new InvalidToken());
  }

  try {
    const decodedToken = await firebaseApp.auth().verifyIdToken(token);
    console.log(decodedToken);
    req.headers.firebaseUid = decodedToken.uid;
    next();
  } catch (error: any) {
    if (error.errorInfo.code === "auth/id-token-expired") {
      next(new ExpiredToken());
    } else {
      next(error);
    }
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
