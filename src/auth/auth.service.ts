import { orm } from "../shared/orm.js";
import { RegisterAdministrador } from "./auth.types.js";

import { Roles } from "../security/roles/roles.entity.js";

import { NotFound } from "../shared/errors.js";
import { Usuarios } from "./usuarios.entity.js";
import { EntityManager } from "@mikro-orm/core";

export class AuthService {
  constructor(private readonly em: EntityManager) {}

  public async getUserData(item: { uid: string }): Promise<any> {
    const em = this.em;
    const usuario = await em.findOne(
      Usuarios,
      { uid: item.uid },
      { populate: ["rol", "rol.funciones"] }
    );

    if (!usuario) throw new NotFound(item.uid);

    return usuario;
  }

  public async registerAdministrador(
    item: RegisterAdministrador
  ): Promise<any> {
    console.log("admin: ", item);
    const em = this.em;
    const rol = await em.findOne(Roles, {
      nombre: "Administrador",
    });

    const usuario = new Usuarios();
    Object.assign(usuario, item.usuario);
    usuario.rol = rol;
    usuario.verificado = true;

    em.persist(usuario);
    await em.flush();

    return usuario;
  }

  public async verifyUser(item: { uid: string }): Promise<any> {
    const em = this.em;
    const usuario = await em.findOne(Usuarios, {
      uid: item.uid,
    });

    if (!usuario) throw new NotFound(item.uid);

    if (usuario.verificado) return;

    usuario.verificado = true;
    await em.flush();

    return usuario;
  }
}
