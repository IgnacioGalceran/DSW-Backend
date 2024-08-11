import express from "express";
import { findAll, findOne, update, remove } from "./pacientes.controller.js";
import sanitizePacientesInput from "./pacientes.middleware.js";
import { verifyToken } from "../../auth/auth.middleware.js";
import checkPermissions from "../../shared/checkPermissions.js";
import { validateInput } from "./pacientes.validations.js";

export const router = express.Router();

router
  .get("/", verifyToken, checkPermissions, findAll)
  .get("/:id", verifyToken, checkPermissions, validateInput, findOne)
  .put(
    "/:id",
    verifyToken,
    checkPermissions,
    validateInput,
    sanitizePacientesInput,
    update
  )
  .patch(
    "/:id",
    verifyToken,
    checkPermissions,
    validateInput,
    sanitizePacientesInput,
    update
  )
  .delete("/:id", verifyToken, checkPermissions, validateInput, remove);
