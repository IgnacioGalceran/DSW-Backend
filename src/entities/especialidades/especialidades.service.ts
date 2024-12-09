import { orm } from "../../shared/orm.js";
import { Service } from "../../shared/service.js";
import { ObjectId } from "mongodb";
import { Especialidades } from "./especialidades.entity.js";
import { NotFound } from "../../shared/errors.js";
import { EntityManager } from "@mikro-orm/core";

export class EspecialidadesService implements Service<Especialidades> {
  constructor(private readonly em: EntityManager) {}

  public async findAll(): Promise<Especialidades[] | undefined> {
    const em = this.em;
    return await em.find(Especialidades, {}, { populate: ["medicos"] });
  }

  public async findOne(item: {
    id: string;
  }): Promise<Especialidades | undefined> {
    const em = this.em;
    const especialidad = await em.findOne(
      Especialidades,
      {
        _id: new ObjectId(item.id),
      },
      { populate: ["medicos"] }
    );

    if (!especialidad) throw new NotFound(item.id);

    return especialidad;
  }

  public async findEspecialidadesWithMedicos(): Promise<Especialidades[]> {
    const em = this.em;
    const especialidades = await em.find(
      Especialidades,
      {},
      { populate: ["medicos", "medicos.obrasocial"] }
    );

    const especialidadesConMedicos = especialidades.filter((especialidad) => {
      if (especialidad.medicos) {
        return especialidad.medicos?.count() > 0;
      }
    });

    return especialidadesConMedicos;
  }

  public async add(item: Especialidades): Promise<Especialidades | undefined> {
    const em = this.em;
    const especialidadCreado = em.create(Especialidades, item);
    await em.flush();
    return especialidadCreado;
  }

  public async update(
    item: Especialidades
  ): Promise<Especialidades | undefined> {
    const em = this.em;
    const especialidadAActualizar = await em.findOne(Especialidades, {
      _id: new ObjectId(item.id),
    });

    console.log(especialidadAActualizar);

    if (!especialidadAActualizar) throw new NotFound(item.id);

    const especialidadActualizada = em.assign(especialidadAActualizar, item);
    await em.flush();

    return;
  }

  public async remove(item: {
    id: string;
  }): Promise<Especialidades | undefined> {
    const em = this.em;
    const EspecialidadesABorrar = await em.findOne(Especialidades, {
      _id: new ObjectId(item.id),
    });

    if (!EspecialidadesABorrar) throw new NotFound(item.id);

    em.remove(EspecialidadesABorrar);
    await em.flush();

    return EspecialidadesABorrar;
  }
}
