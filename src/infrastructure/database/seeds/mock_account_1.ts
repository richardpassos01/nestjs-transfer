import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("accounts").del();

  await knex("accounts").insert([
    {
      id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',   
      balance: 10,
      user_id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    }
  ]);
}
