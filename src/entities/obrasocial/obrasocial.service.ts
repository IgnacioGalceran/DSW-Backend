import { orm } from "../../shared/orm.js";
import { ObrasSociales } from "./obrasocial.entity.js";
import { Service } from "../../shared/service.js";
import { ObjectId } from "mongodb";
import { NotFound } from "../../shared/errors.js";

const em = orm.em;

export class ObrasocialService implements Service<ObrasSociales> {
  public async findAll(): Promise<ObrasSociales[] | undefined> {
    return await em.find(ObrasSociales, {}, {});
  }

  public async findOne(item: { id: string }): Promise<any> {
    try {
      const obrasocial = await em.findOne(ObrasSociales, {
        _id: new ObjectId(item.id),
      });
    } catch (error) {
      console.log("Error en el servicio findOne: ", error);
      throw error;
    }
  }

  public async add(item: ObrasSociales): Promise<any> {
    console.log(item);
    const obrasSocialCreada = em.create(ObrasSociales, item);
    await em.flush();
    return obrasSocialCreada;
  }

  public async update(item: ObrasSociales): Promise<any> {
    const obrasocialAActualizar = await em.findOne(
      ObrasSociales,
      {
        _id: new ObjectId(item.id),
      },
      { populate: ["medicos"] }
    );

    if (!obrasocialAActualizar) throw new NotFound(item.id);

    Object.assign(obrasocialAActualizar, item);

    em.flush();

    return obrasocialAActualizar;
  }

  public async remove(item: { id: string }): Promise<any> {
    const brasocialABorrar = em.getReference(
      ObrasSociales,
      new ObjectId(item.id)
    );

    if (!brasocialABorrar) throw new NotFound(item.id);

    await em.removeAndFlush(brasocialABorrar);

    return brasocialABorrar;
  }
}
