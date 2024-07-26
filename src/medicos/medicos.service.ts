import { orm } from "../../shared/orm.js";
import { Medicos } from "../medicos/medicos.entity.js";
import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { Service } from "../../shared/service.js";
import { ObjectId } from "mongodb";
import { PopulateHint } from "@mikro-orm/mongodb";
import { Especialidades } from "../especialidades/especialidades.entity.js";

const em = orm.em;

export class MedicoService implements Service<Medicos> {
  public async findAll(): Promise<Medicos[] | undefined> {
    return await em.find(Medicos, {}, { populate: ["especialidad"] });
  }

  public async findOne(item: { id: string }): Promise<Medicos | undefined> {
    return await em.findOneOrFail(
      Medicos,
      { _id: new ObjectId(item.id) },
      { populate: ["especialidad"] }
    );
  }

  public async add(item: Medicos): Promise<Medicos | undefined> {
    const especialidadEncontrada = await em.findOne(Especialidades, {
      _id: new ObjectId(item?.especialidad?.id),
    });

    const medic = new Medicos();
    const { especialidad, ...restItems } = item;
    Object.assign(medic, restItems);
    medic.especialidad = especialidadEncontrada || null;

    await em.persistAndFlush(medic);

    return medic;
  }

  public async update(item: Medicos): Promise<Medicos | undefined> {
    const medicoAActualizar = await em.findOneOrFail(Medicos, {
      _id: new ObjectId(item.id),
    });
    const medicoActualizado = em.assign(medicoAActualizar, item);
    await em.flush();
    return medicoActualizado;
  }

  public async remove(item: { id: string }): Promise<Medicos | undefined> {
    const medicosABorrar = await em.findOneOrFail(Medicos, {
      _id: new ObjectId(item.id),
    });
    em.remove(medicosABorrar);
    await em.flush();
    return medicosABorrar;
  }
}
