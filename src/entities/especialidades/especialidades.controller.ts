import { NextFunction, Request, Response } from "express";
import { EspecialidadesService } from "./especialidades.service.js";
import { orm } from "../../shared/orm.js";

export async function findAll(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const em = orm.em.fork();
    const service = new EspecialidadesService(em);
    const especialidades = await service.findAll();

    res.status(200).json({
      message: "especialidades encontradas.",
      error: false,
      data: especialidades,
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
    const service = new EspecialidadesService(em);
    const especialidad = await service.findOne({ id: req.params.id });

    res.status(200).json({
      message: "especialidad encontrada.",
      error: false,
      data: especialidad,
    });
  } catch (error: any) {
    next(error);
  }
}

export async function findEspecialidadesWithMedicos(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const em = orm.em.fork();
    const service = new EspecialidadesService(em);
    const especialidad = await service.findEspecialidadesWithMedicos();

    res.status(200).json({
      message: "Especialidades encontradas.",
      error: false,
      data: especialidad,
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
    const service = new EspecialidadesService(em);
    const especialidad = await service.add({ ...req.body.sanitizedInput });

    res.status(200).json({
      message: "especialidad creada.",
      error: false,
      data: especialidad,
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
    const service = new EspecialidadesService(em);
    const especialidadActualizar = await service.update({
      id: req.params.id,
      ...req.body.sanitizedInput,
    });

    res.status(200).json({
      message: "especialidad actualizada.",
      error: false,
      data: especialidadActualizar,
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
    const service = new EspecialidadesService(em);
    const especialidadABorrar = await service.remove({ id: req.params.id });

    res.status(200).json({
      message: "especialidad borrada.",
      error: false,
      data: especialidadABorrar,
    });
  } catch (error: any) {
    next(error);
  }
}
