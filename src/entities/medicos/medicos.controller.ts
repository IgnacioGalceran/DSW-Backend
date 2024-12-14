import { NextFunction, Request, Response } from "express";
import { MedicoService } from "./medicos.service.js";
import { ObjectId } from "mongodb";
import { InvalidId, Unauthorized } from "../../shared/errors.js";
import { orm } from "../../shared/orm.js";

export async function findAll(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const em = orm.em.fork();
    const service = new MedicoService(em);
    const medicos = await service.findAll();

    res.status(200).json({
      message: "Medicos encontrados.",
      error: false,
      data: medicos,
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
    const service = new MedicoService(em);
    const medico = await service.findOne({ id: req.params.id });

    res.status(200).json({
      message: "Medico encontrado.",
      error: false,
      data: medico,
    });
  } catch (error: any) {
    next(error);
  }
}

export async function add(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const em = orm.em.fork();
    const service = new MedicoService(em);
    const medicos = await service.add(req.body.sanitizedInput);

    res.status(200).json({
      message: "Registrado correctamente.",
      error: false,
      data: medicos,
    });
  } catch (error: any) {
    console.log(error);
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
    const service = new MedicoService(em);
    const medicoActualizar = await service.update({
      id: req.params.id,
      ...req.body.sanitizedInput,
    });

    res.status(200).json({
      message: "Medico actualizado.",
      error: false,
      data: medicoActualizar,
    });
  } catch (error: any) {
    next(error);
  }
}

export async function updateIndisponibilidad(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // if (req.headers.firebaseUid !== req.params.uid)
    //   throw new Unauthorized("Actualizar otro médico");

    let isUpdate: boolean = true;
    let indisponibilidad!: any;
    const em = orm.em.fork();
    const service = new MedicoService(em);

    console.log("params", req.query);

    if (req.method === "DELETE") {
      isUpdate = false;
      indisponibilidad = req.query.indisponibilidad;
    } else {
      indisponibilidad = req.body.sanitizedInput.indisponibilidad;
    }

    const medicoActualizar = await service.updateIndisponibilidad({
      uid: req.params.uid,
      indisponibilidad: indisponibilidad,
      isUpdate: isUpdate,
    });

    res.status(200).json({
      message: "Medico actualizado.",
      error: false,
      data: medicoActualizar,
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
    if (req.headers.firebaseUid !== req.params.uid)
      throw new Unauthorized("Actualizar otro perfil");

    const em = orm.em.fork();
    const service = new MedicoService(em);

    const medicoActualizar = await service.updateProfile({
      uid: req.params.uid,
      ...req.body.sanitizedInput,
    });

    res.status(200).json({
      message: "Medico actualizado.",
      error: false,
      data: medicoActualizar,
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
    const service = new MedicoService(em);
    const medicoABorrar = await service.remove({ id: req.params.id });

    res.status(200).json({
      message: "Medico borrado.",
      error: false,
      data: medicoABorrar,
    });
  } catch (error: any) {
    next(error);
  }
}

export async function findMedicoByEspecialidad(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const em = orm.em.fork();
    const service = new MedicoService(em);
    const medicos = await service.findMedicoByEspecialidad({
      id: req.params.id,
    });

    res.status(200).json({
      message: "Medicos con especialidades encontrados.",
      error: false,
      data: medicos,
    });
  } catch (error: any) {
    next(error);
  }
}
