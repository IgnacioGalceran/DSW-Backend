import { orm } from "../shared/orm.js";
import { RegisterAdministrador } from "./auth.types.js";

import { Roles } from "../security/roles/roles.entity.js";

import { NotFound } from "../shared/errors.js";
import { Usuarios } from "./usuarios.entity.js";

const em = orm.em;

export class AuthService {
  public async getUserData(item: { uid: string }): Promise<any> {
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
    const rol = await em.findOne(Roles, {
      nombre: "Administrador",
    });

    const usuario = new Usuarios();
    Object.assign(usuario, item);
    usuario.rol = rol;

    em.persist(usuario);
    await em.flush();

    return usuario;
  }
}
