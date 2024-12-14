import { orm } from "../../shared/orm.js";
import { Pacientes } from "./pacientes.entity.js";
import { Service } from "../../shared/service.js";
import { ObjectId } from "mongodb";
import { NotFound } from "../../shared/errors.js";
import { Roles } from "../../security/roles/roles.entity.js";
import { Usuarios } from "../../auth/usuarios.entity.js";
import { EntityManager } from "@mikro-orm/core";

export class PacienteService implements Service<Pacientes> {
  constructor(private readonly em: EntityManager) {}

  public async findAll(): Promise<Pacientes[] | undefined> {
    const em = this.em;
    return await em.find(
      Pacientes,
      {},
      {
        populate: ["usuario", "usuario.rol", "usuario.rol.funciones", "turnos"],
      }
    );
  }

  public async findOne(item: { id: string }): Promise<any> {
    try {
      const em = this.em;
      const paciente = await em.findOne(
        Pacientes,
        {
          usuario: new ObjectId(item.id),
        },
        {
          populate: [
            "usuario",
            "usuario.rol",
            "usuario.rol.funciones",
            "turnos",
          ],
        }
      );

      if (!paciente) return undefined;

      return paciente;
    } catch (error) {
      console.error("Error en el servicio findOne:", error);
      throw error;
    }
  }

  public async add(item: Pacientes): Promise<any> {
    try {
      const em = this.em;
      const rol = await em.findOne(Roles, {
        nombre: "Paciente",
      });

      const usuario = new Usuarios();
      const paciente = new Pacientes();

      Object.assign(usuario, item.usuario);
      paciente.usuario = usuario;
      usuario.rol = rol;
      usuario.email = item.usuario.email;

      em.persist(usuario);
      em.persist(paciente);
      await em.flush();

      return item;
    } catch (error: any) {
      console.log(error);
    }
  }

  public async update(item: Pacientes): Promise<Pacientes | undefined> {
    const em = this.em;
    const usuarioActualizar = await em.findOne(Usuarios, {
      _id: new ObjectId(item.id),
    });
    console.log("paciente a actualizar:", usuarioActualizar);

    if (!usuarioActualizar) throw new NotFound(item.id);

    const pacienteAActualizar = await em.findOne(Pacientes, {
      usuario: usuarioActualizar,
    });

    if (!pacienteAActualizar) throw new NotFound(item.id);

    const usuarioAActualizar = pacienteAActualizar.usuario;
    em.assign(usuarioAActualizar, item.usuario);
    await em.flush();
    console.log("user actualizado", item);
    return item;
  }

  public async updateProfile(item: Pacientes): Promise<Pacientes | undefined> {
    const em = this.em;
    const usuarioActualizar = await em.findOne(Usuarios, {
      uid: item.id,
    });
    console.log("paciente a actualizar:", usuarioActualizar);

    if (!usuarioActualizar) throw new NotFound(item.id);
    const pacienteAActualizar = await em.findOne(Pacientes, {
      usuario: usuarioActualizar,
    });

    if (!pacienteAActualizar) throw new NotFound(item.id);

    const usuarioAActualizar = pacienteAActualizar.usuario;
    em.assign(usuarioAActualizar, item.usuario);
    await em.flush();
    console.log("user actualizado", item);
    return item;
  }

  public async verificar(item: { id: string }): Promise<any | undefined> {
    const em = this.em;
    const usuario = await await em.findOne(
      Usuarios,
      {
        _id: new ObjectId(item.id),
      },
      {}
    );

    if (!usuario) throw new NotFound(item.id);

    usuario.verificado = !usuario.verificado;

    console.log(usuario);

    await em.flush();

    return item;
  }

  public async remove(item: { id: string }): Promise<Pacientes | undefined> {
    const em = this.em;
    const pacienteABorrar = em.getReference(Pacientes, new ObjectId(item.id));

    if (!pacienteABorrar) throw new NotFound(item.id);

    await em.removeAndFlush(pacienteABorrar);

    return pacienteABorrar;
  }
}
