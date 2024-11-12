import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service.js";
import { NotFound } from "../shared/errors.js";

const service = new AuthService();

export async function getUserData(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token = await service.getUserData({ uid: req.params.id });

    res.status(200).json({
      message: "Logueado correctamente.",
      error: false,
      data: token,
    });
  } catch (error: any) {
    next(error);
  }
}

export async function registerAdministrador(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const admin = await service.registerAdministrador(req.body.sanitizedInput);

    res.status(200).json({
      message: "Registrado correctamente.",
      error: false,
      data: admin,
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
}

export async function verifyUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const usuario = await service.verifyUser({ uid: req.params.uid });

    res.status(200).json({
      message: "Usuario verificado correctamente.",
      error: false,
      data: usuario,
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
}
