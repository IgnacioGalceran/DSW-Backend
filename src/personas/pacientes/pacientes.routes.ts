import express from "express";
import { findAll, remove } from "./pacientes.controller.js";

export const router = express.Router();

router.get("/pacientes", findAll).delete("/pacientes/:id", remove);
