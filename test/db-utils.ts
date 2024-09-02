import Knex from "knex";
import knexConfig from "../knexfile";

const config = knexConfig["test"];
const knex = Knex(config);

export async function resetDatabase() {
  await knex.migrate.rollback();

  await knex.migrate.latest();
}

export async function runSeeds() {
  const seedFiles = ["../src/infrastructure/database/seeds/mock_account_1.ts"];

  for (const file of seedFiles) {
    const seed = require(file);
    await seed.seed(knex);
  }
}

export async function closeDatabase() {
  await knex.destroy();
}

export default knex;
