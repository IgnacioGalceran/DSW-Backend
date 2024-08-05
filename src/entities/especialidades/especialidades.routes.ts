import express from "express";
import {
  add,
  findAll,
  findOne,
  update,
  remove,
} from "./especialidades.controller.js";
import sanitizeEspecialidadInput from "./especialidades.middleware.js";
import verifyToken from "../../auth/auth.middleware.js";

export const router = express.Router();

router
  .get("/", verifyToken, findAll)
  .get("/:id", verifyToken, findOne)
  .post("/", verifyToken, sanitizeEspecialidadInput, add)
  .put("/:id", verifyToken, sanitizeEspecialidadInput, update)
  .patch("/:id", verifyToken, sanitizeEspecialidadInput, update)
  .delete("/:id", verifyToken, remove);
