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
import cors from "cors";

const app = express();

(async () => {
  try {
    // Inicializa MikroORM antes de usar cualquier ruta
    await initializeOrm();
    console.log("MikroORM inicializado correctamente");

    // Configuración de middlewares
    const corsOptions = {
      origin: "http://localhost:3000",
      optionsSuccessStatus: 200,
    };

    app.use(cors(corsOptions));
    app.use(express.json());

    // Middleware para crear un contexto para las rutas
    app.use((req, res, next) => {
      const em = orm.em.fork(); // Crea un nuevo EntityManager
      RequestContext.create(em, next); // Crea un nuevo contexto
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

    // Seeder
    await seeder();
    console.log("Seeder ejecutado correctamente");

    // Middleware de manejo de errores
    app.use(errorHandler);

    // Iniciar el servidor
    app.listen(4000, () => {
      console.log("Servidor corriendo en http://localhost:4000");
    });
  } catch (error) {
    console.error("Error inicializando la aplicación:", error);
    process.exit(1); // Salir si ocurre un error crítico
  }
})();
