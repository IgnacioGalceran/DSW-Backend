import { Collection } from "@mikro-orm/mongodb";
import { Funciones } from "../../security/funciones/funciones.entity.js";
import { Roles } from "../../security/roles/roles.entity.js";

export const listaFunciones: Funciones[] = [
  { nombre: "Leer Pacientes" },
  { nombre: "Crear Pacientes" },
  { nombre: "Actualizar Pacientes" },
  { nombre: "Borrar Pacientes" },
  { nombre: "Leer Especialidades" },
  { nombre: "Crear Especialidades" },
  {
    nombre: "Actualizar Especialidades",
  },
  { nombre: "Borrar Especialidades" },
  { nombre: "Leer Medicos" },
  { nombre: "Crear Medicos" },
  { nombre: "Actualizar Medicos" },
  { nombre: "Borrar Medicos" },
  { nombre: "Leer Turnos" },
  { nombre: "Crear Turnos" },
  { nombre: "Actualizar Turnos" },
  { nombre: "Borrar Turnos" },
  { nombre: "Leer Funciones" },
  { nombre: "Crear Funciones" },
  { nombre: "Actualizar Funciones" },
  { nombre: "Borrar Funciones" },
  { nombre: "Leer Roles" },
  { nombre: "Crear Roles" },
  { nombre: "Actualizar Roles" },
  { nombre: "Borrar Roles" },
];
