import express from "express";
import {
  add,
  findAll,
  findOne,
  update,
  remove,
} from "./funciones.controller.js";
import sanitizeFuncionInput from "./funciones.middleware.js";
import { verifyToken } from "../../auth/auth.middleware.js";
import checkPermissions from "../../shared/checkPermissions.js";

export const router = express.Router();

router
  .get("/", verifyToken, checkPermissions, findAll)
  .get("/:id", verifyToken, checkPermissions, findOne)
  .post("/", verifyToken, checkPermissions, sanitizeFuncionInput, add)
  .put("/:id", verifyToken, checkPermissions, sanitizeFuncionInput, update)
  .patch("/:id", verifyToken, checkPermissions, sanitizeFuncionInput, update)
  .delete("/:id", verifyToken, checkPermissions, remove);
