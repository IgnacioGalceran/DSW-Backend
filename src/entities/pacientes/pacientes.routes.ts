import express from "express";
import { findAll, findOne, update, remove } from "./pacientes.controller.js";
import sanitizePacientesInput from "./pacientes.middleware.js";
import { verifyToken } from "../../auth/auth.middleware.js";
import checkPermissions from "../../shared/checkPermissions.js";
import { validateInput } from "./pacientes.validations.js";

export const router = express.Router();

router.use(verifyToken);
router.use(checkPermissions);

router
  .get("/", findAll)
  .get("/:id", validateInput, findOne)
  .put("/:id", validateInput, sanitizePacientesInput, update)
  .patch("/:id", validateInput, sanitizePacientesInput, update)
  .delete("/:id", validateInput, remove);
