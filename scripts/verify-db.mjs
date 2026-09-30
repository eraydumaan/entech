// Yalnızca kurgusal veri kullanır. Her çalıştırmada bir kalıcı kanıt kaydı bırakır.
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import pg from "pg";
import { normalizeDatabaseUrl } from "../src/lib/database-url.mjs";

const baseUrl = process.env.TEST_BASE_URL || "http://localhost:3000";
const email = `test-${randomUUID()}@example.com`;
const data = {
  name: "Deniz Örnek",
  email,
  service: "service-intake",
  description:
    "Kurgusal değerlendirme testi: servis taleplerini takip etmek istiyorum.",
};
const dbOptions = {
  connectionString: normalizeDatabaseUrl(process.env.DATABASE_URL),
  connectionTimeoutMillis: 10000,
  statement_timeout: 10000,
};
let reader;

async function post(input) {
  const response = await fetch(new URL("/api/requests", baseUrl), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
    signal: AbortSignal.timeout(20000),
  });
  return { status: response.status, body: await response.json() };
}

try {
  assert.ok(process.env.DATABASE_URL, "DATABASE_URL gerekli");
  const saved = await post(data);
  assert.equal(saved.status, 201, "Kayıt HTTP 201 dönmeli");
  assert.equal(saved.body.success, true);
  assert.ok(saved.body.id);

  // API havuzundan bağımsız bağlantı: kayıt gerçekten PostgreSQL'de mi?
  reader = new pg.Client(dbOptions);
  await reader.connect();
  const found = await reader.query(
    "SELECT id, name, email, service, description, created_at FROM service_requests WHERE id = $1",
    [saved.body.id],
  );
  assert.equal(found.rowCount, 1);
  for (const field of Object.keys(data))
    assert.equal(found.rows[0][field], data[field]);
  assert.ok(found.rows[0].created_at instanceof Date);
  await reader.end();

  // Bağlantı kapanıp yeniden açılsa da aynı kayıt okunabilmeli.
  reader = new pg.Client(dbOptions);
  await reader.connect();
  assert.equal(
    (
      await reader.query("SELECT id FROM service_requests WHERE id = $1", [
        saved.body.id,
      ])
    ).rowCount,
    1,
  );

  const invalid = await post({ ...data, name: "a".repeat(51) });
  assert.equal(invalid.status, 422);
  assert.equal(invalid.body.success, false);
  assert.equal(
    (
      await reader.query(
        "SELECT count(*)::int AS total FROM service_requests WHERE email = $1",
        [email],
      )
    ).rows[0].total,
    1,
  );

  // Sunucu atlatılsa bile DB, 51 karakterlik ismi reddetmeli.
  await reader.query("BEGIN");
  let rejected = false;
  try {
    await reader.query(
      "INSERT INTO service_requests (name, email, service, description) VALUES ($1, $2, $3, $4)",
      ["a".repeat(51), email, data.service, data.description],
    );
  } catch (error) {
    rejected = error.code === "23514";
  } finally {
    await reader.query("ROLLBACK");
  }
  assert.equal(rejected, true, "DB CHECK kısıtı 51 karakteri reddetmeli");
  console.log(
    JSON.stringify(
      {
        passed: true,
        recordId: saved.body.id,
        createdAt: found.rows[0].created_at,
        apiStatus: saved.status,
        independentRead: true,
        reconnectRead: true,
        invalidRequestNotInserted: true,
        databaseNameConstraint: true,
        retainedFictionalRecord: true,
      },
      null,
      2,
    ),
  );
} catch {
  console.error(
    "Entegrasyon kontrolü başarısız. API, bağlantı ve şema ayarlarını kontrol edin. Başarısız çalıştırma kurgusal kayıt bırakmış olabilir.",
  );
  process.exitCode = 1;
} finally {
  if (reader) await reader.end().catch(() => {});
}
