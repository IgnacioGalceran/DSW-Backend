import express from "express";
import {
  add,
  findAll,
  findOne,
  update,
  remove,
  findEspecialidadesWithMedicos,
} from "./especialidades.controller.js";
import sanitizeEspecialidadInput from "./especialidades.middleware.js";
import { verifyToken } from "../../auth/auth.middleware.js";
import { validateInput } from "./especialidades.validations.js";
import checkPermissions from "../../shared/checkPermissions.js";

export const router = express.Router();

router.use(verifyToken);
router.use(checkPermissions);

router
  .get("/", findAll)
  .get("/findEspecialidadesWithMedicos", findEspecialidadesWithMedicos)
  .get("/:id", validateInput, findOne)
  .post("/", validateInput, sanitizeEspecialidadInput, add)
  .put("/:id", validateInput, sanitizeEspecialidadInput, update)
  .patch("/:id", validateInput, sanitizeEspecialidadInput, update)
  .delete("/:id", validateInput, remove);
