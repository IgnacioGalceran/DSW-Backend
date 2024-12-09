import { orm } from "../../shared/orm.js";
import { Service } from "../../shared/service.js";
import { ObjectId } from "mongodb";
import { Funciones } from "../funciones/funciones.entity.js";
import { NotFound } from "../../shared/errors.js";
import { Roles } from "../roles/roles.entity.js";
import { EntityManager } from "@mikro-orm/core";

export class FuncionesService implements Service<Funciones> {
  constructor(private readonly em: EntityManager) {}

  public async findAll(): Promise<Funciones[] | undefined> {
    try {
      const em = this.em;
      return await em.find(Funciones, {}, { populate: ["roles"] });
    } catch (error) {
      console.log(error);
    }
  }

  public async findOne(item: { id: string }): Promise<Funciones | undefined> {
    try {
      const em = this.em;
      const rol = await em.findOne(
        Funciones,
        { _id: new ObjectId(item.id) },
        { populate: ["roles"] }
      );

      if (!rol) throw new NotFound(item.id);

      return rol;
    } catch (error) {
      console.log(error);
    }
  }

  public async add(item: any): Promise<Funciones | undefined> {
    const em = this.em;
    let roles: Roles[] = [];

    if (item.roles.length > 0) {
      roles = await em.find(
        Roles,
        {
          _id: {
            $in: item.roles,
          },
        },
        {
          fields: ["_id", "nombre", "funciones"],
        }
      );
    }

    const funcion = new Funciones();
    funcion.nombre = item.nombre;

    if (roles.length === 0) {
      funcion.roles?.add([]);
    } else {
      funcion.roles?.add(roles);
    }

    await em.persistAndFlush(funcion);

    return funcion;
  }

  public async update(item: any): Promise<Funciones | undefined> {
    const em = this.em;
    const funcionAActualizar = await em.findOne(
      Funciones,
      { _id: new ObjectId(item.id) },
      { populate: ["roles"] }
    );

    if (!funcionAActualizar) throw new NotFound(item.id);

    let roles: Roles[] = [];

    if (item.roles.length > 0) {
      roles = await em.find(
        Roles,
        {
          _id: {
            $in: item.roles,
          },
        },
        {
          fields: ["_id", "nombre", "funciones"],
        }
      );
    }

    item.roles = roles;

    const funcionActualizada = em.assign(funcionAActualizar, item);
    await em.flush();

    return funcionActualizada;
  }

  public async remove(item: { id: string }): Promise<Funciones | undefined> {
    const em = this.em;
    const funcionABorrar = em.getReference(Funciones, new ObjectId(item.id));

    if (!funcionABorrar) throw new NotFound(item.id);

    em.remove(funcionABorrar);
    await em.flush();

    return funcionABorrar;
  }
}
