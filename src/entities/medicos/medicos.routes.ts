import express from "express";
import { add, findAll, findOne, update, remove } from "./medicos.controller.js";
import sanitizeMedicosInput from "./medicos.middleware.js";
import verifyToken from "../../auth/auth.middleware.js";

export const router = express.Router();

router
  .get("/", verifyToken, findAll)
  .get("/:id", verifyToken, findOne)
  .post("/", verifyToken, sanitizeMedicosInput, add)
  .put("/:id", verifyToken, sanitizeMedicosInput, update)
  .patch("/:id", verifyToken, sanitizeMedicosInput, update)
  .delete("/:id", verifyToken, remove);
