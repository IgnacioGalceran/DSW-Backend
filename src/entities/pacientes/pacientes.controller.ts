import { NextFunction, Request, Response } from "express";
import { PacienteService } from "./pacientes.service.js";
import { Unauthorized } from "../../shared/errors.js";
import { orm } from "../../shared/orm.js";

export async function findAll(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const em = orm.em.fork();
    const service = new PacienteService(em);
    const pacientes = await service.findAll();

    res.status(200).json({
      message: "Pacientes encontrados.",
      error: false,
      data: pacientes,
    });
  } catch (error: any) {
    next(error);
  }
}

export async function findOne(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const em = orm.em.fork();
    const service = new PacienteService(em);
    const paciente = await service.findOne({ id: req.params.id });
    console.log("Paciente en controller", paciente);
    console.log(paciente?.usuario);

    if (!paciente) {
      res.status(404).json({
        message: "Paciente no encontrado.",
        error: true,
        data: null,
      });
      return;
    }

    res.status(200).json({
      message: "Paciente encontrado.",
      error: false,
      data: paciente,
    });
  } catch (error: any) {
    next(error);
    console.error("error capturado en Controller findOne", error);
  }
}

export async function add(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const em = orm.em.fork();
    const service = new PacienteService(em);
    const paciente = await service.add(req.body.sanitizedInput);

    res.status(200).json({
      message: "Registrado correctamente.",
      error: false,
      data: paciente,
    });
  } catch (error: any) {
    next(error);
  }
}

export async function update(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const em = orm.em.fork();
    const service = new PacienteService(em);
    const pacienteAActualizar = await service.update({
      id: req.params.id,
      ...req.body.sanitizedInput,
    });

    res.status(200).json({
      message: "Paciente actualizado",
      error: false,
      data: pacienteAActualizar,
    });
  } catch (error: any) {
    next(error);
  }
}

export async function verificar(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const em = orm.em.fork();
    const service = new PacienteService(em);
    const pacienteAVerificar = await service.verificar({
      id: req.params.id,
      ...req.body.sanitizedInput,
    });

    res.status(200).json({
      message: "Paciente actualizado",
      error: false,
      data: pacienteAVerificar,
    });
  } catch (error: any) {
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
    const service = new PacienteService(em);

    if (req.headers.firebaseUid !== req.params.id)
      throw new Unauthorized("Actualizar otro perfil");

    const pacienteAVerificar = await service.updateProfile({
      id: req.params.id,
      ...req.body.sanitizedInput,
    });

    res.status(200).json({
      message: "Paciente actualizado",
      error: false,
      data: pacienteAVerificar,
    });
  } catch (error: any) {
    next(error);
  }
}

export async function remove(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const em = orm.em.fork();
    const service = new PacienteService(em);
    const pacienteABorrar = await service.remove({ id: req.params.id });

    res.status(200).json({
      message: "Paciente borrado.",
      error: false,
      data: pacienteABorrar,
    });
  } catch (error: any) {
    next(error);
  }
}
