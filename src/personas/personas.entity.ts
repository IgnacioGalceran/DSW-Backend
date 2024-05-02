import crypto from "node:crypto";

export class Persona {
  constructor(
    public nombre: string,
    public apellido: string,
    public idRol: string,
    public telefono: string,
    public direccion: string,
    public idLocalidad: string,
    public id = crypto.randomUUID()
  ) {}
}

export class Paciente extends Persona {
  constructor(
    nombre: string,
    apellido: string,
    idRol: string,
    direccion: string,
    idLocalidad: string,
    telefono: string,
    public tipoDni: string,
    public dni: string,
    public id = crypto.randomUUID()
  ) {
    super(nombre, apellido, idRol, direccion, idLocalidad, telefono, id);
  }
}

// export class Medico extends Persona {
//   constructor(
//     nombre: string,
//     apellido: string,
//     rol: string,
//     public especialidad: string,
//     id: string = crypto.randomUUID()
//   ) {
//     super(nombre, apellido, rol, id);
//   }
// public get fullName(): string {
//   return this.nombre + " " + this.apellido;
// }
// }

export const listaPacientes: Paciente[] = [
  new Paciente(
    "Ignacio",
    "Galceran",
    "2",
    "3462536843",
    "Calle 62",
    "3",
    "dni",
    "40969962"
  ),
  new Paciente(
    "Jose",
    "Fonseca",
    "2",
    "3456845216",
    "Calle 50",
    "1",
    "dni",
    "41526485"
  ),
];
