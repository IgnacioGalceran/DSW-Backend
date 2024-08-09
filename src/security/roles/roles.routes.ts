import express from "express";
import { add, findAll, findOne, update, remove } from "./roles.controller.js";
import sanitizeRolInput from "./roles.middleware.js";
import verifyToken from "../../auth/auth.middleware.js";

export const router = express.Router();

router
  .get("/", verifyToken, findAll)
  .get("/:id", verifyToken, findOne)
  .post("/", verifyToken, sanitizeRolInput, add)
  .put("/:id", verifyToken, sanitizeRolInput, update)
  .patch("/:id", verifyToken, sanitizeRolInput, update)
  .delete("/:id", verifyToken, remove);
