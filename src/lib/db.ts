import { Pool } from 'pg';

declare global {
  // eslint-disable-next-line no-var
  var __pgPool: Pool | undefined;
  // eslint-disable-next-line no-var
  var __pgSchemaReady: Promise<void> | undefined;
}

export function getPool(): Pool {
  if (!global.__pgPool) {
    global.__pgPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });
  }
  return global.__pgPool;
}

async function ensureSchema(pool: Pool): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS cms_data (
      key TEXT PRIMARY KEY,
      value JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);
}

async function ready(): Promise<Pool> {
  const pool = getPool();
  if (!global.__pgSchemaReady) {
    global.__pgSchemaReady = ensureSchema(pool);
  }
  await global.__pgSchemaReady;
  return pool;
}

export async function getValue<T>(key: string): Promise<T | undefined> {
  const pool = await ready();
  const result = await pool.query('SELECT value FROM cms_data WHERE key = $1', [key]);
  return result.rows[0]?.value as T | undefined;
}

export async function setValue<T>(key: string, value: T): Promise<void> {
  const pool = await ready();
  await pool.query(
    `INSERT INTO cms_data (key, value, updated_at)
     VALUES ($1, $2, now())
     ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = now()`,
    [key, JSON.stringify(value)]
  );
}
