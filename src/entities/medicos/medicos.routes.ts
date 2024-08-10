import express from "express";
import { findAll, findOne, update, remove } from "./medicos.controller.js";
import sanitizeMedicosInput from "./medicos.middleware.js";
import { verifyToken } from "../../auth/auth.middleware.js";
import checkPermissions from "../../shared/checkPermissions.js";

export const router = express.Router();

router
  .get("/", verifyToken, checkPermissions, findAll)
  .get("/:id", verifyToken, checkPermissions, findOne)
  .put("/:id", verifyToken, checkPermissions, sanitizeMedicosInput, update)
  .patch("/:id", verifyToken, checkPermissions, sanitizeMedicosInput, update)
  .delete("/:id", verifyToken, checkPermissions, remove);
