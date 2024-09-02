import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("transfers", (table) => {
    table.uuid("id").primary();
    table.string("external_id").notNullable();
    table.uuid("source_account_id").notNullable();
    table.uuid("destination_account_id").notNullable();
    table.decimal("amount", 15, 2).notNullable();
    table.timestamp("transaction_date").notNullable();

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("transfers");
}
