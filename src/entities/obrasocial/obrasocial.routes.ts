import express from "express";
import {
  add,
  findAll,
  findOne,
  remove,
  update,
} from "./obrasocial.controller.js";
export const router = express.Router();

router
  .get("/", findAll)
  .get("/:id", findOne)
  .post(
    "/",
    // validateInput, sanitizeEspecialidadInput,
    add
  )
  .put(
    "/:id",
    // validateInput, sanitizeEspecialidadInput,
    update
  )
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
