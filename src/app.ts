import express from "express";
import { router as PacientesRouter } from "../routes/personas/pacientes/pacientes.routes.js";
import { router as MedicosRouter } from "../routes/personas/medicos/medicos.routes.js";

const app = express();

app.use("/api", PacientesRouter);
app.use("/api", MedicosRouter);

app.use((_, res) => {
  return res
    .status(404)
    .json({ message: "Resource not found", error: true, data: null });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
