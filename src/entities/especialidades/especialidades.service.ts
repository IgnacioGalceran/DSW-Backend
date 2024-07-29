import { orm } from "../../shared/orm.js";
import { Service } from "../../shared/service.js";
import { ObjectId } from "mongodb";
import { Especialidades } from "./especialidades.entity.js";
import { NotFound } from "../../shared/errors.js";

const em = orm.em;

export class EspecialidadesService implements Service<Especialidades> {
  public async findAll(): Promise<Especialidades[] | undefined> {
    return await em.find(Especialidades, {}, { populate: ["medicos"] });
  }

  public async findOne(item: {
    id: string;
  }): Promise<Especialidades | undefined> {
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

  public async add(item: Especialidades): Promise<Especialidades | undefined> {
    const especialidadCreado = em.create(Especialidades, item);
    await em.flush();
    return especialidadCreado;
  }

  public async update(
    item: Especialidades
  ): Promise<Especialidades | undefined> {
    const especialidadAActualizar = await em.findOne(Especialidades, {
      _id: new ObjectId(item.id),
    });

    if (!especialidadAActualizar) throw new NotFound(item.id);

    const especialidadActualizada = em.assign(especialidadAActualizar, item);
    await em.flush();

    return especialidadActualizada;
  }

  public async remove(item: {
    id: string;
  }): Promise<Especialidades | undefined> {
    const EspecialidadesABorrar = await em.findOne(Especialidades, {
      _id: new ObjectId(item.id),
    });

    if (!EspecialidadesABorrar) throw new NotFound(item.id);

    em.remove(EspecialidadesABorrar);
    await em.flush();

    return EspecialidadesABorrar;
  }
}
