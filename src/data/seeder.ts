import { EntityManager, ObjectId } from "@mikro-orm/mongodb";
import { orm } from "../shared/orm.js";
import { Pacientes } from "../entities/pacientes/pacientes.entity.js";
import { Especialidades } from "../entities/especialidades/especialidades.entity.js";
import { Medicos } from "../entities/medicos/medicos.entity.js";
import { listaPacientes } from "./Pacientes/data.js";
import { listaMedicos } from "./Medicos/data.js";
import { listaEspecialidades } from "./Especialidades/data.js";

const em: EntityManager = orm.em;

export const seeder = async () => {
  const pacientesCount = await em.count(Pacientes);
  const medicosCount = await em.count(Medicos);
  const especialidadesCount = await em.count(Especialidades);

  if (pacientesCount === 0) {
    await em.insertMany(Pacientes, listaPacientes);
  }

  if (especialidadesCount === 0 && medicosCount === 0) {
    const emFork = em.fork();

    const especialidadesInsertadas = await emFork.insertMany(
      Especialidades,
      listaEspecialidades
    );

    await Promise.all(
      listaMedicos.map(async (medico: Medicos, index: number) => {
        if (!medico.especialidad) {
          const especialidad = await emFork.findOne(Especialidades, {
            _id: new ObjectId(especialidadesInsertadas[index]),
          });
          medico.especialidad = especialidad;
        }
      })
    );

    await emFork.insertMany(Medicos, listaMedicos);
  }
};
