import test from "node:test";
import assert from "node:assert/strict";
import { validateRequest, SERVICES } from "../src/lib/request-validation.mjs";

const valid = {
  name: "Deniz Örnek",
  email: "deniz@example.com",
  service: "service-intake",
  description: "Kurgusal servis taleplerini takip etmek istiyorum.",
};

test("Geçerli kurgusal talep kabul edilir, boşluklar temizlenir ve ek alanlar atılır", () => {
  const result = validateRequest({
    ...valid,
    name: "  Deniz Örnek  ",
    email: " deniz@example.com ",
    admin: true,
  });
  assert.deepEqual(result, { success: true, data: valid });
});

test("Tanımlanmış üç hizmet de kabul edilir", () => {
  for (const { value } of SERVICES) {
    assert.equal(validateRequest({ ...valid, service: value }).success, true);
  }
});

test("Nesne olmayan girdiler hata fırlatmadan reddedilir", () => {
  for (const input of [null, undefined, [], "text", 42, true]) {
    assert.equal(validateRequest(input).success, false);
  }
});

test("Eksik, yanlış tipte ve yalnızca boşluk içeren alanlar reddedilir", () => {
  for (const field of Object.keys(valid)) {
    for (const value of [undefined, null, 123, {}, [], "   "]) {
      const result = validateRequest({ ...valid, [field]: value });
      assert.equal(result.success, false);
      assert.ok(result.errors[field]);
    }
  }
});

test("Geçersiz e-posta biçimleri reddedilir", () => {
  for (const email of [
    "deniz",
    "deniz@",
    "@example.com",
    "a@@example.com",
    "a b@example.com",
    "a@example",
  ]) {
    assert.ok(validateRequest({ ...valid, email }).errors.email);
  }
});

test("E-posta 254 karakterde kabul edilir, 255 karakterde reddedilir", () => {
  const email = `${"a".repeat(64)}@${"b".repeat(63)}.${"c".repeat(63)}.${"d".repeat(61)}`;
  assert.equal(email.length, 254);
  assert.equal(validateRequest({ ...valid, email }).success, true);
  assert.ok(validateRequest({ ...valid, email: `a${email}` }).errors.email);
});

test("Tarayıcı dışından gönderilen bilinmeyen hizmet reddedilir", () => {
  assert.ok(
    validateRequest({ ...valid, service: "unknown-service" }).errors.service,
  );
});

test("İsim ve açıklamanın alt/üst sınırları uygulanır", () => {
  for (const [field, min, max] of [
    ["name", 2, 50],
    ["description", 10, 2000],
  ]) {
    for (const count of [min, max]) {
      assert.equal(
        validateRequest({ ...valid, [field]: "a".repeat(count) }).success,
        true,
      );
    }
    for (const count of [min - 1, max + 1]) {
      assert.ok(
        validateRequest({ ...valid, [field]: "a".repeat(count) }).errors[field],
      );
    }
  }
});

test("Türkçe harfler, apostrof ve tire içeren isimler kabul edilir", () => {
  assert.equal(
    validateRequest({ ...valid, name: "Çağrı O'Örnek-Deneme" }).success,
    true,
  );
});

test("Unicode uzunluğu veritabanı karakter sayımıyla tutarlı tutulur", () => {
  assert.equal(
    validateRequest({ ...valid, description: "🔧".repeat(10) }).success,
    true,
  );
  assert.ok(
    validateRequest({ ...valid, description: "🔧".repeat(9) }).errors
      .description,
  );
});

test("Hatalar birlikte döner ve başarısız sonuçta kayıt verisi verilmez", () => {
  const result = validateRequest({
    name: "",
    email: "",
    service: "",
    description: "",
  });
  assert.deepEqual(
    Object.keys(result.errors).sort(),
    Object.keys(valid).sort(),
  );
  assert.equal(Object.hasOwn(result, "data"), false);
});
