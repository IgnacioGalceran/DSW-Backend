import { NextFunction, Request, Response } from "express";
import { FuncionesService } from "./funciones.service.js";
import { ObjectId } from "mongodb";
import { InvalidId } from "../../shared/errors.js";
import { orm } from "../../shared/orm.js";

export async function findAll(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const em = orm.em.fork();
    const service = new FuncionesService(em);
    const funciones = await service.findAll();

    res.status(200).json({
      message: "Funciones encontrados.",
      error: false,
      data: funciones,
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
    if (!ObjectId.isValid(req.params.id)) throw new InvalidId();

    const em = orm.em.fork();
    const service = new FuncionesService(em);
    const funcion = await service.findOne({ id: req.params.id });

    res.status(200).json({
      message: "Funcion encontrado.",
      error: false,
      data: funcion,
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
    const service = new FuncionesService(em);
    const funcion = await service.add({ ...req.body.sanitizedInput });

    res.status(200).json({
      message: "Funcion creado.",
      error: false,
      data: funcion,
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
    if (!ObjectId.isValid(req.params.id)) throw new InvalidId();

    const em = orm.em.fork();
    const service = new FuncionesService(em);
    const funcion = await service.update({
      id: req.params.id,
      ...req.body.sanitizedInput,
    });

    res.status(200).json({
      message: "Funcion actualizado.",
      error: false,
      data: funcion,
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
    if (!ObjectId.isValid(req.params.id)) throw new InvalidId();

    const em = orm.em.fork();
    const service = new FuncionesService(em);
    const funcion = await service.remove({ id: req.params.id });

    res.status(200).json({
      message: "Funcion borrado.",
      error: false,
      data: funcion,
    });
  } catch (error: any) {
    next(error);
  }
}
