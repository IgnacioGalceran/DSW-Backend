import express from "express";
import {
  add,
  findAll,
  findOne,
  update,
  remove,
} from "./especialidades.controller.js";
import sanitizeEspecialidadInput from "./especialidades.middleware.js";
import { verifyToken } from "../../auth/auth.middleware.js";
import { validateInput } from "./especialidades.validations.js";
import checkPermissions from "../../shared/checkPermissions.js";

export const router = express.Router();

router
  .get("/", verifyToken, checkPermissions, findAll)
  .get("/:id", verifyToken, validateInput, checkPermissions, findOne)
  .post(
    "/",
    verifyToken,
    checkPermissions,
    validateInput,
    sanitizeEspecialidadInput,
    add
  )
  .put(
    "/:id",
    verifyToken,
    checkPermissions,
    validateInput,
    sanitizeEspecialidadInput,
    update
  )
  .patch(
    "/:id",
    verifyToken,
    checkPermissions,
    validateInput,
    sanitizeEspecialidadInput,
    update
  )
  .delete("/:id", verifyToken, checkPermissions, validateInput, remove);
