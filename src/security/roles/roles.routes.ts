import express from "express";
import { add, findAll, findOne, update, remove } from "./roles.controller.js";
import sanitizeRolInput from "./roles.middleware.js";
import { verifyToken } from "../../auth/auth.middleware.js";
import checkPermissions from "../../shared/checkPermissions.js";

export const router = express.Router();

router
  .get("/", verifyToken, checkPermissions, findAll)
  .get("/:id", verifyToken, checkPermissions, findOne)
  .post("/", verifyToken, checkPermissions, sanitizeRolInput, add)
  .put("/:id", verifyToken, checkPermissions, sanitizeRolInput, update)
  .patch("/:id", verifyToken, checkPermissions, sanitizeRolInput, update)
  .delete("/:id", verifyToken, checkPermissions, remove);
