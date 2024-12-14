import { orm } from "../shared/orm.js";
import { RegisterAdministrador } from "./auth.types.js";

import { Roles } from "../security/roles/roles.entity.js";

import { NotFound } from "../shared/errors.js";
import { Usuarios } from "./usuarios.entity.js";
import { EntityManager } from "@mikro-orm/core";
import { Pacientes } from "../entities/pacientes/pacientes.entity.js";
import { Medicos } from "../entities/medicos/medicos.entity.js";

export class AuthService {
  constructor(private readonly em: EntityManager) {}

  public async getUserData(item: { uid: string }): Promise<any> {
    console.log("item", item);
    const em = this.em;
    const usuario = await em.findOne(
      Usuarios,
      { uid: item.uid },
      { populate: ["rol", "rol.funciones"] }
    );

    console.log("user", usuario);

    if (!usuario) throw new NotFound(item.uid);

    return usuario;
  }

  public async registerAdministrador(
    item: RegisterAdministrador
  ): Promise<any> {
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

  public async updateProfile(item: any): Promise<any | undefined> {
    console.log("user", item);
    const em = this.em;
    const usuarioAActualizar = await em.findOne(Usuarios, {
      uid: item.id,
    });

    if (!usuarioAActualizar) throw new NotFound(item.usuario.id);

    em.assign(usuarioAActualizar, item.usuario);

    await em.flush();
    return usuarioAActualizar;
  }

  public async checkearSiUsuarioExiste(item: any): Promise<any | undefined> {
    console.log("item", item);
    const em = this.em;
    const usuarioACheckear = await em.findOne(Usuarios, {
      uid: item.uid,
    });

    if (!usuarioACheckear) {
      let nombre;
      let apellido;

      if (item.data?.displayName?.split(" ")?.length > 2) {
        nombre =
          item.data.displayName.split(" ")[0] +
          " " +
          item.data.displayName.split(" ")[1];
        apellido = item.data.displayName.split(" ")[2];
      } else {
        nombre = item.data.displayName.split(" ")[0];
        apellido = item.data.displayName.split(" ")[1];
      }

      let dni = Math.round(Math.random() * 45000000) + 5000000;

      let rol = await em.findOne(Roles, { nombre: "Paciente" });

      let user = em.create(Usuarios, {
        uid: item.data.uid,
        email: item.data.email,
        nombre,
        apellido,
        dni: dni.toString(),
        tipoDni: "dni",
        verificado: true,
        rol: rol,
      });

      let paciente = em.create(Pacientes, {
        usuario: user,
      });

      await em.flush();

      return paciente;
    }

    const paciente = await em.findOne(Pacientes, {
      usuario: usuarioACheckear,
    });

    if (paciente) {
      em.assign(usuarioACheckear, {
        verificado: true,
      });

      await em.flush();

      return paciente;
    }

    const medico = await em.findOne(Medicos, {
      usuario: usuarioACheckear,
    });

    if (medico) return medico;

    if (!medico && !paciente) return usuarioACheckear;

    em.assign(usuarioACheckear, item.usuario);

    await em.flush();
    return usuarioACheckear;
  }
}
