import express from "express";
import {
  checkearSiUsuarioExiste,
  getUserData,
  registerAdministrador,
  updateProfile,
  verifyUser,
} from "./auth.controller.js";
import { verifyToken, sanitizeAdministradorInput } from "./auth.middleware.js";
import { validateRegister } from "./auth.validations.js";

export const router = express.Router();

router
  .get("/getUserData/:id", getUserData)
  .put("/verifyUser/:uid", verifyUser)
  .post("/checkUser/:id", checkearSiUsuarioExiste)
  .put(
    "/udtprofile/:id",
    verifyToken,
    sanitizeAdministradorInput,
    verifyToken,
    updateProfile
  )
  .post(
    "/registerAdministrador",
    sanitizeAdministradorInput,
    registerAdministrador
  )
  .post("/verifyToken", verifyToken);
