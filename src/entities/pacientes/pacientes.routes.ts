import express from "express";
import {
  findAll,
  findOne,
  add,
  update,
  remove,
} from "./pacientes.controller.js";
import sanitizePacientesInput from "./pacientes.middleware.js";
import verifyToken from "../../auth/auth.middleware.js";

export const router = express.Router();

router
  .get("/", verifyToken, findAll)
  .get("/:id", verifyToken, findOne)
  .post("/", verifyToken, sanitizePacientesInput, add)
  .put("/:id", verifyToken, sanitizePacientesInput, update)
  .patch("/:id", verifyToken, sanitizePacientesInput, update)
  .delete("/:id", verifyToken, remove);
