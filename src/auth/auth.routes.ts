import express from "express";
import {
  getUserData,
  registerAdministrador,
  verifyUser,
} from "./auth.controller.js";
import {
  verifyToken,
  sanitizeMedicosInput,
  sanitizePacientesInput,
} from "./auth.middleware.js";
import { validateRegister } from "./auth.validations.js";

export const router = express.Router();

router
  .put("/verifyUser/:uid", verifyUser)
  .post("/getUserData/:id", getUserData)
  .post("/registerAdministrador", sanitizePacientesInput, registerAdministrador)
  .post("/verifyToken", verifyToken);
