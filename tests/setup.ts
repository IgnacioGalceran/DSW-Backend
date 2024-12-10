import { MongoMemoryServer } from "mongodb-memory-server";
import { MikroORM, defineConfig } from "@mikro-orm/core";
import { MongoDriver } from "@mikro-orm/mongodb";
import { MongoEntityManager } from "@mikro-orm/mongodb";
import { Turnos } from "../src/entities/turnos/turnos.entity";
import { Pacientes } from "../src/entities/pacientes/pacientes.entity";
import { Medicos } from "../src/entities/medicos/medicos.entity";
import { Usuarios } from "../src/auth/usuarios.entity";

let mongoServer: MongoMemoryServer;
export let orm: MikroORM<MongoDriver>;
export let em: MongoEntityManager;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri() + "testdb";
  console.log("MongoDB URI:", mongoUri);

  const config = defineConfig({
    clientUrl: mongoUri,
    entities: [Turnos, Pacientes, Medicos, Usuarios],
    debug: false,
    driver: MongoDriver,
  });

  orm = await MikroORM.init<MongoDriver>(config);
});

afterAll(async () => {
  if (orm) {
    await orm.close();
  }
  if (mongoServer) {
    await mongoServer.stop();
  }
});

beforeEach(async () => {
  await orm.getSchemaGenerator().refreshDatabase();
});
