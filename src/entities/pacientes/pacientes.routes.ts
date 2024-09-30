import express from "express";
import {
  findAll,
  findOne,
  update,
  remove,
  add,
} from "./pacientes.controller.js";
import sanitizePacientesInput from "./pacientes.middleware.js";
import { verifyToken } from "../../auth/auth.middleware.js";
import checkPermissions from "../../shared/checkPermissions.js";
import { validateInput } from "./pacientes.validations.js";

export const router = express.Router();

// router.use(verifyToken);
// router.use(checkPermissions);

router
  .get("/", findAll)
  .get("/:id", validateInput, verifyToken, checkPermissions, findOne)
  .post("/", sanitizePacientesInput, validateInput, add)
  .put(
    "/:id",
    validateInput,
    verifyToken,
    checkPermissions,
    sanitizePacientesInput,
    update
  )
  .patch(
    "/:id",
    validateInput,
    verifyToken,
    checkPermissions,
    sanitizePacientesInput,
    update
  )
  .delete("/:id", validateInput, verifyToken, checkPermissions, remove);
