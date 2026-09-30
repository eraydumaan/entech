"use client";

import { useState } from "react";
import Icon from "./icon";

const PREVIEW_VIEWS = {
  overview: {
    copy: [
      "HER ŞEY YOLUNDA",
      "İşinize genel bir bakış",
      "Ekibinizin bugünkü iş akışı, tek ekranda.",
    ],
    metrics: [
      ["Açık talepler", "12", "+2 yeni"],
      ["Devam eden", "5", "Planlandı"],
      ["Tamamlanan", "8", "Bugün"],
    ],
  },
  requests: {
    copy: [
      "TALEP MERKEZİ",
      "Öncelikler artık net",
      "Yeni ve bekleyen talepleri aynı yerden izleyin.",
    ],
    metrics: [
      ["Yeni talepler", "7", "Son 24 saat"],
      ["Yanıt bekleyen", "3", "Takipte"],
      ["Öncelikli", "2", "Bugün"],
    ],
  },
  schedule: {
    copy: [
      "HAFTALIK PLAN",
      "İş yükü dengede",
      "Sorumluları ve sıradaki adımları birlikte görün.",
    ],
    metrics: [
      ["Planlanan", "8", "Bu hafta"],
      ["Devam eden", "3", "Ekipte"],
      ["Tamamlanan", "5", "Zamanında"],
    ],
  },
};

export default function ProductPreview() {
  const [activeView, setActiveView] = useState("overview");
  const view = PREVIEW_VIEWS[activeView];
  const [kicker, title, description] = view.copy;

  return (
    <figure
      className="product-preview"
      aria-label="Akış ürün konsepti: sekmelerle değişen örnek talepler, görev durumları ve iş özeti."
    >
      <div className="preview-glow" aria-hidden="true" />
      <div className="dashboard">
        <div className="dashboard-top">
          <span className="mini-brand">
            <span className="brand-mark">a</span> akış
            <span className="workspace-tag">WORKSPACE</span>
          </span>
          <span className="dashboard-tools">
            <Icon name="bell" size={15} />
            <span className="avatar">DÖ</span>
          </span>
        </div>
        <div className="dashboard-body">
          <div className="dashboard-sidebar" aria-label="Ürün önizlemesi bölümleri">
            <span className="sidebar-label">ÇALIŞMA ALANI</span>
            <button
              type="button"
              className={`sidebar-item ${activeView === "overview" ? "selected" : ""}`}
              aria-pressed={activeView === "overview"}
              onClick={() => setActiveView("overview")}
            >
              <Icon name="grid" size={15} /> Genel bakış
            </button>
            <button
              type="button"
              className={`sidebar-item ${activeView === "requests" ? "selected" : ""}`}
              aria-pressed={activeView === "requests"}
              onClick={() => setActiveView("requests")}
            >
              <Icon name="inbox" size={15} /> Talepler
            </button>
            <button
              type="button"
              className={`sidebar-item ${activeView === "schedule" ? "selected" : ""}`}
              aria-pressed={activeView === "schedule"}
              onClick={() => setActiveView("schedule")}
            >
              <Icon name="calendar" size={15} /> İş planı
            </button>
            <span className="sidebar-item">
              <Icon name="users" size={15} /> Ekibim
            </span>
            <span className="sidebar-item">
              <Icon name="chart" size={15} /> Raporlar
            </span>
            <div className="sidebar-bottom">
              <span className="online-dot" /> Örnek çalışma alanı
            </div>
          </div>
          <div className="dashboard-content">
            <div className="dashboard-heading">
              <div>
                <span className="dashboard-kicker">{kicker}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              <span className="mock-date">
                <Icon name="calendar" size={12} /> Bugün
              </span>
            </div>
            <div className="metric-grid">
              <div>
                <span className="metric-icon blue">
                  <Icon name="inbox" size={15} />
                </span>
                <span>{view.metrics[0][0]}</span>
                <strong>
                  {view.metrics[0][1]}<small>{view.metrics[0][2]}</small>
                </strong>
              </div>
              <div>
                <span className="metric-icon amber">
                  <Icon name="clock" size={15} />
                </span>
                <span>{view.metrics[1][0]}</span>
                <strong>
                  {view.metrics[1][1]}<small>{view.metrics[1][2]}</small>
                </strong>
              </div>
              <div>
                <span className="metric-icon teal">
                  <Icon name="check" size={15} />
                </span>
                <span>{view.metrics[2][0]}</span>
                <strong>
                  {view.metrics[2][1]}<small>{view.metrics[2][2]}</small>
                </strong>
              </div>
            </div>
            <div className="mock-table">
              <div className="mock-table-heading">
                <strong>Son servis talepleri</strong>
                <span>Tüm talepler ↗</span>
              </div>
              <div className="mock-row mock-labels">
                <span>TALEP / MÜŞTERİ</span>
                <span>DURUM</span>
                <span>ATANAN</span>
              </div>
              <div className="mock-row">
                <div className="mock-job">
                  <span className="job-icon blue">
                    <Icon name="tool" size={15} />
                  </span>
                  <span>
                    <strong>Klima bakımı</strong>
                    <small>Deniz Örnek · #1042</small>
                  </span>
                </div>
                <span className="status-pill amber">Bekliyor</span>
                <span className="mini-avatar">—</span>
              </div>
              <div className="mock-row">
                <div className="mock-job">
                  <span className="job-icon violet">
                    <Icon name="tool" size={15} />
                  </span>
                  <span>
                    <strong>Kombi arızası</strong>
                    <small>Ekin Örnek · #1041</small>
                  </span>
                </div>
                <span className="status-pill blue">Atandı</span>
                <span className="mini-avatar violet">AÖ</span>
              </div>
              <div className="mock-row">
                <div className="mock-job">
                  <span className="job-icon teal">
                    <Icon name="tool" size={15} />
                  </span>
                  <span>
                    <strong>Periyodik bakım</strong>
                    <small>Can Örnek · #1040</small>
                  </span>
                </div>
                <span className="status-pill teal">Tamamlandı</span>
                <span className="mini-avatar blue">SÖ</span>
              </div>
            </div>
            <div className="mock-week">
              <div>
                <strong>Haftalık iş akışı</strong>
                <span>Örnek tamamlanan işler</span>
              </div>
              <div className="mini-chart">
                {[38, 62, 46, 80, 58, 95, 70].map((height, i) => (
                  <div key={i}>
                    <i style={{ height: `${height}%` }} />
                    <span>{["P", "S", "Ç", "P", "C", "C", "P"][i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="preview-notification notification-top" aria-hidden="true">
        <span className="notification-icon">
          <Icon name="check" size={18} />
        </span>
        <div>
          <strong>Yeni talep kayda alındı</strong>
          <span>Klima bakımı · az önce</span>
        </div>
        <span className="notification-dot" />
      </div>
      <div
        className="preview-notification notification-bottom"
        aria-hidden="true"
      >
        <span className="notification-icon blue">
          <Icon name="users" size={18} />
        </span>
        <div>
          <strong>Doğru iş, doğru kişide.</strong>
          <span>Görev, Ali Örnek’e atandı.</span>
        </div>
        <span className="tiny-avatars">
          <b>A</b>
          <b>S</b>
        </span>
      </div>
      <figcaption>
        <span className="concept-dot" /> Etkileşimli ürün konsepti · Kurgusal örnek veriler
      </figcaption>
    </figure>
  );
}
