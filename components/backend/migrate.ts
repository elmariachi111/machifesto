/* eslint-disable no-console */

import { promises as fs } from "node:fs";
import * as path from "node:path";

import { FileMigrationProvider, Migrator } from "kysely";

import { db } from "./db";

// https://www.kysely.dev/docs/migrations#running-migrations
async function migrateToLatest() {
  const migrationFolder = path.join(__dirname, "migrations");

  console.log("migrating to latest...", migrationFolder);

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      migrationFolder,
      path,
    }),
  });

  const mig = await migrator.getMigrations();

  console.log("migrations", mig);

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === "Error") {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error("failed to migrate");
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

migrateToLatest();
