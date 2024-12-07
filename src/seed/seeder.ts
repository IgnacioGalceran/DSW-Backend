import { EntityManager, ObjectId } from "@mikro-orm/mongodb";
import { orm } from "../shared/orm.js";
import { Especialidades } from "../entities/especialidades/especialidades.entity.js";
import { listaEspecialidades } from "./Especialidades/data.js";
import { Funciones } from "../security/funciones/funciones.entity.js";
import { Roles } from "../security/roles/roles.entity.js";
import { listaFunciones } from "./Funciones/data.js";
import { listaRoles } from "./Roles/data.js";
import { ObrasSociales } from "../entities/obrasocial/obrasocial.entity.js";
import { listaObrasSociales } from "./ObrasSociales/data.js";

interface RoleWithFunciones {
  nombre: string;
  funciones: Funciones[];
}

const em: EntityManager = orm.em;

export const seeder = async () => {
  const emFork = em.fork();
  const especialidadesCount = await em.count(Especialidades);
  const funcionesCount = await em.count(Funciones);
  const rolesCount = await em.count(Roles);
  const obrasSocialesCount = await em.count(ObrasSociales);

  if (obrasSocialesCount === 0) {
    const obrasSocialesInsertadas = await emFork.insertMany(
      ObrasSociales,
      listaObrasSociales
    );

    console.log({ obrasSocialesInsertadas });
  }

  if (especialidadesCount === 0) {
    const especialidadesInsertadas = await emFork.insertMany(
      Especialidades,
      listaEspecialidades
    );

    console.log({ especialidadesInsertadas });
  }

  if (rolesCount === 0 && funcionesCount === 0) {
    await emFork.insertMany(Funciones, listaFunciones);

    const funcionesInsertadas = await emFork.findAll(Funciones);

    const roles: RoleWithFunciones[] = listaRoles
      .map((rol: Roles) => {
        switch (rol.nombre) {
          case "Administrador":
            return {
              nombre: "Administrador",
              funciones: funcionesInsertadas,
            };
          case "Medico":
            return {
              nombre: "Medico",
              funciones: funcionesInsertadas.filter(
                (funcion: Funciones) =>
                  funcion.nombre.includes("Leer") ||
                  funcion.nombre.includes("Turnos") ||
                  funcion.nombre === "Leer obrasocial"
              ),
            };
          case "Paciente":
            return {
              nombre: "Paciente",
              funciones: funcionesInsertadas.filter(
                (funcion: Funciones) =>
                  funcion.nombre.includes("Leer") ||
                  funcion.nombre.includes("Turnos") ||
                  funcion.nombre === "Leer obrasocial"
              ),
            };
          default:
            return null;
        }
      })
      .filter((rol): rol is RoleWithFunciones => rol !== null);

    if (roles.length > 0) {
      for (const role of roles) {
        const rolEntity = new Roles();
        rolEntity.nombre = role.nombre;
        rolEntity.funciones?.set(role.funciones);
        emFork.persist(rolEntity);
      }
      await emFork.flush();
    }
  }
};
