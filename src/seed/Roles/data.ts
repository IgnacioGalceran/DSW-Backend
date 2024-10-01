import { ObjectId } from "mongodb";
import { Roles } from "../../security/roles/roles.entity.js";

export const listaRoles: Roles[] = [
  {
    _id: new ObjectId(),
    nombre: "Administrador",
  },
  {
    _id: new ObjectId(),
    nombre: "Medico",
  },
  {
    _id: new ObjectId(),
    nombre: "Paciente",
  },
];
