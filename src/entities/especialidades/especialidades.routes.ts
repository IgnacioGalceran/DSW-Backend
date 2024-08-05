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
  .get("/:id", findOne)
  .post("/", sanitizeEspecialidadInput, add)
  .put("/:id", sanitizeEspecialidadInput, update)
  .patch("/:id", sanitizeEspecialidadInput, update)
  .delete("/:id", remove);
