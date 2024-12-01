import { orm } from "../../shared/orm.js";
import { ObrasSociales } from "./obrasocial.entity.js";
import { Service } from "../../shared/service.js";
import { ObjectId } from "mongodb";
import { error } from "console";

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
    const obrasSocialCreada = em.create(ObrasSociales, item);
    await em.flush();
    return obrasSocialCreada;
  }

  public async update(item: ObrasSociales): Promise<any> {}

  public async remove(item: { id: string }): Promise<any> {}
}
