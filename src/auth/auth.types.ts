import { ObjectId } from "mongodb";

export interface RegisterAdministrador extends Usuarios {
  usuario: Usuarios;
}

export interface RegisterPaciente extends Usuarios {}

export interface Usuarios {
  uid?: string;
  nombre: string;
  apellido: string;
  dni: string;
  tipoDni: string;
  rol?: ObjectId;
}

export interface RegisterMedico {
  email: string;
  password: string;
  usuario: Usuarios;
  matricula: string;
  horaDesde?: string;
  horaHasta?: string;
  diasAtencion?: string[];
  especialidad?: ObjectId;
}
