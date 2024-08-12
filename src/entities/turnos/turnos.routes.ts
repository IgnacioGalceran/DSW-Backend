import express from "express";
import { add, findAll, findOne, update, remove } from "./turnos.controller.js";
import sanitizeTurnoInput from "./turnos.middleware.js";
import { verifyToken } from "../../auth/auth.middleware.js";
import checkPermissions from "../../shared/checkPermissions.js";
import { validateInput } from "./turnos.validations.js";

export const router = express.Router();

router
  .get("/", verifyToken, checkPermissions, findAll)
  .get("/:id", verifyToken, checkPermissions, validateInput, findOne)
  .post(
    "/",
    verifyToken,
    checkPermissions,
    validateInput,
    sanitizeTurnoInput,
    add
  )
  .put(
    "/:id",
    verifyToken,
    checkPermissions,
    validateInput,
    sanitizeTurnoInput,
    update
  )
  .patch(
    "/:id",
    verifyToken,
    checkPermissions,
    validateInput,
    sanitizeTurnoInput,
    update
  )
  .delete("/:id", verifyToken, checkPermissions, validateInput, remove);
