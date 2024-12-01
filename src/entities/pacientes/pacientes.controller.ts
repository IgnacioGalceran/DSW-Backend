import { NextFunction, Request, Response } from "express";
import { PacienteService } from "./pacientes.service.js";
// import { ObjectId } from "mongodb";
import { Unauthorized } from "../../shared/errors.js";

const service = new PacienteService();

export async function findAll(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
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
    // console.log("PACIENTE A ACTUALIZAR: ");
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

export async function updateProfile(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    console.log("PACIENTE A ACTUALIZAR: ", req.params.id);
    console.log("PACIENTE A firebase: ", req.headers.firebaseUid);

    if (req.headers.firebaseUid !== req.params.id)
      throw new Unauthorized("actualizar perfil");
    const pacienteAActualizar = await service.updateProfile({
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

export async function remove(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
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
