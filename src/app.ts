import express from "express";
import { router as PacientesRouter } from "./entities/pacientes/pacientes.routes.js";
import { router as MedicosRouter } from "./entities/medicos/medicos.routes.js";
import { router as AuthRouter } from "./auth/auth.routes.js";
import { router as EspecialidadesRouter } from "./entities/especialidades/especialidades.routes.js";
import { router as TurnosRouter } from "./entities/turnos/turnos.routes.js";
import { router as RolesRouter } from "./security/roles/roles.routes.js";
import { router as FuncionesRouter } from "./security/funciones/funciones.routes.js";
import { errorHandler } from "./shared/errorHandler.js";
import { orm } from "./shared/orm.js";
import { RequestContext } from "@mikro-orm/mongodb";
import swaggerSpec from "./swagger/swagger.config.js";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import { seeder } from "./seed/seeder.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use((req, res, next) => {
  RequestContext.create(orm.em, next);
});

app.use("/api/pacientes", PacientesRouter);
app.use("/api/medicos", MedicosRouter);
app.use("/api/especialidades", EspecialidadesRouter);
app.use("/api/turnos", TurnosRouter);
app.use("/api/roles", RolesRouter);
app.use("/api/funciones", FuncionesRouter);
app.use("/api/auth", AuthRouter);
app.use("/api-endpoints", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorHandler);

await seeder();

app.listen(4000, () => {
  console.log("Server running on port 4000");
  console.log(
    "Documentación de API disponible en http://localhost:4000/api-endpoints."
  );
});
