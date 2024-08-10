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
      { populate: ["usuario", "usuario.rol", "usuario.rol.funciones"] }
    );
  }

  public async findOne(item: { id: string }): Promise<Pacientes | undefined> {
    const paciente = await em.findOne(
      Pacientes,
      {
        _id: new ObjectId(item.id),
      },
      {
        populate: ["usuario", "usuario.rol", "usuario.rol.funciones"],
      }
    );

    if (!paciente) throw new NotFound(item.id);

    return paciente;
  }

  public async update(item: Pacientes): Promise<Pacientes | undefined> {
    const pacienteAActualizar = await em.findOne(Pacientes, {
      _id: new ObjectId(item.id),
    });

    if (!pacienteAActualizar) throw new NotFound(item.id);

    // if (item.rol?._id) {
    //   const rol = await em.findOne(Roles, { _id: new ObjectId(item.rol._id) });
    //   item.rol = rol;
    // }

    const pacienteActualizado = em.assign(pacienteAActualizar, item);
    console.log(pacienteActualizado);
    await em.flush();

    return pacienteActualizado;
  }

  public async remove(item: { id: string }): Promise<Pacientes | undefined> {
    const pacienteABorrar = await em.findOneOrFail(Pacientes, {
      _id: new ObjectId(item.id),
    });

    if (!pacienteABorrar) throw new NotFound(item.id);

    em.remove(pacienteABorrar);
    await em.flush();

    return pacienteABorrar;
  }
}
