import express from "express";
import { listaPacientes } from "../../../models/personas/personas.js";

export const router = express.Router();

router.get("/medicos", (req, res) => {
  res.status(200).json({
    message: "Medicos encontrados",
    error: false,
    data: listaPacientes,
  });
});