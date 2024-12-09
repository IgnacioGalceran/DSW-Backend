import { orm } from "../../shared/orm.js";
import { Service } from "../../shared/service.js";
import { NotFound, Repeated, UserNotFounded } from "../../shared/errors.js";
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
    const startDate = new Date(item.startDate);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(item.endDate);
    endDate.setHours(23, 59, 59, 999);

    const turnos = await em.find(Turnos, {
      fecha: {
        $gte: startDate.toISOString(),
        $lte: endDate.toISOString(),
      },
      medico: new ObjectId(item.medico),
    });

    console.log(turnos);

    return turnos;
  }

  public async findTurnosByPaciente(item: any): Promise<Turnos[] | undefined> {
    const paciente = await em.findOne(Pacientes, {
      usuario: new ObjectId(item.paciente),
    });

    if (!paciente) throw new NotFound(item.paciente);

    const now = new Date();

    const turnos = await em.find(
      Turnos,
      {
        paciente: paciente,
        fecha: {
          $gte: now.toISOString(),
        },
      },
      { populate: ["medico.usuario", "medico.especialidad"] }
    );

    console.log(turnos);

    return turnos;
  }

  public async findTurnosByMedico(item: any): Promise<Turnos[] | undefined> {
    const medico = await em.findOne(Medicos, {
      usuario: new ObjectId(item.medico),
    });

    if (!medico) throw new NotFound(item.medico);

    const turnos = await em.find(
      Turnos,
      {
        medico: medico,
      },
      { populate: ["paciente.usuario"] }
    );

    console.log(turnos);

    return turnos;
  }

  public async add(item: Turnos): Promise<Turnos | undefined> {
    await this.validateTurno(item);

    const paciente = await em.findOne(Pacientes, {
      usuario: new ObjectId(item?.paciente?.id),
    });
    const medico = await em.findOne(Medicos, {
      _id: new ObjectId(item?.medico?.id),
    });

    const turno = new Turnos();
    turno.fecha = item.fecha;
    turno.inicio = item.inicio.trim();
    turno.fin = item.fin.trim();
    turno.paciente = paciente!;
    turno.medico = medico!;

    await em.persistAndFlush(turno);

    return turno;
  }

  public async update(item: Turnos): Promise<Turnos | undefined> {
    const turnoAActualizar = await em.findOne(Turnos, new ObjectId(item.id));

    if (!turnoAActualizar) throw new NotFound(item.id);

    const { paciente, fecha, ...items } = item;

    await this.validateTurno(item, item.id);

    turnoAActualizar.fecha = item.fecha;
    turnoAActualizar.inicio = item.inicio.trim();
    turnoAActualizar.fin = item.fin.trim();

    await em.flush();

    return turnoAActualizar;
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

  private async validateTurno(
    item: Turnos,
    excludeTurnoId?: string
  ): Promise<void> {
    const paciente = await em.findOne(Pacientes, {
      usuario: new ObjectId(item?.paciente?.id),
    });
    const medico = await em.findOne(Medicos, {
      _id: new ObjectId(item?.medico?.id),
    });

    if (!paciente || !medico) throw new UserNotFounded();

    const inicio = item.inicio.trim();
    const fin = item.fin.trim();

    const existingTurnoMedico = await em.findOne(Turnos, {
      medico: medico,
      fecha: {
        $eq: item.fecha,
      },
      inicio: {
        $lt: fin,
      },
      fin: {
        $gt: inicio,
      },
      ...(excludeTurnoId ? { _id: { $ne: new ObjectId(excludeTurnoId) } } : {}),
    });

    const existingTurnoPaciente = await em.findOne(Turnos, {
      paciente: paciente,
      fecha: {
        $eq: item.fecha,
      },
      inicio: {
        $lt: fin,
      },
      fin: {
        $gt: inicio,
      },
      ...(excludeTurnoId ? { _id: { $ne: new ObjectId(excludeTurnoId) } } : {}),
    });

    if (existingTurnoMedico || existingTurnoPaciente) {
      throw new Repeated(
        "turno",
        `${item.fecha.toString().slice(0, 10)} y hora ${item.inicio} - ${
          item.fin
        }`
      );
    }
  }
}
