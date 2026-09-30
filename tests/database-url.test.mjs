import test from "node:test";
import assert from "node:assert/strict";
import { normalizeDatabaseUrl } from "../src/lib/database-url.mjs";

test("Neon sslmode=require açık verify-full davranışına dönüştürülür", () => {
  assert.equal(
    normalizeDatabaseUrl(
      "postgresql://user:secret@example.test/db?sslmode=require&channel_binding=require",
    ),
    "postgresql://user:secret@example.test/db?sslmode=verify-full&channel_binding=require",
  );
});

test("Diğer bağlantı parametreleri ve verify-full değişmeden kalır", () => {
  const value =
    "postgresql://user:secret@example.test/db?sslmode=verify-full&pool=true";
  assert.equal(normalizeDatabaseUrl(value), value);
  assert.equal(normalizeDatabaseUrl(undefined), undefined);
});
