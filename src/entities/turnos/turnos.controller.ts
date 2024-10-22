import { NextFunction, Request, Response } from "express";
import { TurnosService } from "./turnos.service.js";
import { ObjectId } from "mongodb";
import { InvalidId } from "../../shared/errors.js";

const service = new TurnosService();

export async function findAll(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const turnos = await service.findAll();

    res.status(200).json({
      message: "Turnos encontrados.",
      error: false,
      data: turnos,
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

    const turno = await service.findOne({ id: req.params.id });

    res.status(200).json({
      message: "Turno encontrado.",
      error: false,
      data: turno,
    });
  } catch (error: any) {
    next(error);
  }
}

export async function findTurnosByPaciente(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const turnos = await service.findTurnosByPaciente({
      paciente: req.params.id,
    });

    res.status(200).json({
      message: "Turnos encontrados.",
      error: false,
      data: turnos,
    });
  } catch (error: any) {
    next(error);
  }
}

export async function findTurnosOcupadosByMedicoByDates(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { startDate, endDate } = req.query;
    const turnosDisponibles = await service.findTurnosOcupadosByMedicoByDates({
      startDate,
      endDate,
      medico: req.params.id,
    });

    res.status(200).json({
      message: "Turnos ocupados encontrados.",
      error: false,
      data: turnosDisponibles,
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
    const turno = await service.add({ ...req.body.sanitizedInput });

    res.status(200).json({
      message: "Turno creado.",
      error: false,
      data: turno,
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

    const turnoAActualizar = await service.update({
      id: req.params.id,
      ...req.body.sanitizedInput,
    });

    res.status(200).json({
      message: "Turno actualizado.",
      error: false,
      data: turnoAActualizar,
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

    const turnoABorrar = await service.remove({ id: req.params.id });

    res.status(200).json({
      message: "Turno borrado.",
      error: false,
      data: turnoABorrar,
    });
  } catch (error: any) {
    next(error);
  }
}
