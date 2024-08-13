import express from "express";
import { add, findAll, findOne, update, remove } from "./turnos.controller.js";
import sanitizeTurnoInput from "./turnos.middleware.js";
import { verifyToken } from "../../auth/auth.middleware.js";
import checkPermissions from "../../shared/checkPermissions.js";
import { validateInput } from "./turnos.validations.js";

export const router = express.Router();

router.use(verifyToken);
router.use(checkPermissions);

router
  .get("/", findAll)
  .get("/:id", validateInput, findOne)
  .post("/", validateInput, sanitizeTurnoInput, add)
  .put("/:id", validateInput, sanitizeTurnoInput, update)
  .patch("/:id", validateInput, sanitizeTurnoInput, update)
  .delete("/:id", validateInput, remove);
