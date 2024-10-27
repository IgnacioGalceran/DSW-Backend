import { NextFunction, Request, Response } from "express";
import { firebaseApp } from "../../firebaseConfig.js";
import { ExpiredToken, InvalidToken } from "../shared/errors.js";

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token =
    (req.headers.authorization || req.headers.Authorization)
      ?.toString()
      .replace(/^Bearer\s/, "") || "";

  if (token === "") {
    return next(new InvalidToken());
  }

  try {
    const decodedToken = await firebaseApp.auth().verifyIdToken(token);

    req.headers.firebaseUid = decodedToken.uid;
    next();
  } catch (error: any) {
    if (error.errorInfo.code === "auth/id-token-expired") {
      next(new ExpiredToken());
    } else {
      console.log(error);
      next(error);
    }
  }
}

export function sanitizeAdministradorInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(req.body.sanitizedInput);
  req.body.sanitizedInput = {
    usuario: {
      uid: req.body.usuario.uid,
      nombre: req.body.usuario.nombre,
      apellido: req.body.usuario.apellido,
      dni: req.body.usuario.dni,
      tipoDni: req.body.usuario.tipoDni,
      email: req.body.usuario.email,
    },
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });

  console.log(req.body.sanitizedInput);

  next();
}
