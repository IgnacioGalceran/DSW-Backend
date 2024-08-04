import { orm } from "../shared/orm.js";
import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { Service } from "../shared/service.js";
import { RegisterPaciente } from "./auth.types.js";
import { Pacientes } from "../entities/pacientes/pacientes.entity.js";

const em = orm.em;

export class AuthService {
  public async login(item: { id: string }): Promise<any> {}
  public async registerPaciente(item: RegisterPaciente): Promise<any> {
    const paciente = new Pacientes();
    Object.assign(paciente, item);

    await em.persistAndFlush(paciente);

    return paciente;
  }
  public async registerMedico(item: any): Promise<any> {}
}
