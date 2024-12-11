import { orm } from "../../shared/orm.js";
import { Medicos } from "./medicos.entity.js";
import { Service } from "../../shared/service.js";
import { ObjectId } from "mongodb";
import { Especialidades } from "../especialidades/especialidades.entity.js";
import { InvalidJson, NotFound } from "../../shared/errors.js";
import { Roles } from "../../security/roles/roles.entity.js";
import admin from "../../firebaseConfig.js";
import { Usuarios } from "../../auth/usuarios.entity.js";
import { ObrasSociales } from "../obrasocial/obrasocial.entity.js";
import { EntityManager } from "@mikro-orm/core";

export class MedicoService implements Service<Medicos> {
  constructor(private readonly em: EntityManager) {}

  public async findAll(): Promise<Medicos[] | undefined> {
    const em = this.em;
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
    const em = this.em;
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
    const em = this.em;

    if (!item.obrasocial || !item.obrasocial.length) {
      throw new InvalidJson("obrasocial");
    }

    try {
      // Crear usuario en Firebase
      const medicoNuevo = await admin.auth().createUser({
        email: item.email,
        password: item.password,
      });

      // Cargar especialidad y rol
      const especialidad = await em.findOne(Especialidades, {
        _id: new ObjectId(item.especialidad?.id),
      });

      const rol = await em.findOne(Roles, { nombre: "Medico" });

      // Crear entidades de Usuarios y Medicos
      const usuario = new Usuarios();
      const medico = new Medicos();

      item.usuario.uid = medicoNuevo.uid;
      Object.assign(usuario, item.usuario);

      medico.matricula = item.matricula;
      medico.especialidad = especialidad;
      medico.diasAtencion = item.diasAtencion;
      medico.horaDesde = item.horaDesde;
      medico.horaHasta = item.horaHasta;

      // Cargar obras sociales
      const obrasSocialesIds = item.obrasocial.map(
        (os: any) => new ObjectId(os)
      );
      console.log("obrasSocialesIds", obrasSocialesIds);

      const obrasSociales = [];
      for (const id of obrasSocialesIds) {
        const obraSocial = await em.findOne(ObrasSociales, { _id: id });
        if (!obraSocial) {
          console.warn(`No se encontró la obra social con ID: ${id}`);
        } else {
          obrasSociales.push(obraSocial);
          console.log(`Obra social encontrada con ID ${id}:`, obraSocial);
        }
      }

      if (!obrasSociales.length) {
        throw new Error(
          "No se encontraron obras sociales con los IDs proporcionados"
        );
      }

      console.log("Obras sociales encontradas:", obrasSociales);

      medico.obrasocial?.set(obrasSociales);

      // Asignar relaciones adicionales
      medico.usuario = usuario;
      usuario.rol = rol;
      usuario.email = item.email;
      usuario.verificado = true;

      // Persistir las entidades
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
    const em = this.em;
    const medicoAActualizar = await em.findOne(
      Medicos,
      {
        _id: new ObjectId(item.id),
      },
      { populate: ["usuario", "obrasocial"] }
    );

    if (!medicoAActualizar) throw new NotFound(item.id);

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

    item.usuario._id = medicoAActualizar.usuario._id;
    item.usuario.uid = medicoAActualizar.usuario.uid;
    item.usuario.email = medicoAActualizar.usuario.email;

    const usuarioAActualizar = medicoAActualizar.usuario;
    em.assign(usuarioAActualizar, item.usuario);
    em.assign(medicoAActualizar, item);

    await em.flush();

    return medicoAActualizar;
  }

  public async updateProfile(item: any): Promise<Medicos | undefined> {
    const em = this.em;
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
    item.usuario.email = medicoAActualizar.usuario.email;

    const usuarioAActualizar = medicoAActualizar.usuario;
    em.assign(usuarioAActualizar, item.usuario);
    em.assign(medicoAActualizar, item);
    await em.flush();

    return item;
  }

  public async remove(item: { id: string }): Promise<Medicos | undefined> {
    const em = this.em;
    console.log("item id", item.id);

    const usuarioABorrar = await em.findOne(Usuarios, new ObjectId(item.id));

    if (!usuarioABorrar) throw new NotFound(item.id);

    const medicosABorrar = await em.findOne(Medicos, {
      usuario: usuarioABorrar,
    });

    if (!medicosABorrar) throw new NotFound(item.id);

    await em.removeAndFlush([usuarioABorrar, medicosABorrar]);

    return medicosABorrar;
  }

  public async findMedicoByEspecialidad(item: {
    id: string;
  }): Promise<Medicos[] | undefined> {
    const em = this.em;
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
