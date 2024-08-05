import { EntityManager, ObjectId } from "@mikro-orm/mongodb";
import { orm } from "../shared/orm.js";
import { Especialidades } from "../entities/especialidades/especialidades.entity.js";
import { listaEspecialidades } from "./Especialidades/data.js";

const em: EntityManager = orm.em;

export const seeder = async () => {
  const especialidadesCount = await em.count(Especialidades);

  if (especialidadesCount === 0) {
    const emFork = em.fork();

    const especialidadesInsertadas = await emFork.insertMany(
      Especialidades,
      listaEspecialidades
    );
  }
};
