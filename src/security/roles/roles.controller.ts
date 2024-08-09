import { NextFunction, Request, Response } from "express";
import { RolesService } from "./roles.service.js";
import { ObjectId } from "mongodb";
import { InvalidId } from "../../shared/errors.js";

const service = new RolesService();

export async function findAll(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const roles = await service.findAll();

    res.status(200).json({
      message: "Roles encontrados.",
      error: false,
      data: roles,
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

    const rol = await service.findOne({ id: req.params.id });

    res.status(200).json({
      message: "Rol encontrado.",
      error: false,
      data: rol,
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
    const rol = await service.add({ ...req.body.sanitizedInput });

    res.status(200).json({
      message: "Rol creado.",
      error: false,
      data: rol,
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

    const rol = await service.update({
      id: req.params.id,
      ...req.body.sanitizedInput,
    });

    res.status(200).json({
      message: "Rol actualizado.",
      error: false,
      data: rol,
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

    const rol = await service.remove({ id: req.params.id });

    res.status(200).json({
      message: "Rol borrado.",
      error: false,
      data: rol,
    });
  } catch (error: any) {
    next(error);
  }
}
