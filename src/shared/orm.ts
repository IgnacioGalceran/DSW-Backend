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

console.log(process.env.MONGODB_URI);

const config: any = {
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
  debug: false,
  schemaGenerator: {
    disableForeignKeys: true,
    createForeignKeyConstraints: true,
    ignoreSchema: [],
  },
};

export const orm = await MikroORM.init(config);
