import { NextFunction, Request, Response } from "express";
import { orm } from "./orm.js";
import { Pacientes } from "../entities/pacientes/pacientes.entity.js";
import { Funciones } from "../security/funciones/funciones.entity.js";
import { NotFound, Unauthorized, UserNotFounded } from "./errors.js";
import { Medicos } from "../entities/medicos/medicos.entity.js";
import { Usuarios } from "../auth/usuarios.entity.js";

export default async function checkPermissions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const em = orm.em;
  let entidad: string = req.baseUrl.split("/")[2];
  let metodo: string = req.method;
  let query = getMongoDBQuery(entidad, metodo);
  try {
    const usuario = await em.findOne(
      Usuarios,
      {
        uid: req.headers.firebaseUid,
      },
      { populate: ["rol", "rol.funciones"] }
    );

    if (!usuario) {
      throw new UserNotFounded();
    }

    const funciones = usuario?.rol?.funciones;
    const funcion = funciones?.find(
      (funcion: Funciones) =>
        funcion.nombre.toLowerCase() === query.toLowerCase()
    );

    if (funcion) {
      next();
    } else {
      throw new Unauthorized(query.toLowerCase());
    }
  } catch (error: any) {
    next(error);
  }
}

function getMongoDBQuery(entidad: string, metodo: string): string {
  switch (entidad) {
    case "especialidades":
      return getQuery("especialidades", metodo);
    case "medicos":
      return getQuery("medicos", metodo);
    case "pacientes":
      return getQuery("pacientes", metodo);
    case "turnos":
      return getQuery("turnos", metodo);
    case "roles":
      return getQuery("roles", metodo);
    case "funciones":
      return getQuery("funciones", metodo);
    default:
      return "";
  }
}

function getQuery(entidad: string, metodo: string): string {
  switch (metodo) {
    case "GET":
      return `Leer ${entidad}`;
    case "POST":
      return `Crear ${entidad}`;
    case "PUT":
      return `Actualizar ${entidad}`;
    case "DELETE":
      return `Borrar ${entidad}`;
    default:
      return "";
  }
}
