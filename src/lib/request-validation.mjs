// Bu modül hem tarayıcıda hem sunucuda kullanılır; gizli bilgi içermez.
export const SERVICES = Object.freeze([
  { value: "service-intake", label: "Servis talebi toplama" },
  { value: "task-tracking", label: "Görev atama ve hatırlatma" },
  { value: "reporting", label: "Haftalık iş raporlama" },
]);

export const FIELD_LIMITS = Object.freeze({
  name: { min: 2, max: 50 },
  email: { max: 254 },
  description: { min: 10, max: 2000 },
});

// PostgreSQL char_length ile uyumlu olarak Unicode karakterlerini sayar.
function length(value) {
  return Array.from(value).length;
}

export function validateRequest(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { success: false, errors: { form: "Geçerli bir talep gönderin." } };
  }

  const errors = {};
  const data = {};

  for (const field of ["name", "email", "service", "description"]) {
    if (typeof input[field] !== "string") {
      errors[field] = "Bu alan metin olarak doldurulmalıdır.";
      data[field] = "";
    } else {
      data[field] = input[field].trim();
    }
  }

  if (
    !errors.name &&
    (length(data.name) < FIELD_LIMITS.name.min ||
      length(data.name) > FIELD_LIMITS.name.max)
  ) {
    errors.name = "İsim 2–50 karakter olmalıdır.";
  }

  // Biçim kontrolüdür; adresin var olduğunu veya kullanıcıya ait olduğunu kanıtlamaz.
  if (
    !errors.email &&
    (length(data.email) > FIELD_LIMITS.email.max ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(data.email))
  ) {
    errors.email = "Geçerli bir e-posta adresi girin.";
  }

  if (
    !errors.service &&
    !SERVICES.some((service) => service.value === data.service)
  ) {
    errors.service = "Listeden bir hizmet seçin.";
  }

  if (
    !errors.description &&
    (length(data.description) < FIELD_LIMITS.description.min ||
      length(data.description) > FIELD_LIMITS.description.max)
  ) {
    errors.description = "Açıklama 10–2000 karakter olmalıdır.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  // Bilinmeyen alanlar taşınmaz; yalnızca izin verilen dört alan döner.
  return { success: true, data };
}
