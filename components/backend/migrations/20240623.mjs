//import { Kysely, sql } from "kysely";
//import { Database } from "../dbschema";

/**
 * @param db Kysely<Database>
 */
export async function up(db) {
  await db.schema
    .alterTable("signers")
    .dropColumn("message_signature")
    .addColumn("attestation", "jsonb")
    .execute();
}

/**
 * @param db Kysely<Database>
 */
export async function down(db) {
  await db.schema.alterTable("signers").dropColumn("attestation");
}
