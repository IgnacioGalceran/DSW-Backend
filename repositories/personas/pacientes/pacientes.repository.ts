import { Paciente } from "../../../models/personas/personas";
import { Repository } from "../../../shared/repository";
import { listaPacientes } from "../../../models/personas/personas.js";

export class PacienteRepository implements Repository<Paciente> {
  public findAll(): Paciente[] {
    return listaPacientes;
  }

  public findOne(item: { id: string }): Paciente | undefined {
    throw new Error();
  }

  public add(item: Paciente): Paciente | undefined {
    throw new Error();
  }

  public update(item: Paciente): Paciente | undefined {
    throw new Error();
  }

  public remove(item: { id: string }): {
    indice: number;
    pacienteABorrar: Paciente | undefined;
  } {
    let i = -1;
    const pacienteABorrar: Paciente | undefined = listaPacientes.find(
      (paciente, index) => {
        if (paciente.id === item.id) {
          i = index;
        }
        return paciente.id === item.id;
      }
    );

    listaPacientes.splice(i, 1);

    return { indice: i, pacienteABorrar: pacienteABorrar };
  }
}
