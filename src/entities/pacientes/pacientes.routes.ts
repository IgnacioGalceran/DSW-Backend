import express from "express";
import {
  findAll,
  findOne,
  update,
  updateProfile,
  remove,
  add,
  verificar,
} from "./pacientes.controller.js";
import sanitizePacientesInput from "./pacientes.middleware.js";
import { verifyToken } from "../../auth/auth.middleware.js";
import checkPermissions from "../../shared/checkPermissions.js";
import { validateInput } from "./pacientes.validations.js";

export const router = express.Router();

router
  .get("/", verifyToken, findAll)
  .get("/:id", verifyToken, validateInput, findOne)
  .post("/", verifyToken, sanitizePacientesInput, validateInput, add)
  .put(
    "/:id",
    verifyToken,
    sanitizePacientesInput,
    validateInput,
    // checkPermissions,
    update
  )
  .put(
    "/verificar/:id",
    verifyToken,
    checkPermissions,
    sanitizePacientesInput,
    verificar
  )
  .put(
    "/udtprofile/:id",
    sanitizePacientesInput,
    // validateInput,
    // checkPermissions,
    verifyToken,
    updateProfile
  )
  .patch(
    "/:id",
    verifyToken,
    checkPermissions,
    validateInput,
    sanitizePacientesInput,
    update
  )
  .delete("/:id", validateInput, verifyToken, checkPermissions, remove);
