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
    table: ["Son servis talepleri", "Tüm talepler ↗"],
    rows: [
      ["Klima bakımı", "Deniz Örnek · #1042", "Bekliyor", "amber", "—", "blue"],
      ["Kombi arızası", "Ekin Örnek · #1041", "Atandı", "blue", "AÖ", "violet"],
      ["Periyodik bakım", "Can Örnek · #1040", "Tamamlandı", "teal", "SÖ", "teal"],
    ],
    chart: [38, 62, 46, 80, 58, 95, 70],
    chartCopy: ["Haftalık iş akışı", "Örnek tamamlanan işler"],
    notification: ["Yeni talep kayda alındı", "Klima bakımı · az önce"],
    assignment: ["Doğru iş, doğru kişide.", "Görev, Ali Örnek’e atandı."],
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
    table: ["Öncelikli talepler", "Filtrele ↗"],
    rows: [
      ["Acil klima arızası", "Ada Örnek · #1051", "Yeni", "blue", "—", "blue"],
      ["Parça onayı", "Mert Örnek · #1048", "Yanıt bekliyor", "amber", "DÖ", "violet"],
      ["Bakım sözleşmesi", "Ece Örnek · #1045", "İncelemede", "violet", "SÖ", "teal"],
    ],
    chart: [72, 48, 88, 55, 92, 66, 84],
    chartCopy: ["Talep yoğunluğu", "Son yedi gün"],
    notification: ["Öncelikli talep geldi", "Acil klima arızası · şimdi"],
    assignment: ["Yanıt sırası güncellendi.", "En acil iki talep üstte."],
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
    table: ["Yaklaşan işler", "Takvimi aç ↗"],
    rows: [
      ["Pazartesi bakım rotası", "3 adres · 09.00", "Tamamlandı", "teal", "AÖ", "teal"],
      ["Çarşamba montaj", "2 adres · 10.30", "Sahada", "blue", "DÖ", "blue"],
      ["Cuma kontrol turu", "4 adres · 08.30", "Planlandı", "violet", "SÖ", "violet"],
    ],
    chart: [28, 70, 52, 86, 64, 76, 44],
    chartCopy: ["Ekip kapasitesi", "Planlanan iş yükü"],
    notification: ["Plan güncellendi", "Cuma rotasına 1 iş eklendi"],
    assignment: ["İş yükü dengelendi.", "Üç ekip için rota hazır."],
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
          <div className="dashboard-content preview-refresh" key={activeView}>
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
                <strong>{view.table[0]}</strong>
                <span>{view.table[1]}</span>
              </div>
              <div className="mock-row mock-labels">
                <span>TALEP / MÜŞTERİ</span>
                <span>DURUM</span>
                <span>ATANAN</span>
              </div>
              {view.rows.map(([job, detail, status, statusTone, owner, ownerTone]) => (
                <div className="mock-row" key={job}>
                  <div className="mock-job">
                    <span className={`job-icon ${statusTone}`}>
                      <Icon name="tool" size={15} />
                    </span>
                    <span>
                      <strong>{job}</strong>
                      <small>{detail}</small>
                    </span>
                  </div>
                  <span className={`status-pill ${statusTone}`}>{status}</span>
                  <span className={`mini-avatar ${ownerTone}`}>{owner}</span>
                </div>
              ))}
            </div>
            <div className="mock-week">
              <div>
                <strong>{view.chartCopy[0]}</strong>
                <span>{view.chartCopy[1]}</span>
              </div>
              <div className="mini-chart">
                {view.chart.map((height, i) => (
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
          <strong>{view.notification[0]}</strong>
          <span>{view.notification[1]}</span>
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
          <strong>{view.assignment[0]}</strong>
          <span>{view.assignment[1]}</span>
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
