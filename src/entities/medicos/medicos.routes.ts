import express from "express";
import {
  findAll,
  findOne,
  update,
  remove,
  add,
  findMedicoByEspecialidad,
  updateProfile,
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
    validateInputProfile,
    sanitizeMedicosInput,
    updateProfile
  )
  .put("/:id", checkPermissions, validateInput, sanitizeMedicosInput, update)
  .post("/", checkPermissions, validateInput, sanitizeMedicosInput, add)
  .patch("/:id", checkPermissions, validateInput, sanitizeMedicosInput, update)
  .delete("/:id", checkPermissions, validateInput, remove);
