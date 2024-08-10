import { orm } from "../shared/orm.js";
import { Service } from "../shared/service.js";
import {
  RegisterAdministrador,
  RegisterMedico,
  RegisterPaciente,
} from "./auth.types.js";
import { Pacientes } from "../entities/pacientes/pacientes.entity.js";
import { Roles } from "../security/roles/roles.entity.js";
import { Medicos } from "../entities/medicos/medicos.entity.js";
import { NotFound } from "../shared/errors.js";
import { Usuarios } from "./usuarios.entity.js";
import { Especialidades } from "../entities/especialidades/especialidades.entity.js";

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

  public async registerPaciente(item: RegisterPaciente): Promise<any> {
    const rol = await em.findOne(Roles, {
      nombre: "Paciente",
    });

    const usuario = new Usuarios();
    const paciente = new Pacientes();
    Object.assign(usuario, item);
    usuario.rol = rol;
    paciente.usuario = usuario;

    em.persist(usuario);
    em.persist(paciente);
    await em.flush();

    return paciente;
  }

  public async registerMedico(item: RegisterMedico): Promise<any> {
    console.log(item);

    const rol = await em.findOne(Roles, {
      nombre: "Medico",
    });

    const especialidad = await em.findOne(Especialidades, {
      _id: item.especialidad,
    });

    const medico = new Medicos();
    const usuario = new Usuarios();
    usuario.uid = item.uid;
    usuario.nombre = item.nombre;
    usuario.apellido = item.apellido;
    usuario.tipoDni = item.tipoDni;
    usuario.dni = item.dni;
    usuario.rol = rol;
    medico.matricula = item.matricula;
    medico.diasAtencion = item.diasAtencion;
    medico.horaDesde = item.horaDesde;
    medico.horaHasta = item.horaHasta;
    medico.telefono = item.telefono;
    medico.especialidad = especialidad;
    medico.usuario = usuario;

    em.persist(usuario);
    em.persist(medico);
    await em.flush();

    return medico;
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
