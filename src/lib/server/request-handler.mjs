import { validateRequest } from "../request-validation.mjs";

const MAX_BODY_BYTES = 16 * 1024;

function reply(status, body) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

// Kayıt fonksiyonu parametre olarak alınır; DB hata/bekleme davranışı bağımsız sınanabilir.
export async function handleRequest(request, saveRequest) {
  const contentType = request.headers
    .get("content-type")
    ?.split(";")[0]
    .trim()
    .toLowerCase();
  if (contentType !== "application/json") {
    return reply(415, {
      success: false,
      message: "JSON biçiminde bir talep gönderin.",
    });
  }

  let input;
  try {
    // Content-Length başlığına güvenmeden gerçek gelen byte sayısını sınırla.
    const reader = request.body?.getReader();
    const chunks = [];
    let size = 0;
    if (reader) {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          size += value.byteLength;
          if (size > MAX_BODY_BYTES) {
            await reader.cancel();
            return reply(413, {
              success: false,
              message: "Talep boyutu çok büyük.",
            });
          }
          chunks.push(value);
        }
      } finally {
        reader.releaseLock();
      }
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    input = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
  } catch {
    return reply(400, { success: false, message: "Talep verisi okunamadı." });
  }

  const validated = validateRequest(input);
  if (!validated.success) {
    return reply(422, {
      success: false,
      message: "Lütfen işaretli alanları kontrol edin.",
      errors: validated.errors,
    });
  }

  try {
    const saved = await saveRequest(validated.data);
    if (!saved?.id) throw new Error("Missing record id");
    return reply(201, {
      success: true,
      id: saved.id,
      message: "Talebiniz kaydedildi.",
    });
  } catch {
    // Kişisel verileri, bağlantı adresini ve DB hata ayrıntılarını loga/yanıta yazma.
    console.error("Talep kaydı tamamlanamadı.");
    return reply(503, {
      success: false,
      message:
        "Kaydınızın tamamlandığını doğrulayamadık. Lütfen daha sonra tekrar deneyin.",
    });
  }
}
