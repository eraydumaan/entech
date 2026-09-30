import test from "node:test";
import assert from "node:assert/strict";
import { handleRequest } from "../src/lib/server/request-handler.mjs";

const valid = {
  name: "Deniz Örnek",
  email: "deniz@example.com",
  service: "reporting",
  description: "Kurgusal haftalık rapor talebi.",
};
const request = (body, contentType = "application/json") =>
  new Request("http://localhost/api/requests", {
    method: "POST",
    headers: { "Content-Type": contentType },
    body,
  });

test("Geçersiz JSON, içerik türü ve büyük gövde DB'ye ulaşmaz", async () => {
  let calls = 0;
  const save = async () => {
    calls++;
    return { id: "1" };
  };
  for (const [body, type, status] of [
    ["{", "application/json", 400],
    ["hello", "text/plain", 415],
    ["a".repeat(16385), "application/json", 413],
  ]) {
    assert.equal(
      (await handleRequest(request(body, type), save)).status,
      status,
    );
  }
  assert.equal(calls, 0);
});

test("51 karakterlik isim sunucuda reddedilir ve kayıt çağrılmaz", async () => {
  let calls = 0;
  const response = await handleRequest(
    request(JSON.stringify({ ...valid, name: "a".repeat(51) })),
    async () => {
      calls++;
    },
  );
  assert.equal(response.status, 422);
  assert.ok((await response.json()).errors.name);
  assert.equal(calls, 0);
});

test("Kayıt tamamlanmadan başarı yanıtı dönmez", async () => {
  let finish;
  let started;
  const entered = new Promise((resolve) => {
    started = resolve;
  });
  const saved = new Promise((resolve) => {
    finish = resolve;
  });
  let responded = false;
  const pending = handleRequest(
    request(JSON.stringify(valid)),
    async (data) => {
      assert.deepEqual(data, valid);
      started();
      return saved;
    },
  ).then((response) => {
    responded = true;
    return response;
  });
  await entered;
  assert.equal(responded, false);
  finish({ id: "42" });
  const response = await pending;
  assert.equal(response.status, 201);
  assert.deepEqual(await response.json(), {
    success: true,
    id: "42",
    message: "Talebiniz kaydedildi.",
  });
});

test("Veritabanı hatasında başarı dönmez ve gizli hata ayrıntısı sızmaz", async () => {
  const response = await handleRequest(
    request(JSON.stringify(valid)),
    async () => {
      throw new Error("SECRET_DATABASE_PASSWORD");
    },
  );
  assert.equal(response.status, 503);
  const body = await response.json();
  assert.equal(body.success, false);
  assert.equal(
    JSON.stringify(body).includes("SECRET_DATABASE_PASSWORD"),
    false,
  );
});

test("Kayıt kimliği olmayan sonuç başarı sayılmaz", async () => {
  const response = await handleRequest(
    request(JSON.stringify(valid)),
    async () => ({}),
  );
  assert.equal(response.status, 503);
  assert.equal((await response.json()).success, false);
});
