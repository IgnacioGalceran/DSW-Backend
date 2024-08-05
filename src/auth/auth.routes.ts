import express from "express";
import { registerPaciente, registerMedico } from "./auth.controller.js";
import verifyToken from "./auth.middleware.js";

export const router = express.Router();

router
  .post("/registerPaciente", registerPaciente)
  .post("/registerMedico", registerMedico)
  .post("/verifyToken", verifyToken);
