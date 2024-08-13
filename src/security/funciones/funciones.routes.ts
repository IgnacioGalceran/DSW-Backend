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

router.use(verifyToken);
router.use(checkPermissions);

router
  .get("/", findAll)
  .get("/:id", findOne)
  .post("/", sanitizeFuncionInput, add)
  .put("/:id", sanitizeFuncionInput, update)
  .patch("/:id", sanitizeFuncionInput, update)
  .delete("/:id", remove);
