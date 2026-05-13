import 'dotenv/config';
import { Client } from 'pg';

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getSchemaName(): string {
  const schema = getRequiredEnv('DB_SCHEMA');

  if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(schema)) {
    throw new Error(`Invalid schema name: ${schema}`);
  }

  return schema;
}

async function ensureSchema(): Promise<void> {
  const client = new Client({
    host: getRequiredEnv('DB_HOST'),
    port: Number(getRequiredEnv('DB_PORT')),
    database: getRequiredEnv('DB_DATABASE'),
    user: getRequiredEnv('DB_USERNAME'),
    password: getRequiredEnv('DB_PASSWORD'),
  });

  const schema = getSchemaName();

  await client.connect();

  try {
    await client.query(`CREATE SCHEMA IF NOT EXISTS "${schema}"`);
  } finally {
    await client.end();
  }
}

ensureSchema().catch((error) => {
  console.error(error);
  process.exit(1);
});
