import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service.js";

const service = new AuthService();

export async function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const medicos = await service.login(req.body);

    res.status(200).json({
      message: "Logeado correctamente.",
      error: false,
      data: medicos,
    });
  } catch (error: any) {
    next(error);
  }
}

export async function registerPaciente(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const medicos = await service.registerPaciente(req.body);

    res.status(200).json({
      message: "Registrado correctamente.",
      error: false,
      data: medicos,
    });
  } catch (error: any) {
    next(error);
  }
}

export async function registerMedico(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const medicos = await service.registerPaciente(req.body);

    res.status(200).json({
      message: "Registrado correctamente.",
      error: false,
      data: medicos,
    });
  } catch (error: any) {
    next(error);
  }
}
