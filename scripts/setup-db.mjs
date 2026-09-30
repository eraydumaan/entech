import { readFile } from "node:fs/promises";
import pg from "pg";
import { normalizeDatabaseUrl } from "../src/lib/database-url.mjs";

const client = new pg.Client({
  connectionString: normalizeDatabaseUrl(process.env.DATABASE_URL),
  connectionTimeoutMillis: 10000,
  statement_timeout: 15000,
});

try {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
  await client.connect();
  const existing = await client.query(
    "SELECT to_regclass('public.service_requests') AS name",
  );
  if (existing.rows[0].name) {
    console.log(
      "service_requests zaten var; şema değiştirilmedi. Şema değişiklikleri için yeni migration gerekir.",
    );
  } else {
    const sql = await readFile(
      new URL(
        "../db/migrations/001_create_service_requests.sql",
        import.meta.url,
      ),
      "utf8",
    );
    await client.query(sql);
    console.log("001 migration uygulandı: service_requests oluşturuldu.");
  }
} catch {
  await client.query("ROLLBACK").catch(() => {});
  console.error(
    "Şema kurulamadı. DATABASE_URL, bağlantı ve tablo yetkilerini kontrol edin. Gizli bağlantı bilgileri yazdırılmadı.",
  );
  process.exitCode = 1;
} finally {
  await client.end().catch(() => {});
}
