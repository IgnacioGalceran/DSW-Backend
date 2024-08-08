import express from "express";
import { add, findAll, findOne, update, remove } from "./turnos.controller.js";
import sanitizeTurnoInput from "./turnos.middleware.js";
import verifyToken from "../../auth/auth.middleware.js";

export const router = express.Router();

router
  .get("/", verifyToken, findAll)
  .get("/:id", verifyToken, findOne)
  .post("/", verifyToken, sanitizeTurnoInput, add)
  .put("/:id", verifyToken, sanitizeTurnoInput, update)
  .patch("/:id", verifyToken, sanitizeTurnoInput, update)
  .delete("/:id", verifyToken, remove);
