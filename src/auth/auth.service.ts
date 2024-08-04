import { orm } from "../shared/orm.js";
import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { Service } from "../shared/service.js";
import { Login, RegisterPaciente } from "./auth.types.js";
import { Pacientes } from "../entities/pacientes/pacientes.entity.js";
import { NotFound } from "../shared/errors.js";
import { Medicos } from "../entities/medicos/medicos.entity.js";

const em = orm.em;
const jwt = require("jsonwebtoken");

export class AuthService {
  public async login(item: Login): Promise<any> {
    const paciente = await em.findOne(Pacientes, { uid: item.uid });
    const medico = await em.findOne(Medicos, { uid: item.uid });

    if (!paciente && !medico) {
      throw new NotFound(item.uid);
    }

    const token = jwt.sign(
      {
        uid: item.uid,
      },
      "Secret123",
      { expiresIn: "30d" }
    );

    return token;
  }

  public async registerPaciente(item: RegisterPaciente): Promise<any> {
    const paciente = new Pacientes();
    Object.assign(paciente, item);

    await em.persistAndFlush(paciente);

    return paciente;
  }

  public async registerMedico(item: any): Promise<any> {}
}
