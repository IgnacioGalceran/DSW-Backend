import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service.js";
import { orm } from "../shared/orm.js";
import { Unauthorized } from "../shared/errors.js";

export async function getUserData(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const em = orm.em.fork();
    const service = new AuthService(em);
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
    const em = orm.em.fork();
    const service = new AuthService(em);
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

export async function updateProfile(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const em = orm.em.fork();
    const service = new AuthService(em);

    if (req.headers.firebaseUid !== req.params.id)
      throw new Unauthorized("Actualizar otro perfil");

    console.log("params", req.params.id);
    console.log("body", req.body.sanitizedInput);
    const usuarioAActualizar = await service.updateProfile({
      id: req.params.id,
      ...req.body.sanitizedInput,
    });

    res.status(200).json({
      message: "Perfil actualizado",
      error: false,
      data: usuarioAActualizar,
    });
  } catch (error: any) {
    next(error);
  }
}

export async function checkearSiUsuarioExiste(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const em = orm.em.fork();
    const service = new AuthService(em);
    console.log("id", req.params.id, "data", req.body);
    const usuario = await service.checkearSiUsuarioExiste({
      uid: req.params.id,
      data: req.body,
    });

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

export async function verifyUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const em = orm.em.fork();
    const service = new AuthService(em);
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
