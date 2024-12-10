import { MikroORM } from "@mikro-orm/mongodb";
import { MongoHighlighter } from "@mikro-orm/mongo-highlighter";
import dotenv from "dotenv";
import { Usuarios } from "../auth/usuarios.entity.js";
import { Turnos } from "../entities/turnos/turnos.entity.js";
import { Medicos } from "../entities/medicos/medicos.entity.js";
import { Pacientes } from "../entities/pacientes/pacientes.entity.js";
import { Especialidades } from "../entities/especialidades/especialidades.entity.js";
import { ObrasSociales } from "../entities/obrasocial/obrasocial.entity.js";
import { Roles } from "../security/roles/roles.entity.js";
import { Funciones } from "../security/funciones/funciones.entity.js";
dotenv.config();

let orm: MikroORM;

console.log(process.env.MONGODB_URI);

export async function initializeOrm() {
  orm = await MikroORM.init({
    entities: [
      Usuarios,
      Turnos,
      Medicos,
      Especialidades,
      Pacientes,
      ObrasSociales,
      Roles,
      Funciones,
    ],
    dbName: "turnos-medicos",
    clientUrl: process.env.MONGODB_URI,
    highlighter: new MongoHighlighter(),
    debug: true,
    schemaGenerator: {
      disableForeignKeys: true,
      createForeignKeyConstraints: true,
      ignoreSchema: [],
    },
  });
}

export { orm };
