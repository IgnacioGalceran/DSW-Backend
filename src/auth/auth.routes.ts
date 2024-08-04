import express from "express";
import { login, registerPaciente, registerMedico } from "./auth.controller";

export const router = express.Router();

router
  .post("/registerPaciente", registerPaciente)
  .post("/registerMedico", registerMedico)
  .post("/:id", login);
