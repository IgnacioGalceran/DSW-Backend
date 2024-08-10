import express from "express";
import {
  registerPaciente,
  registerMedico,
  getUserData,
  registerAdministrador,
} from "./auth.controller.js";
import {
  verifyToken,
  sanitizeMedicosInput,
  sanitizePacientesInput,
} from "./auth.middleware.js";

export const router = express.Router();

router
  .post("/getUserData/:id", getUserData)
  .post("/registerPaciente", sanitizePacientesInput, registerPaciente)
  .post("/registerMedico", sanitizeMedicosInput, registerMedico)
  .post("/registerAdministrador", sanitizePacientesInput, registerAdministrador)
  .post("/verifyToken", verifyToken);
