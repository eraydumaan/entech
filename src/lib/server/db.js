import "server-only";
import pg from "pg";
import { normalizeDatabaseUrl } from "../database-url.mjs";

function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured");
  }

  // Geliştirmede yeniden derleme sırasında ek havuz açılmasını önler.
  if (!globalThis.akisPool) {
    const pool = new pg.Pool({
      connectionString: normalizeDatabaseUrl(process.env.DATABASE_URL),
      max: 5,
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 10000,
      statement_timeout: 10000,
    });
    pool.on("error", () => {
      console.error("PostgreSQL havuz bağlantısı hatası.");
    });
    globalThis.akisPool = pool;
  }
  return globalThis.akisPool;
}

export async function saveRequest(data) {
  const result = await getPool().query(
    `INSERT INTO service_requests (name, email, service, description)
     VALUES ($1, $2, $3, $4)
     RETURNING id`,
    [data.name, data.email, data.service, data.description],
  );
  if (result.rowCount !== 1 || !result.rows[0]?.id) {
    throw new Error("Insert did not return a saved request");
  }
  return { id: String(result.rows[0].id) };
}
