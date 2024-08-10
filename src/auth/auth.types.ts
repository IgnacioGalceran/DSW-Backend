import { ObjectId } from "mongodb";

export interface RegisterAdministrador extends RegisterPaciente {}

export interface RegisterPaciente {
  uid: string;
  nombre: string;
  apellido: string;
  dni: string;
  tipoDni: string;
  rol: ObjectId;
}

export interface RegisterMedico extends RegisterPaciente {
  matricula: string;
  telefono: string;
  horaDesde: string;
  horaHasta: string;
  diasAtencion: string[];
  especialidad: ObjectId;
}
