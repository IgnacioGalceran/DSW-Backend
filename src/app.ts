import express from "express";
import { router as PacientesRouter } from "./entities/pacientes/pacientes.routes.js";
import { router as MedicosRouter } from "./entities/medicos/medicos.routes.js";
import { router as AuthRouter } from "./auth/auth.routes.js";
import { router as EspecialidadesRouter } from "./entities/especialidades/especialidades.routes.js";
import { router as TurnosRouter } from "./entities/turnos/turnos.routes.js";
import { router as RolesRouter } from "./security/roles/roles.routes.js";
import { router as FuncionesRouter } from "./security/funciones/funciones.routes.js";
import { router as ObraSocialRouter } from "./entities/obrasocial/obrasocial.routes.js";
import { seeder } from "./seed/seeder.js";
import { errorHandler } from "./shared/errorHandler.js";
import { initializeOrm, orm } from "./shared/orm.js";
import { RequestContext } from "@mikro-orm/mongodb";
import http from "http";
import cors from "cors";
import { NextFunction, Request, Response } from "express";

const app = express();

const server = http.createServer(app);

// Inicializa MikroORM antes de usar cualquier ruta
initializeOrm()
  .then(() => {
    console.log("MikroORM inicializado correctamente");
  })
  .catch((err) => {
    console.error("Error inicializando MikroORM", err);
  });

// Configuración de middlewares
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Middleware para crear un contexto para las rutas
app.use((req: Request, res: Response, next: NextFunction) => {
  const em = orm.em.fork();
  RequestContext.create(em, next);
});

// Rutas
app.use("/api/pacientes", PacientesRouter);
app.use("/api/medicos", MedicosRouter);
app.use("/api/especialidades", EspecialidadesRouter);
app.use("/api/turnos", TurnosRouter);
app.use("/api/roles", RolesRouter);
app.use("/api/funciones", FuncionesRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/obrasocial", ObraSocialRouter);

// Middleware de manejo de errores
app.use(errorHandler);

// Seeder
// await seeder();
// console.log("Seeder ejecutado correctamente");

const PORT = process.env.PORT || 4000;
// Iniciar el servidor
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
