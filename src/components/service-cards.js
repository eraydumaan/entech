"use client";

import { useState } from "react";
import Icon from "./icon";

export default function ServiceCards({ services }) {
  const [selected, setSelected] = useState("");

  function choose(service) {
    setSelected(service.value);
    window.dispatchEvent(
      new CustomEvent("akis:service-selected", {
        detail: { value: service.value, label: service.subtitle },
      }),
    );
    document.querySelector("#talep")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  }

  return (
    <>
      <div className="service-grid">
        {services.map((service) => {
          const active = selected === service.value;
          return (
            <article
              className={`service-card ${active ? "selected" : ""}`}
              key={service.number}
            >
              <div className="service-card-top">
                <span className={`service-icon ${service.tone}`}>
                  <Icon name={service.icon} size={25} />
                </span>
                <span className="service-number">{service.number}</span>
              </div>
              <p className="service-subtitle">{service.subtitle}</p>
              <h3>{service.title}</h3>
              <p className="service-description">{service.text}</p>
              <div className="service-benefit">
                <Icon name="check" size={16} />
                <span>{service.benefit}</span>
              </div>
              <button
                className="service-action"
                type="button"
                aria-pressed={active}
                onClick={() => choose(service)}
              >
                {active ? "Forma eklendi" : "Bu hizmeti seç"}
                <span aria-hidden="true">{active ? " ✓" : " →"}</span>
              </button>
            </article>
          );
        })}
      </div>
      <p className="service-selection-status" aria-live="polite">
        {selected
          ? "Hizmet seçiminiz forma aktarıldı. Diğer bilgileri tamamlayabilirsiniz."
          : "Bir karttan hizmet seçtiğinizde seçim talep formuna otomatik aktarılır."}
      </p>
    </>
  );
}
