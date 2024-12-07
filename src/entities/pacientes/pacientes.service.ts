import { orm } from "../../shared/orm.js";
import { Pacientes } from "./pacientes.entity.js";
import { Service } from "../../shared/service.js";
import { ObjectId } from "mongodb";
import { NotFound } from "../../shared/errors.js";
import { Roles } from "../../security/roles/roles.entity.js";
import { Usuarios } from "../../auth/usuarios.entity.js";
import admin from "../../../firebaseConfig.js";

const em = orm.em;

export class PacienteService implements Service<Pacientes> {
  public async findAll(): Promise<Pacientes[] | undefined> {
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
      // console.log("paciente: ", paciente);

      if (!paciente) return undefined;
      // / new NotFound(item.id);

      return paciente;
    } catch (error) {
      console.error("Error en el servicio findOne:", error);
      throw error;
    }
  }

  public async add(item: Pacientes): Promise<any> {
    console.log(item);
    try {
      const rol = await em.findOne(Roles, {
        nombre: "Paciente",
      });
      console.log(rol);

      const usuario = new Usuarios();
      const paciente = new Pacientes();

      console.log(item);
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
    console.log("ITEM update: ", item);
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
    console.log(item);
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
    const pacienteABorrar = em.getReference(Pacientes, new ObjectId(item.id));

    if (!pacienteABorrar) throw new NotFound(item.id);

    await em.removeAndFlush(pacienteABorrar);

    return pacienteABorrar;
  }
}
