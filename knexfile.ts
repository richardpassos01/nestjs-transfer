import type { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './src/infrastructure/database/migrations',
    },
    seeds: {
      directory: './src/infrastructure/database/seeds',
    },
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: './test.sqlite3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './src/infrastructure/database/migrations',
    },
    seeds: {
      directory: './src/infrastructure/database/seeds',
    },
  },
};

export default config;
