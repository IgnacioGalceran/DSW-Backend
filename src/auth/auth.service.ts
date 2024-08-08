import { orm } from "../shared/orm.js";
import { Service } from "../shared/service.js";
import { Login, RegisterPaciente } from "./auth.types.js";
import { Pacientes } from "../entities/pacientes/pacientes.entity.js";
import { Roles } from "../security/roles/roles.entity.js";
import { Medicos } from "../entities/medicos/medicos.entity.js";
import { NotFound } from "../shared/errors.js";

const em = orm.em;

export class AuthService {
  public async getUserData(item: Login): Promise<any> {
    const paciente = await em.findOne(Pacientes, { uid: item.uid });
    const medico = await em.findOne(Medicos, { uid: item.uid });

    console.log(paciente);
    console.log(medico);

    if (paciente) return paciente;

    if (medico) return medico;

    throw new NotFound(item.uid);
  }

  public async registerPaciente(item: RegisterPaciente): Promise<any> {
    const rolPaciente = await em.findOne(Roles, {
      nombre: "Paciente",
    });

    const paciente = new Pacientes();
    Object.assign(paciente, item);
    paciente.rol = rolPaciente;

    await em.persistAndFlush(paciente);

    return paciente;
  }

  public async registerMedico(item: any): Promise<any> {
    const rolMedico = await em.findOne(Roles, {
      nombre: "Medico",
    });

    const medico = new Medicos();
    Object.assign(medico, item);
    medico.rol = rolMedico;

    await em.persistAndFlush(medico);

    return medico;
  }
}
