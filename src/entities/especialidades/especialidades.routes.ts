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
import checkPermissions from "../../shared/checkPermissions.js";

export const router = express.Router();

router
  .get("/", verifyToken, checkPermissions, findAll)
  .get("/:id", verifyToken, checkPermissions, findOne)
  .post("/", verifyToken, checkPermissions, sanitizeEspecialidadInput, add)
  .put("/:id", verifyToken, checkPermissions, sanitizeEspecialidadInput, update)
  .patch(
    "/:id",
    verifyToken,
    checkPermissions,
    sanitizeEspecialidadInput,
    update
  )
  .delete("/:id", verifyToken, checkPermissions, remove);
