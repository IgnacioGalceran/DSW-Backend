import { orm } from "../../shared/orm.js";
import { Pacientes } from "./pacientes.entity.js";
import { Service } from "../../shared/service.js";
import { ObjectId } from "mongodb";
import { NotFound } from "../../shared/errors.js";

const em = orm.em;

export class PacienteService implements Service<Pacientes> {
  public async findAll(): Promise<Pacientes[] | undefined> {
    return await em.find(Pacientes, {});
  }

  public async findOne(item: { id: string }): Promise<Pacientes | undefined> {
    const paciente = await em.findOne(Pacientes, {
      _id: new ObjectId(item.id),
    });

    if (!paciente) throw new NotFound(item.id);

    return paciente;
  }

  public async add(item: Pacientes): Promise<Pacientes | undefined> {
    const pacienteCreado = em.create(Pacientes, item);
    await em.flush();
    return pacienteCreado;
  }

  public async update(item: Pacientes): Promise<Pacientes | undefined> {
    const pacienteAActualizar = await em.findOne(Pacientes, {
      _id: new ObjectId(item.id),
    });

    if (!pacienteAActualizar) throw new NotFound(item.id);

    const pacienteActualizado = em.assign(pacienteAActualizar, item);
    await em.flush();

    return pacienteActualizado;
  }

  public async remove(item: { id: string }): Promise<Pacientes | undefined> {
    const pacienteABorrar = await em.findOneOrFail(Pacientes, {
      _id: new ObjectId(item.id),
    });

    if (!pacienteABorrar) throw new NotFound(item.id);

    em.remove(pacienteABorrar);
    await em.flush();

    return pacienteABorrar;
  }
}
