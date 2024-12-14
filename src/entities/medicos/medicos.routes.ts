import express from "express";
import {
  findAll,
  findOne,
  update,
  remove,
  add,
  findMedicoByEspecialidad,
  updateProfile,
  updateIndisponibilidad,
} from "./medicos.controller.js";
import sanitizeMedicosInput from "./medicos.middleware.js";
import { verifyToken } from "../../auth/auth.middleware.js";
import checkPermissions from "../../shared/checkPermissions.js";
import { validateInput, validateInputProfile } from "./medicos.validation.js";

export const router = express.Router();

router.use(verifyToken);

router
  .get("/", checkPermissions, findAll)
  .get("/:id", validateInput, findOne)
  .get(
    "/findMedicosbyEspecialidad/:id",
    checkPermissions,
    validateInput,
    findMedicoByEspecialidad
  )
  .put(
    "/udtProfile/:uid",
    sanitizeMedicosInput,
    validateInputProfile,
    updateProfile
  )
  .put("/indisponibilidad/:uid", sanitizeMedicosInput, updateIndisponibilidad)
  .put("/:id", checkPermissions, sanitizeMedicosInput, validateInput, update)
  .post("/", checkPermissions, sanitizeMedicosInput, validateInput, add)
  .patch("/:id", checkPermissions, validateInput, sanitizeMedicosInput, update)
  .delete(
    "/indisponibilidad/:uid",
    sanitizeMedicosInput,
    updateIndisponibilidad
  )
  .delete("/:id", checkPermissions, validateInput, remove);
