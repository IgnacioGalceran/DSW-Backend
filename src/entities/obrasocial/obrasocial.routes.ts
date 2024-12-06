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
export const router = express.Router();

router
  .get("/", findAll)
  .get("/:id", findOne)
  .post("/", validateInput, sanitizeObraSocialInput, add)
  .put("/:id", validateInput, sanitizeObraSocialInput, update)
  .patch(
    "/:id",
    //  validateInput, sanitizeEspecialidadInput,
    update
  )
  .delete(
    "/:id",
    //  validateInput,
    remove
  );
