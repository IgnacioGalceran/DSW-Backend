import express from "express";
import { add, findAll, findOne, update, remove } from "./turnos.controller.js";
import sanitizeTurnoInput from "./turnos.middleware.js";
import { verifyToken } from "../../auth/auth.middleware.js";
import checkPermissions from "../../shared/checkPermissions.js";

export const router = express.Router();

router
  .get("/", verifyToken, checkPermissions, findAll)
  .get("/:id", verifyToken, checkPermissions, findOne)
  .post("/", verifyToken, checkPermissions, sanitizeTurnoInput, add)
  .put("/:id", verifyToken, checkPermissions, sanitizeTurnoInput, update)
  .patch("/:id", verifyToken, checkPermissions, sanitizeTurnoInput, update)
  .delete("/:id", verifyToken, checkPermissions, remove);
