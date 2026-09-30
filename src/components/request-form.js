"use client";

import { useEffect, useRef, useState } from "react";
import {
  FIELD_LIMITS,
  SERVICES,
  validateRequest,
} from "@/lib/request-validation.mjs";

const INITIAL_VALUES = { name: "", email: "", service: "", description: "" };

export default function RequestForm() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const submitting = useRef(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (status !== "error") return;
    const first = Object.keys(INITIAL_VALUES).find((field) => errors[field]);
    if (first) formRef.current?.elements.namedItem(first)?.focus();
  }, [errors, status]);
  function change(event) {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
    if (status !== "idle") {
      setStatus("idle");
      setMessage("");
    }
  }

  async function submit(event) {
    event.preventDefault();
    if (submitting.current) return;
    const validated = validateRequest(values);
    if (!validated.success) {
      setErrors(validated.errors);
      setStatus("error");
      setMessage("Lütfen işaretli alanları kontrol edin.");

      return;
    }

    submitting.current = true;
    setErrors({});
    setStatus("submitting");
    setMessage("Talebiniz gönderiliyor…");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated.data),
        signal: controller.signal,
      });
      const result = await response.json();
      if (response.status !== 201 || result.success !== true || !result.id) {
        if (response.status === 422 && result.errors) {
          setErrors(result.errors);
        }
        setStatus("error");
        setMessage(
          response.status === 422
            ? "Lütfen işaretli alanları kontrol edin."
            : "Kaydınızın tamamlandığını doğrulayamadık. Bilgileriniz korunuyor; lütfen daha sonra tekrar deneyin.",
        );
        return;
      }
      setStatus("success");
      setMessage(
        `Talebiniz kaydedildi. Talep numaranız: ${result.id}. Bu bir değerlendirme demosudur; gerçek hizmet veya e-posta gönderimi yapılmaz.`,
      );
      setValues(INITIAL_VALUES);
    } catch {
      setStatus("error");
      setMessage(
        "Sunucudan kayıt onayı alınamadı. Bilgileriniz korunuyor. Bağlantınızı kontrol edin; tekrar gönderim ikinci bir kayıt oluşturabilir.",
      );
    } finally {
      clearTimeout(timeout);
      submitting.current = false;
    }
  }

  const pending = status === "submitting";
  function accessibility(field, hint) {
    return {
      "aria-invalid": Boolean(errors[field]),
      "aria-describedby":
        [hint, errors[field] ? `${field}-error` : null]
          .filter(Boolean)
          .join(" ") || undefined,
    };
  }

  return (
    <form
      ref={formRef}
      onSubmit={submit}
      noValidate
      aria-labelledby="request-title"
      aria-busy={pending}
    >
      <fieldset disabled={pending}>
        <legend className="sr-only">
          Talep bilgileri — tüm alanlar zorunludur
        </legend>
        <div className="form-row">
          <div className="field">
            <label htmlFor="request-name">İsim</label>
            <input
              id="request-name"
              name="name"
              autoComplete="name"
              required
              value={values.name}
              onChange={change}
              {...accessibility("name", "name-hint")}
            />
            <span className="hint" id="name-hint">
              2–{FIELD_LIMITS.name.max} karakter. Kurgusal bir isim kullanın.
            </span>
            {errors.name && (
              <p className="field-error" id="name-error">
                {errors.name}
              </p>
            )}
          </div>
          <div className="field">
            <label htmlFor="request-email">E-posta</label>
            <input
              id="request-email"
              type="email"
              name="email"
              autoComplete="email"
              required
              value={values.email}
              onChange={change}
              {...accessibility("email", "email-hint")}
            />
            <span className="hint" id="email-hint">
              Örnek: deniz@example.com
            </span>
            {errors.email && (
              <p className="field-error" id="email-error">
                {errors.email}
              </p>
            )}
          </div>
        </div>
        <div className="field">
          <label htmlFor="request-service">İlgilendiğiniz hizmet</label>
          <select
            id="request-service"
            name="service"
            required
            value={values.service}
            onChange={change}
            {...accessibility("service")}
          >
            <option value="">Bir hizmet seçin</option>
            {SERVICES.map((service) => (
              <option key={service.value} value={service.value}>
                {service.label}
              </option>
            ))}
          </select>
          {errors.service && (
            <p className="field-error" id="service-error">
              {errors.service}
            </p>
          )}
        </div>
        <div className="field">
          <label htmlFor="request-description">
            Neyi kolaylaştırmak istiyorsunuz?
          </label>
          <textarea
            id="request-description"
            name="description"
            rows={5}
            required
            value={values.description}
            onChange={change}
            {...accessibility("description", "description-hint")}
          />
          <span className="hint" id="description-hint">
            10–{FIELD_LIMITS.description.max} karakter. İş akışınızı kurgusal
            bilgilerle anlatın. ({Array.from(values.description).length}/
            {FIELD_LIMITS.description.max})
          </span>
          {errors.description && (
            <p className="field-error" id="description-error">
              {errors.description}
            </p>
          )}
        </div>
        <button className="button" type="submit" disabled={pending}>
          {pending ? "Gönderiliyor…" : "Talep gönder"}
          <span aria-hidden="true"> →</span>
        </button>
      </fieldset>
      <div
        className={`form-status ${status}`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {message}
      </div>
    </form>
  );
}
