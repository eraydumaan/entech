import RequestForm from "@/components/request-form";
import ProductPreview from "@/components/product-preview";
import Icon from "@/components/icon";

const services = [
  {
    icon: "inbox",
    tone: "blue",
    number: "01",
    title: "Her talep, tek bir yerde.",
    subtitle: "Servis talebi toplama",
    text: "Telefon ve mesajlarla gelen talepleri düzenli bir kayıt akışında bir araya getirin. Müşteri bilgileri ve işin ayrıntıları elinizin altında olsun.",
    benefit: "Dağınık notlardan düzenli kayıtlara",
  },
  {
    icon: "users",
    tone: "teal",
    number: "02",
    title: "Kimin, ne yapacağı belli.",
    subtitle: "Görev atama ve hatırlatma",
    text: "İşleri ekip üyelerine yönlendirin, bekleyen adımları görün. Parça geldiğinde veya teslim zamanı yaklaştığında takibi kolaylaştırın.",
    benefit: "Net sorumluluklar, daha kolay takip",
  },
  {
    icon: "chart",
    tone: "violet",
    number: "03",
    title: "Haftanın tamamını görün.",
    subtitle: "Haftalık iş raporlama",
    text: "Tamamlanan işleri ve dönüş bekleyen talepleri bir arada değerlendirin. Farklı listeleri birleştirmeden iş akışınızı anlayın.",
    benefit: "Kararlar için anlaşılır bir iş özeti",
  },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Ana içeriğe geç
      </a>
      <header className="site-header">
        <div className="shell header-inner">
          <a className="brand" href="#main" aria-label="Akış ana sayfa">
            <span className="brand-mark">a</span>akış
            <span className="brand-period">.</span>
          </a>
          <nav aria-label="Ana menü">
            <a href="#cozumler">Çözümler</a>
            <a href="#nasil-calisir">Nasıl çalışır?</a>
          </nav>
          <a className="button button-small" href="#talep">
            Hizmet talebi oluştur <Icon name="arrow" size={16} />
          </a>
        </div>
      </header>
      <main id="main">
        <section className="hero" aria-labelledby="intro-title">
          <div className="shell hero-grid">
            <div className="hero-copy">
              <p className="hero-badge">
                <span /> Küçük teknik servisler için büyük kolaylık
              </p>
              <h1 id="intro-title">
                İşinizin ustasısınız.
                <br />
                Takibi <span>Akış’a bırakın.</span>
              </h1>
              <p className="intro-copy">
                Telefon, mesaj ve notlar arasında dağılan servis taleplerini tek
                yerde toplayın. İşleri düzenleyin, dönüş bekleyen hiçbir talebi
                gözden kaçırmayın.
              </p>
              <div className="hero-actions">
                <a className="button" href="#talep">
                  Hizmet talebi oluştur <Icon name="arrow" size={18} />
                </a>
                <a className="text-link" href="#nasil-calisir">
                  Akış’ı keşfedin <span aria-hidden="true">↗</span>
                </a>
              </div>
              <div className="hero-points">
                <span>
                  <Icon name="check" size={16} /> Düzenli talepler
                </span>
                <span>
                  <Icon name="check" size={16} /> Net görevler
                </span>
                <span>
                  <Icon name="check" size={16} /> Kolay takip
                </span>
              </div>
              <p className="hero-demo">
                Kurgusal hizmet · Çalışan test talep formu
              </p>
            </div>
            <ProductPreview />
          </div>
        </section>
        <section className="problem-section" aria-labelledby="problem-title">
          <div className="shell problem-grid">
            <div>
              <p className="eyebrow">TANIDIK GELİYOR MU?</p>
              <h2 id="problem-title">
                İşler yoğun.
                <br />
                Talepler her yerde.
              </h2>
              <p>
                Bir telefon, birkaç mesaj, masada bir not…
                <br />
                İş büyüdükçe her şeyi akılda tutmak zorlaşıyor.
              </p>
            </div>
            <div className="channel-flow">
              <div className="channels">
                <div>
                  <span>
                    <Icon name="phone" size={22} />
                  </span>
                  <strong>Telefonlar</strong>
                  <small>“Sonra not alırım.”</small>
                </div>
                <div>
                  <span>
                    <Icon name="message" size={22} />
                  </span>
                  <strong>Mesajlar</strong>
                  <small>“Hangi sohbetteydi?”</small>
                </div>
                <div>
                  <span>
                    <Icon name="note" size={22} />
                  </span>
                  <strong>Notlar</strong>
                  <small>“Kim ilgileniyordu?”</small>
                </div>
              </div>
              <div className="flow-lines" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className="flow-destination">
                <span className="brand-mark">a</span>
                <strong>Hepsi tek bir Akış’ta.</strong>
                <span>Daha az karmaşa. Daha çok kontrol.</span>
              </div>
            </div>
          </div>
        </section>
        <section
          id="cozumler"
          className="services-section shell"
          aria-labelledby="services-title"
        >
          <div className="section-heading">
            <p className="eyebrow">İŞİNİZİN HER ADIMINDA</p>
            <h2 id="services-title">Daha düzenli bir servis günü.</h2>
            <p>Ekibinizin günlük işlerine uyarlanan üç otomasyon çözümü.</p>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" key={service.number}>
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
              </article>
            ))}
          </div>
        </section>
        <section
          id="nasil-calisir"
          className="workflow-section shell"
          aria-labelledby="workflow-title"
        >
          <div className="section-heading">
            <p className="eyebrow">KARMAŞIK DEĞİL, AKICI</p>
            <h2 id="workflow-title">Üç adımda daha net bir iş akışı.</h2>
            <p>Kurgusal hizmetimizin çalışma yaklaşımı.</p>
          </div>
          <ol className="workflow-steps">
            <li>
              <span>01</span>
              <h3>Kaydet</h3>
              <p>
                Müşteri talebini, iletişim bilgilerini ve işin ayrıntılarını
                aynı yerde toplayın.
              </p>
            </li>
            <li>
              <span>02</span>
              <h3>Planla</h3>
              <p>
                İşi uygun ekip üyesine yönlendirin; sorumluluğu ve sonraki adımı
                netleştirin.
              </p>
            </li>
            <li>
              <span>03</span>
              <h3>Takip et</h3>
              <p>
                Bekleyen ve tamamlanan işleri görün. Günün sonunda nerede
                olduğunuzu bilin.
              </p>
            </li>
          </ol>
        </section>
        <section
          id="talep"
          className="request-section"
          aria-labelledby="request-title"
        >
          <div className="shell request-grid">
            <div className="request-intro">
              <p className="eyebrow">DAHA DÜZENLİ BİR GÜN BURADA BAŞLAR</p>
              <h2 id="request-title">
                Sizin işinize uygun
                <br />
                bir Akış kuralım.
              </h2>
              <p>
                Hangi işleri kolaylaştırmak istediğinizi anlatın. İhtiyacınıza
                uygun hizmetle ilk adımı atın.
              </p>
              <ul className="request-points">
                <li>
                  <Icon name="check" size={18} /> İhtiyacınıza uygun hizmet
                  seçimi
                </li>
                <li>
                  <Icon name="check" size={18} /> Kısa ve anlaşılır talep formu
                </li>
                <li>
                  <Icon name="check" size={18} /> Kayıt sonrası talep numarası
                </li>
              </ul>
              <aside className="demo-box">
                <Icon name="shield" size={23} />
                <div>
                  <strong>Şeffaf bir değerlendirme demosu.</strong>
                  <p>
                    Yalnızca kurgusal bilgi kullanın. Formunuz kaydedilir;
                    gerçek hizmet, otomasyon veya e-posta gönderimi yapılmaz.
                    Ürün paneli bir konsept görselidir.
                  </p>
                </div>
              </aside>
            </div>
            <div className="form-card">
              <div className="form-card-heading">
                <div>
                  <h3>Hizmet talebi oluştur</h3>
                  <p>İhtiyacınızı kısaca anlatın.</p>
                </div>
                <span className="form-heading-icon">
                  <Icon name="inbox" size={22} />
                </span>
              </div>
              <p className="form-note">Tüm alanlar zorunludur.</p>
              <RequestForm />
            </div>
          </div>
        </section>
      </main>
      <footer className="shell site-footer">
        <div>
          <a className="brand" href="#main" aria-label="Akış ana sayfa">
            <span className="brand-mark">a</span>akış
            <span className="brand-period">.</span>
          </a>
          <p>İşiniz ilerlesin. Takibi Akış’ta kalsın.</p>
        </div>
        <span>
          Kurgusal ürün · Değerlendirme projesi
          <br />© 2026 Akış
        </span>
      </footer>
    </>
  );
}
