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
    return await em.find(Medicos, {}, { populate: ["especialidad.descEsp"] });
  }

  public async findOne(item: { id: string }): Promise<Medicos | undefined> {
    return await em.findOneOrFail(
      Medicos,
      { _id: new ObjectId(item.id) },
      { populate: ["especialidad"] }
    );
  }

  public async add(item: Medicos): Promise<Medicos | undefined> {
    const especialidad = await em.findOne(Especialidades, {
      _id: new ObjectId(item.especialidad.id),
    });

    console.log(item.especialidad.id);

    console.log(especialidad);

    if (!especialidad) {
      throw new Error("Especialidad no encontrada");
    }

    const medico = new Medicos();
    medico.nombre = item.nombre;
    medico.apellido = item.apellido;
    medico.telefono = item.telefono;
    medico.horaDesde = item.horaDesde;
    medico.horaHasta = item.horaHasta;
    medico.diasAtencion = item.diasAtencion;
    medico.especialidad = especialidad;
    medico.matricula = item.matricula;

    await em.persistAndFlush(medico);
    return medico;
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
