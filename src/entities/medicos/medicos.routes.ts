import express from "express";
import { findAll, findOne, update, remove } from "./medicos.controller.js";
import sanitizeMedicosInput from "./medicos.middleware.js";
import { verifyToken } from "../../auth/auth.middleware.js";
import checkPermissions from "../../shared/checkPermissions.js";
import { validateInput } from "./medicos.validation.js";

export const router = express.Router();

router
  .get("/", verifyToken, checkPermissions, findAll)
  .get("/:id", verifyToken, checkPermissions, validateInput, findOne)
  .put(
    "/:id",
    verifyToken,
    checkPermissions,
    validateInput,
    sanitizeMedicosInput,
    update
  )
  .patch(
    "/:id",
    verifyToken,
    checkPermissions,
    validateInput,
    sanitizeMedicosInput,
    update
  )
  .delete("/:id", verifyToken, checkPermissions, validateInput, remove);
