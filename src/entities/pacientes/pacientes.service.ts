import { orm } from "../../shared/orm.js";
import { Pacientes } from "./pacientes.entity.js";
import { Service } from "../../shared/service.js";
import { ObjectId } from "mongodb";
import { NotFound } from "../../shared/errors.js";
import { Roles } from "../../security/roles/roles.entity.js";

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

  public async findOne(item: { id: string }): Promise<Pacientes | undefined> {
    const paciente = await em.findOne(
      Pacientes,
      {
        _id: new ObjectId(item.id),
      },
      {
        populate: ["usuario", "usuario.rol", "usuario.rol.funciones", "turnos"],
      }
    );

    if (!paciente) throw new NotFound(item.id);

    return paciente;
  }

  public async update(item: Pacientes): Promise<Pacientes | undefined> {
    const pacienteAActualizar = await em.findOne(
      Pacientes,
      {
        _id: new ObjectId(item.id),
      },
      { populate: ["usuario"] }
    );

    if (!pacienteAActualizar) throw new NotFound(item.id);

    item.usuario._id = pacienteAActualizar.usuario._id;
    item.usuario.uid = pacienteAActualizar.usuario.uid;
    item.usuario.nombre = item.usuario.nombre
      ? item.usuario.nombre
      : pacienteAActualizar.usuario.nombre;
    item.usuario.apellido = item.usuario.apellido
      ? item.usuario.apellido
      : pacienteAActualizar.usuario.apellido;
    item.usuario.tipoDni = item.usuario.tipoDni
      ? item.usuario.tipoDni
      : pacienteAActualizar.usuario.tipoDni;
    item.usuario.dni = item.usuario.dni
      ? item.usuario.dni
      : pacienteAActualizar.usuario.dni;

    if (item.usuario.rol?.id) {
      const rol = await em.findOne(Roles, {
        _id: new ObjectId(item.usuario.rol.id),
      });

      if (rol) {
        item.usuario.rol = rol;
      } else {
        item.usuario.rol = pacienteAActualizar.usuario.rol;
      }
    } else {
      item.usuario.rol = pacienteAActualizar.usuario.rol;
    }

    const usuarioAActualizar = pacienteAActualizar.usuario;
    em.assign(usuarioAActualizar, item.usuario);
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
