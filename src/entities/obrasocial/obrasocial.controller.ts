import { NextFunction, Request, Response } from "express";
import { ObrasocialService } from "./obrasocial.service.js";
import { orm } from "../../shared/orm.js";

export async function findAll(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const em = orm.em.fork();
    const service = new ObrasocialService(em);
    const obrasSociales = await service.findAll();
    console.log(obrasSociales);
    res.status(200).json({
      message: "Obra Sociales encontradas.",
      error: false,
      data: obrasSociales,
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
    const service = new ObrasocialService(em);
    const obrasocial = await service.findOne({ id: req.params.id });

    res.status(200).json({
      message: "Obra Social encontrada.",
      error: false,
      data: obrasocial,
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
    const service = new ObrasocialService(em);
    console.log("obra social", req.body);
    const obraSocial = await service.add({
      ...req.body.sanitizedInput,
    });

    res.status(200).json({
      message: "Obra social creada.",
      error: false,
      data: obraSocial,
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
    const service = new ObrasocialService(em);
    console.log(req.body.sanitizedInput);
    const obraSocialActualizar = await service.update({
      id: req.params.id,
      ...req.body.sanitizedInput,
    });

    res.status(200).json({
      message: "Obra social actualizada.",
      error: false,
      data: obraSocialActualizar,
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
    const service = new ObrasocialService(em);
    const obraSocialActualizar = await service.remove({ id: req.params.id });

    res.status(200).json({
      message: "Obra social borrada.",
      error: false,
      data: obraSocialActualizar,
    });
  } catch (error: any) {
    next(error);
  }
}
