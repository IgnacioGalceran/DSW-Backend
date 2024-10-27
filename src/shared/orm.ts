import { MikroORM } from "@mikro-orm/mongodb";
import { MongoHighlighter } from "@mikro-orm/mongo-highlighter";
import dotenv from "dotenv";
dotenv.config();

export const orm = await MikroORM.init({
  entities: ["dist/**/*.entity.js"],
  entitiesTs: ["dist/**/*.entity.ts"],
  dbName: "turnos-medicos",
  clientUrl: process.env.db_url,
  highlighter: new MongoHighlighter(),
  debug: false,
  schemaGenerator: {
    //never in production
    disableForeignKeys: true,
    createForeignKeyConstraints: true,
    ignoreSchema: [],
  },
});
