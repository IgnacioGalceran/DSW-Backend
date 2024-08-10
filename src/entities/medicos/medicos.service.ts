import { orm } from "../../shared/orm.js";
import { Medicos } from "./medicos.entity.js";
import { Service } from "../../shared/service.js";
import { ObjectId } from "mongodb";
import { PopulateHint } from "@mikro-orm/mongodb";
import { Especialidades } from "../especialidades/especialidades.entity.js";
import { NotFound } from "../../shared/errors.js";

const em = orm.em;

export class MedicoService implements Service<Medicos> {
  public async findAll(): Promise<Medicos[] | undefined> {
    return await em.find(
      Medicos,
      {},
      { populate: ["usuario", "especialidad"] }
    );
  }

  public async findOne(item: { id: string }): Promise<Medicos | undefined> {
    const medico = await em.findOne(
      Medicos,
      { _id: new ObjectId(item.id) },
      { populate: ["usuario", "especialidad"] }
    );

    if (!medico) throw new NotFound(item.id);

    return medico;
  }

  public async update(item: Medicos): Promise<Medicos | undefined> {
    const medicoAActualizar = em.getReference(Medicos, new ObjectId(item.id));

    if (!medicoAActualizar) throw new NotFound(item.id);

    const medicoActualizado = em.assign(medicoAActualizar, item);
    await em.flush();

    return medicoActualizado;
  }

  public async remove(item: { id: string }): Promise<Medicos | undefined> {
    const medicosABorrar = await em.findOne(Medicos, {
      _id: new ObjectId(item.id),
    });

    if (!medicosABorrar) throw new NotFound(item.id);

    em.remove(medicosABorrar);
    await em.flush();

    return medicosABorrar;
  }
}
