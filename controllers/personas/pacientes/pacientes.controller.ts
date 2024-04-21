import { Request, Response } from "express";
import { PacienteRepository } from "../../../repositories/personas/pacientes/pacientes.repository.js";

const repository = new PacienteRepository();

export function findAll(req: Request, res: Response): Response {
  const listaPacientes = repository.findAll();

  return res.status(200).json({
    message: "Pacientes encontrados.",
    error: false,
    data: listaPacientes,
  });
}

export function remove(req: Request, res: Response): Response {
  const paciente = repository.remove({ id: req.params.id });

  return res.status(200).json({
    message: "Paciente borrado.",
    error: false,
    data: paciente.pacienteABorrar,
  });
}
