import { EntityManager, ObjectId } from "@mikro-orm/mongodb";
import { orm } from "../shared/orm.js";
import { Especialidades } from "../entities/especialidades/especialidades.entity.js";
import { listaEspecialidades } from "./Especialidades/data.js";
import { Funciones } from "../security/funciones/funciones.entity.js";
import { Roles } from "../security/roles/roles.entity.js";
import { listaFunciones } from "./Funciones/data.js";
import { listaRoles } from "./Roles/data.js";

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

  if (especialidadesCount === 0) {
    const especialidadesInsertadas = await emFork.insertMany(
      Especialidades,
      listaEspecialidades
    );
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
          case "Moderador":
            return {
              nombre: "Moderador",
              funciones: funcionesInsertadas.filter(
                (funcion: Funciones) =>
                  funcion.nombre.includes("Leer") ||
                  funcion.nombre.includes("Turnos")
              ),
            };
          case "Usuario":
            return {
              nombre: "Usuario",
              funciones: funcionesInsertadas.filter(
                (funcion: Funciones) =>
                  funcion.nombre.includes("Leer") ||
                  funcion.nombre.includes("Turnos")
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
