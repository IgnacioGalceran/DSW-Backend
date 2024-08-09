import { orm } from "../../shared/orm.js";
import { Roles } from "./roles.entity.js";
import { Service } from "../../shared/service.js";
import { Collection, ObjectId } from "mongodb";
import { PopulateHint } from "@mikro-orm/mongodb";
import { Funciones } from "../funciones/funciones.entity.js";
import { InvalidJson, NotFound } from "../../shared/errors.js";

const em = orm.em;

export class RolesService implements Service<Roles> {
  public async findAll(): Promise<Roles[] | undefined> {
    return await em.find(Roles, {}, { populate: ["funciones"] });
  }

  public async findOne(item: { id: string }): Promise<Roles | undefined> {
    const rol = await em.findOne(
      Roles,
      { _id: new ObjectId(item.id) },
      { populate: ["funciones"] }
    );

    if (!rol) throw new NotFound(item.id);

    return rol;
  }

  public async add(item: any): Promise<Roles | undefined> {
    if (!item.funciones) {
      throw new InvalidJson("funciones");
    }

    try {
      let funciones: Funciones[] = [];

      if (item.funciones.length > 0) {
        funciones = await em.find(
          Funciones,
          {
            _id: {
              $in: item.funciones,
            },
          },
          {
            fields: ["_id", "nombre", "roles"],
          }
        );
      }

      const rol = new Roles();
      rol.nombre = item.nombre;

      if (funciones.length === 0) {
        rol.funciones?.add([]);
      } else {
        rol.funciones?.add(funciones);
      }

      await em.persistAndFlush(rol);

      return rol;
    } catch (error) {
      throw error;
    }
  }

  public async update(item: any): Promise<Roles | undefined> {
    let funciones: Funciones[] = [];

    if (item.funciones.length > 0) {
      funciones = await em.find(
        Funciones,
        {
          _id: {
            $in: item.funciones,
          },
        },
        {
          fields: ["_id", "nombre", "roles"],
        }
      );
    }

    const rolAActualizar = await em.findOne(
      Roles,
      { _id: new ObjectId(item.id) },
      { populate: ["funciones"] }
    );

    if (!rolAActualizar) throw new NotFound(item.id);

    item.funciones = funciones;

    const rolActualizado = em.assign(rolAActualizar, item);
    await em.flush();

    return rolActualizado;
  }

  public async remove(item: { id: string }): Promise<Roles | undefined> {
    const rolesABorrar = em.getReference(Roles, new ObjectId(item.id));

    if (!rolesABorrar) throw new NotFound(item.id);

    em.remove(rolesABorrar);
    await em.flush();

    return rolesABorrar;
  }
}
