import { orm } from "../../shared/orm.js";
import { Service } from "../../shared/service.js";
import { NotFound, UserNotFounded } from "../../shared/errors.js";
import { Turnos } from "./turnos.entity.js";
import { ObjectId } from "mongodb";
import { Pacientes } from "../pacientes/pacientes.entity.js";
import { Medicos } from "../medicos/medicos.entity.js";

const em = orm.em;

export class TurnosService implements Service<Turnos> {
  public async findAll(): Promise<Turnos[] | undefined> {
    return await em.find(
      Turnos,
      {},
      {
        populate: [
          "medico",
          "paciente",
          "paciente.usuario",
          "medico.usuario",
          "medico.especialidad",
        ],
      }
    );
  }

  public async findOne(item: { id: string }): Promise<Turnos | undefined> {
    const turno = await em.findOne(
      Turnos,
      { _id: new ObjectId(item.id) },
      {
        populate: [
          "medico",
          "paciente",
          "paciente.usuario",
          "medico.usuario",
          "medico.especialidad",
        ],
      }
    );

    if (!turno) throw new NotFound(item.id);

    return turno;
  }

  public async findTurnosOcupadosByMedicoByDates(
    item: any
  ): Promise<Turnos[] | undefined> {
    console.log(item);
    const startDate = new Date(item.startDate).toISOString();
    const endDate = new Date(item.endDate).toISOString();
    const turnos = await em.find(Turnos, {
      fecha: {
        $gte: startDate,
        $lte: endDate,
      },
      medico: new ObjectId(item.medico),
    });

    return turnos;
  }

  public async findTurnosByPaciente(item: any): Promise<Turnos[] | undefined> {
    const paciente = await em.findOne(Pacientes, {
      usuario: new ObjectId(item.paciente),
    });

    if (!paciente) throw new NotFound(item.paciente);

    const turnos = await em.find(
      Turnos,
      {
        paciente: paciente,
      },
      { populate: ["medico.usuario", "medico.especialidad"] }
    );

    console.log(turnos);

    return turnos;
  }

  public async add(item: Turnos): Promise<Turnos | undefined> {
    const paciente = await em.findOne(Pacientes, {
      usuario: new ObjectId(item?.paciente?.id),
    });
    const medico = await em.findOne(Medicos, {
      _id: new ObjectId(item?.medico?.id),
    });

    console.log(item, paciente, medico);
    if (!paciente || !medico) throw new UserNotFounded();

    const turno = new Turnos();
    turno.fecha = item.fecha;
    turno.rango = item.rango;
    turno.paciente = paciente;
    turno.medico = medico;

    await em.persistAndFlush(turno);

    return turno;
  }

  public async update(item: Turnos): Promise<Turnos | undefined> {
    const turnoAActualizar = em.getReference(Turnos, new ObjectId(item.id));

    if (!turnoAActualizar) throw new NotFound(item.id);

    const turnoActualizado = em.assign(turnoAActualizar, item);
    await em.flush();

    return turnoActualizado;
  }

  public async remove(item: { id: string }): Promise<Turnos | undefined> {
    console.log(item.id);
    const turnoABorrar = await em.findOne(Turnos, {
      _id: new ObjectId(item.id),
    });

    if (!turnoABorrar) throw new NotFound(item.id);

    em.remove(turnoABorrar);
    await em.flush();

    return turnoABorrar;
  }
}
