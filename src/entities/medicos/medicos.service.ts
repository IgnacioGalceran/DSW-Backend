import { orm } from "../../shared/orm.js";
import { Medicos } from "./medicos.entity.js";
import { Service } from "../../shared/service.js";
import { ObjectId } from "mongodb";
import { PopulateHint } from "@mikro-orm/mongodb";
import { Especialidades } from "../especialidades/especialidades.entity.js";
import { NotFound } from "../../shared/errors.js";
import { Roles } from "../../security/roles/roles.entity.js";
import { RegisterMedico } from "../../auth/auth.types.js";
import admin from "../../../firebaseConfig.js";
import { Usuarios } from "../../auth/usuarios.entity.js";

const em = orm.em;

export class MedicoService implements Service<Medicos> {
  public async findAll(): Promise<Medicos[] | undefined> {
    return await em.find(
      Medicos,
      {},
      {
        populate: [
          "usuario",
          "especialidad",
          "usuario.rol",
          "usuario.rol.funciones",
          "turnos",
        ],
      }
    );
  }

  public async findOne(item: { id: string }): Promise<Medicos | undefined> {
    const medico = await em.findOne(
      Medicos,
      { _id: new ObjectId(item.id) },
      {
        populate: [
          "usuario",
          "especialidad",
          "usuario.rol",
          "usuario.rol.funciones",
          "turnos",
        ],
      }
    );

    if (!medico) throw new NotFound(item.id);

    return medico;
  }

  public async add(
    item: Medicos & { email?: string; password?: string }
  ): Promise<any> {
    try {
      const medicoNuevo = await admin.auth().createUser({
        email: item.email,
        password: item.password,
      });

      console.log(medicoNuevo);

      const rol = await em.findOne(Roles, {
        nombre: "Medico",
      });
      console.log(rol);

      const usuario = new Usuarios();
      const medico = new Medicos();

      item.usuario.uid = medicoNuevo.uid;
      console.log(item);
      Object.assign(usuario, item.usuario);
      medico.matricula = item.matricula;
      medico.usuario = usuario;
      usuario.rol = rol;

      em.persist(usuario);
      em.persist(medico);
      await em.flush();

      return medico;
    } catch (error: any) {
      console.log(error);
    }
    // console.log(item)
  }

  public async update(item: Medicos): Promise<Medicos | undefined> {
    console.log("service medicos");
    const medicoAActualizar = await em.findOne(
      Medicos,
      {
        _id: new ObjectId(item.id),
      },
      { populate: ["usuario"] }
    );

    if (!medicoAActualizar) throw new NotFound(item.id);

    item.diasAtencion = item.diasAtencion
      ? item.diasAtencion
      : medicoAActualizar.diasAtencion;
    item.horaDesde = item.horaDesde
      ? item.horaDesde
      : medicoAActualizar.horaDesde;
    item.horaHasta = item.horaHasta
      ? item.horaHasta
      : medicoAActualizar.horaHasta;
    item.diasAtencion = item.diasAtencion
      ? item.diasAtencion
      : medicoAActualizar.diasAtencion;
    item.telefono = item.telefono ? item.telefono : medicoAActualizar.telefono;
    item.matricula = item.matricula
      ? item.matricula
      : medicoAActualizar.matricula;

    if (item.especialidad?.id) {
      const especialidad = await em.findOne(Especialidades, {
        _id: new ObjectId(item.especialidad.id),
      });
      console.log(especialidad);

      if (especialidad) {
        item.especialidad = especialidad;
      } else {
        item.especialidad = medicoAActualizar.especialidad;
      }
    } else {
      item.especialidad = medicoAActualizar.especialidad;
    }

    item.usuario._id = medicoAActualizar.usuario._id;
    item.usuario.uid = medicoAActualizar.usuario.uid;
    item.usuario.nombre = item.usuario.nombre
      ? item.usuario.nombre
      : medicoAActualizar.usuario.nombre;
    item.usuario.apellido = item.usuario.apellido
      ? item.usuario.apellido
      : medicoAActualizar.usuario.apellido;
    item.usuario.tipoDni = item.usuario.tipoDni
      ? item.usuario.tipoDni
      : medicoAActualizar.usuario.tipoDni;
    item.usuario.dni = item.usuario.dni
      ? item.usuario.dni
      : medicoAActualizar.usuario.dni;

    if (item.usuario.rol?.id) {
      const rol = await em.findOne(Roles, {
        _id: new ObjectId(item.usuario.rol.id),
      });

      if (rol) {
        item.usuario.rol = rol;
      } else {
        item.usuario.rol = medicoAActualizar.usuario.rol;
      }
    } else {
      item.usuario.rol = medicoAActualizar.usuario.rol;
    }

    const usuarioAActualizar = medicoAActualizar.usuario;
    em.assign(usuarioAActualizar, item.usuario);
    em.assign(medicoAActualizar, item);
    await em.flush();

    return item;
  }

  public async remove(item: { id: string }): Promise<Medicos | undefined> {
    const medicosABorrar = em.getReference(Medicos, new ObjectId(item.id));

    if (!medicosABorrar) throw new NotFound(item.id);

    await em.removeAndFlush(medicosABorrar);

    return medicosABorrar;
  }

  public async findMedicoByEspecialidad(item: {
    id: string;
  }): Promise<Medicos[] | undefined> {
    const especialidad = await em.findOne(
      Especialidades,
      { _id: new ObjectId(item.id) },
      {}
    );
    if (!especialidad) throw new NotFound(item.id);

    const medico = await em.find(
      Medicos,
      { especialidad: especialidad },
      {
        populate: ["usuario"],
      }
    );

    return medico;
  }
}
