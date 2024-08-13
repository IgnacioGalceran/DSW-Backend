import express from "express";
import { findAll, findOne, update, remove } from "./medicos.controller.js";
import sanitizeMedicosInput from "./medicos.middleware.js";
import { verifyToken } from "../../auth/auth.middleware.js";
import checkPermissions from "../../shared/checkPermissions.js";
import { validateInput } from "./medicos.validation.js";

export const router = express.Router();

router.use(verifyToken);
router.use(checkPermissions);

router
  .get("/", findAll)
  .get("/:id", validateInput, findOne)
  .put("/:id", validateInput, sanitizeMedicosInput, update)
  .patch("/:id", validateInput, sanitizeMedicosInput, update)
  .delete("/:id", validateInput, remove);
