import { orm } from "../../shared/orm.js";
import { Medicos } from "./medicos.entity.js";
import { Service } from "../../shared/service.js";
import { ObjectId } from "mongodb";
import { Collection } from "@mikro-orm/core";
import { PopulateHint } from "@mikro-orm/mongodb";
import { Especialidades } from "../especialidades/especialidades.entity.js";
import { InvalidJson, NotFound } from "../../shared/errors.js";
import { Roles } from "../../security/roles/roles.entity.js";
import { RegisterMedico } from "../../auth/auth.types.js";
import admin from "../../../firebaseConfig.js";
import { Usuarios } from "../../auth/usuarios.entity.js";
import { ObrasSociales } from "../obrasocial/obrasocial.entity.js";

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
    console.log(item.id);
    const usuario = await em.findOne(
      Usuarios,
      { _id: new ObjectId(item.id) },
      {}
    );

    console.log(usuario);

    const medico = await em.findOne(
      Medicos,
      { usuario: usuario },
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

    console.log(usuario);
    console.log(medico);

    if (!medico) throw new NotFound(item.id);

    return medico;
  }

  public async add(
    item: Medicos & { email: string; password: string }
  ): Promise<any> {
    console.log(item);
    if (!item.obrasocial || !item.obrasocial.length) {
      throw new InvalidJson("obrasocial");
    }

    try {
      const medicoNuevo = await admin.auth().createUser({
        email: item.email,
        password: item.password,
      });

      const especialidad = await em.findOne(Especialidades, {
        _id: new ObjectId(item.especialidad?.id),
      });

      const rol = await em.findOne(Roles, {
        nombre: "Medico",
      });

      const usuario = new Usuarios();
      const medico = new Medicos();

      item.usuario.uid = medicoNuevo.uid;

      Object.assign(usuario, item.usuario);

      medico.matricula = item.matricula;
      medico.especialidad = especialidad;
      medico.diasAtencion = item.diasAtencion;
      medico.horaDesde = item.horaDesde;
      medico.horaHasta = item.horaHasta;

      let obrasSociales: ObrasSociales[] = [];

      if (item.obrasocial.length > 0) {
        const obrasSocialesIds = item.obrasocial.map(
          (os) => new ObjectId(os.id)
        );

        obrasSociales = await em.find(
          ObrasSociales,
          {
            _id: { $in: obrasSocialesIds },
          },
          {
            fields: ["_id", "nombre", "cuit", "telefono", "email", "direccion"],
          }
        );
      }

      console.log(obrasSociales);

      if (obrasSociales.length === 0) {
        medico.obrasocial?.set([]);
      } else {
        medico.obrasocial?.set(obrasSociales);
      }

      medico.usuario = usuario;
      usuario.rol = rol;
      usuario.email = item.email;
      usuario.verificado = true;

      em.persist(usuario);
      em.persist(medico);

      await em.flush();

      return medico;
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  }

  public async update(item: Medicos): Promise<Medicos | undefined> {
    console.log("service medicos", item);
    const medicoAActualizar = await em.findOne(
      Medicos,
      {
        _id: new ObjectId(item.id),
      },
      { populate: ["usuario", "obrasocial"] }
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
    item.telefono = item.telefono ? item.telefono : medicoAActualizar.telefono;
    item.matricula = item.matricula
      ? item.matricula
      : medicoAActualizar.matricula;

    if (item.especialidad?.id) {
      const especialidad = await em.findOne(Especialidades, {
        _id: new ObjectId(item.especialidad.id),
      });

      if (especialidad) {
        item.especialidad = especialidad;
      } else {
        item.especialidad = medicoAActualizar.especialidad;
      }
    } else {
      item.especialidad = medicoAActualizar.especialidad;
    }

    let obrasSociales: ObrasSociales[] = [];

    if (item.obrasocial && item.obrasocial.length > 0) {
      const obrasSocialesIds = item.obrasocial.map((os) => new ObjectId(os.id));

      obrasSociales = await em.find(
        ObrasSociales,
        {
          _id: { $in: obrasSocialesIds },
        },
        {
          fields: ["_id", "nombre", "cuit", "telefono", "email", "direccion"],
        }
      );
    }

    console.log(obrasSociales);

    if (obrasSociales.length === 0) {
      medicoAActualizar.obrasocial?.set([]);
    } else {
      medicoAActualizar.obrasocial?.set(obrasSociales);
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

    if (item.obrasocial && item.obrasocial.length > 0) {
      const nuevasObrasSociales = await em.find(ObrasSociales, {
        _id: {
          $in: item.obrasocial.map((os) => new ObjectId(os.id)),
        },
      });

      nuevasObrasSociales.forEach((os) => {
        if (!medicoAActualizar.obrasocial?.contains(os)) {
          medicoAActualizar.obrasocial?.add(os);
        }
      });
    }

    console.log(medicoAActualizar);

    const usuarioAActualizar = medicoAActualizar.usuario;
    em.assign(usuarioAActualizar, item.usuario);
    em.assign(medicoAActualizar, item);
    console.log(medicoAActualizar);

    await em.flush();

    return medicoAActualizar;
  }

  public async updateProfile(item: any): Promise<Medicos | undefined> {
    const usuario = await em.findOne(
      Usuarios,
      {
        uid: item.uid,
      },
      {}
    );

    if (!usuario) throw new NotFound(item.uid);

    const medicoAActualizar = await em.findOne(
      Medicos,
      {
        usuario: usuario,
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

    const medicos = await em.find(
      Medicos,
      { especialidad: especialidad },
      {
        populate: ["usuario", "especialidad"],
      }
    );

    return medicos;
  }
}
