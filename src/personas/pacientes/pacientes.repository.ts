import { Paciente } from "../personas.entity.js";
import { Repository } from "../../../shared/repository.js";
import { listaPacientes } from "../personas.entity.js";

function encontrarPaciente(id: string): {
  indice: number;
  data: Paciente | undefined;
} {
  let i = -1;
  const pacienteABorrar = listaPacientes.find((paciente, index) => {
    if (paciente.id === id) {
      i = index;
    }
    return paciente.id === id;
  });

  return { indice: i, data: pacienteABorrar };
}

function borrarPaciente(id: string): Paciente | undefined {
  const pacienteABorrar = encontrarPaciente(id);
  listaPacientes.splice(pacienteABorrar.indice, 1);

  return pacienteABorrar.data;
}

export class PacienteRepository implements Repository<Paciente> {
  public findAll(): Paciente[] {
    return listaPacientes;
  }

  public findOne(item: { id: string }): Paciente | undefined {
    return encontrarPaciente(item.id).data;
  }

  public add(item: Paciente): Paciente | undefined {
    const pacienteNuevo = new Paciente(
      item.nombre,
      item.apellido,
      item.idRol,
      item.direccion,
      item.idLocalidad,
      item.telefono,
      item.tipoDni,
      item.dni
    );

    if (!pacienteNuevo) return;

    listaPacientes.push(pacienteNuevo);
    return pacienteNuevo;
  }

  public update(item: Paciente): Paciente | undefined {
    const pacienteAActualizar = encontrarPaciente(item.id);

    if (!pacienteAActualizar.data) return;

    listaPacientes[pacienteAActualizar.indice] = {
      ...listaPacientes[pacienteAActualizar.indice],
      ...item,
    };

    return item;
  }

  public remove(item: { id: string }): Paciente | undefined {
    return borrarPaciente(item.id);
  }
}
