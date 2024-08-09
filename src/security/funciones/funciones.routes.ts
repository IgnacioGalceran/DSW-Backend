import express from "express";
import {
  add,
  findAll,
  findOne,
  update,
  remove,
} from "./funciones.controller.js";
import sanitizeFuncionInput from "./funciones.middleware.js";
import verifyToken from "../../auth/auth.middleware.js";

export const router = express.Router();

router
  .get("/", verifyToken, findAll)
  .get("/:id", verifyToken, findOne)
  .post("/", verifyToken, sanitizeFuncionInput, add)
  .put("/:id", verifyToken, sanitizeFuncionInput, update)
  .patch("/:id", verifyToken, sanitizeFuncionInput, update)
  .delete("/:id", verifyToken, remove);
