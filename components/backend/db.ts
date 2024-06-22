import { Pool } from "pg";
import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely";

import { Database } from "./dbschema"; // this is the Database interface we defined earlier

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.POSTGRES_URL,
  }),
});

export const db = new Kysely<Database>({
  dialect,
  plugins: [new CamelCasePlugin()],
});
