import { sql } from "kysely";

export async function up(db) {
  await db.schema
    .createTable("signers")
    .addColumn("id", "uuid", (column) =>
      column.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("user_name", "varchar(255)")
    .addColumn("profile_picture_url", "varchar(1000)")
    .addColumn("twitter_handle", "varchar(255)")
    .addColumn("twitter_id", "varchar(255)", (c) => c.unique())
    .addColumn("repost_url", "varchar(255)")
    .addColumn("ethereum_address", "varchar(255)", (c) => c.unique())
    .addColumn("message_signature", "varchar(255)")
    .addColumn("created_at", "timestamptz", (c) =>
      c.defaultTo(sql`current_timestamp`),
    )

    .execute();
}

export async function down(db) {
  await db.schema.dropTable("signers").execute();
}
