import express from "express";
import { router as PacientesRouter } from "./personas/pacientes/pacientes.routes.js";
import { router as MedicosRouter } from "./personas/medicos/medicos.routes.js";
import { orm } from "../shared/orm.js";
import { RequestContext } from "@mikro-orm/mongodb";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  RequestContext.create(orm.em, next);
});
app.use("/api/pacientes", PacientesRouter);
app.use("/api/medicos", MedicosRouter);

app.use((_, res) => {
  return res
    .status(404)
    .json({ message: "Resource not found", error: true, data: null });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
