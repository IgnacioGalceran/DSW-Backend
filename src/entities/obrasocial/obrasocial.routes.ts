import express from "express";
import {
  add,
  findAll,
  findOne,
  remove,
  update,
} from "./obrasocial.controller.js";
import { validateInput } from "./obrasocial.validations.js";
import sanitizeObraSocialInput from "./obrasocial.middleware.js";
import { verifyToken } from "../../auth/auth.middleware.js";
import checkPermissions from "../../shared/checkPermissions.js";
export const router = express.Router();

router
  .get("/", verifyToken, checkPermissions, findAll)
  .get("/:id", verifyToken, checkPermissions, findOne)
  .post(
    "/",
    verifyToken,
    checkPermissions,
    sanitizeObraSocialInput,
    validateInput,
    add
  )
  .put(
    "/:id",
    verifyToken,
    checkPermissions,
    sanitizeObraSocialInput,
    validateInput,
    update
  )
  .patch(
    "/:id",
    verifyToken,
    checkPermissions,
    sanitizeObraSocialInput,
    validateInput,
    update
  )
  .delete(
    "/:id",
    verifyToken,
    checkPermissions,
    //  validateInput,
    remove
  );
