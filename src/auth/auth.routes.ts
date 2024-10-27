import express from "express";
import {
  getUserData,
  registerAdministrador,
  verifyUser,
} from "./auth.controller.js";
import { verifyToken, sanitizeAdministradorInput } from "./auth.middleware.js";
import { validateRegister } from "./auth.validations.js";

export const router = express.Router();

router
  .put("/verifyUser/:uid", verifyUser)
  .post("/getUserData/:id", getUserData)
  .post(
    "/registerAdministrador",
    sanitizeAdministradorInput,
    registerAdministrador
  )
  .post("/verifyToken", verifyToken);
