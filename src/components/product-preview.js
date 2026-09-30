import Icon from "./icon";

export default function ProductPreview() {
  return (
    <figure
      className="product-preview"
      aria-label="Akış ürün konsepti: örnek talepler, görev durumları ve iş özeti gösteren statik panel. Canlı uygulama değildir."
    >
      <div className="preview-glow" aria-hidden="true" />
      <div className="dashboard" aria-hidden="true">
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
          <div className="dashboard-sidebar">
            <span className="sidebar-label">ÇALIŞMA ALANI</span>
            <span className="sidebar-item selected">
              <Icon name="grid" size={15} /> Genel bakış
            </span>
            <span className="sidebar-item">
              <Icon name="inbox" size={15} /> Talepler
            </span>
            <span className="sidebar-item">
              <Icon name="calendar" size={15} /> İş planı
            </span>
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
                <span className="dashboard-kicker">HER ŞEY YOLUNDA</span>
                <h3>İşinize genel bir bakış</h3>
                <p>Ekibinizin bugünkü iş akışı, tek ekranda.</p>
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
                <span>Açık talepler</span>
                <strong>
                  12<small>+2 yeni</small>
                </strong>
              </div>
              <div>
                <span className="metric-icon amber">
                  <Icon name="clock" size={15} />
                </span>
                <span>Devam eden</span>
                <strong>
                  5<small>Planlandı</small>
                </strong>
              </div>
              <div>
                <span className="metric-icon teal">
                  <Icon name="check" size={15} />
                </span>
                <span>Tamamlanan</span>
                <strong>
                  8<small>Bugün</small>
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
        <span className="concept-dot" /> Ürün konsepti · Örnek veriler, statik
        önizleme
      </figcaption>
    </figure>
  );
}
