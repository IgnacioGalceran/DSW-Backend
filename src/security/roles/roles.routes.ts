import express from "express";
import { add, findAll, findOne, update, remove } from "./roles.controller.js";
import sanitizeRolInput from "./roles.middleware.js";
import { verifyToken } from "../../auth/auth.middleware.js";
import checkPermissions from "../../shared/checkPermissions.js";

export const router = express.Router();

router.use(verifyToken);
router.use(checkPermissions);

router
  .get("/", findAll)
  .get("/:id", findOne)
  .post("/", sanitizeRolInput, add)
  .put("/:id", sanitizeRolInput, update)
  .patch("/:id", sanitizeRolInput, update)
  .delete("/:id", remove);
