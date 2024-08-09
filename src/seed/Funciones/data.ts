import { Collection } from "@mikro-orm/mongodb";
import { Funciones } from "../../security/funciones/funciones.entity.js";
import { Roles } from "../../security/roles/roles.entity.js";

export const listaFunciones: Funciones[] = [
  { nombre: "Leer Pacientes" },
  { nombre: "Crear Pacientes" },
  { nombre: "Modificar Pacientes" },
  { nombre: "Borrar Pacientes" },
  { nombre: "Leer Especialidades" },
  { nombre: "Crear Especialidades" },
  {
    nombre: "Modificar Especialidades",
  },
  { nombre: "Borrar Especialidades" },
  { nombre: "Leer Medicos" },
  { nombre: "Crear Medicos" },
  { nombre: "Modificar Medicos" },
  { nombre: "Borrar Medicos" },
  { nombre: "Leer Turnos" },
  { nombre: "Crear Turnos" },
  { nombre: "Modificar Turnos" },
  { nombre: "Borrar Turnos" },
];
