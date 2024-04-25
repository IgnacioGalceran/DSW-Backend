import { Request, Response } from "express";
import { PacienteRepository } from "./pacientes.repository.js";

const repository = new PacienteRepository();

export function findAll(req: Request, res: Response): Response {
  const listaPacientes = repository.findAll();

  return res.status(200).json({
    message: "Pacientes encontrados.",
    error: false,
    data: listaPacientes,
  });
}

export function findOne(req: Request, res: Response): Response {
  try {
    const pacienteEncontrado = repository.findOne({ id: req.params.id });

    if (!pacienteEncontrado) {
      return res.status(404).json({
        message: "Paciente no encontrado.",
        error: true,
        data: null,
      });
    }

    return res.status(200).json({
      message: "Paciente encontrado.",
      error: false,
      data: pacienteEncontrado,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      error: true,
      data: null,
    });
  }
}

export function add(req: Request, res: Response): Response {
  try {
    const input = req.body;
    const pacienteAInsertar = repository.add({ ...input });

    return res.status(200).json({
      message: "Paciente creado correctamente.",
      error: false,
      data: pacienteAInsertar,
    });
  } catch (error: any) {
    return res.status(200).json({
      message: error.message,
      error: true,
      data: null,
    });
  }
}

export function update(req: Request, res: Response): Response {
  try {
    const id = req.params.id;
    const input = req.body;
    const pacienteAActualizar = repository.update({ id, ...input });

    if (!pacienteAActualizar) {
      return res.status(404).json({
        message: "Paciente no encontrado.",
        error: true,
        data: null,
      });
    }

    return res.status(200).json({
      message: "Paciente actualizado correctamente.",
      error: false,
      data: pacienteAActualizar,
    });
  } catch (error: any) {
    return res.status(200).json({
      message: error.message,
      error: true,
      data: null,
    });
  }
}

export function remove(req: Request, res: Response): Response {
  try {
    const pacienteABorrar = repository.remove({ id: req.params.id });

    if (!pacienteABorrar) {
      return res.status(404).json({
        message: "Paciente no encontrado.",
        error: true,
        data: null,
      });
    }

    return res.status(200).json({
      message: "Paciente borrado correctamente.",
      error: false,
      data: pacienteABorrar,
    });
  } catch (error: any) {
    return res.status(200).json({
      message: error.message,
      error: true,
      data: null,
    });
  }
}
