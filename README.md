# Akış — teknik servisler için iş takibi

Küçük teknik servis işletmelerinin telefon, mesaj ve notlar arasında dağılan işlerini düzenlemeyi amaçlayan **kurgusal otomasyon hizmeti**. Landing page hizmeti anlatır; talep formu gerçek sunucu doğrulamasıyla PostgreSQL üzerinde kalıcı kayıt oluşturur.

**Sınır:** Sayfadaki beş sekmeli iş takip paneli, etkileşimli ve kurgusal bir ürün önizlemesidir; gerçek yönetim erişimi değildir. Sekmeler örnek metrikleri, işleri, grafiği ve bildirimleri değiştirir. Kimlik doğrulama, gerçek görev atama ve talep yönetimi bu teslimde geliştirilmemiştir. Çalışan ürün kapsamı landing page ile doğrulanan ve PostgreSQL'e kalıcı kayıt oluşturan talep akışıdır. Yalnızca kurgusal test verisi kullanın.

- Kaynak kod: https://github.com/eraydumaan/entech
- Canlı adres ve teslim commit bilgisi: [DELIVERY.md](DELIVERY.md)
- AI kullanımı ve aday kararları: [AI_LOG.md](AI_LOG.md)
- Problem çözme ve mimari kararlar: [docs/DECISIONS.md](docs/DECISIONS.md)
- Test kanıtları: [docs/VERIFICATION.md](docs/VERIFICATION.md)

## Yerelde çalıştırma

Node.js **22.x**, npm ve erişilebilir PostgreSQL gerekir. Geliştirmede Node 22.17.0 / npm 10.9.2 kullanıldı. Testler Neon PostgreSQL 17.11 üzerinde yapıldı. Bilgisayardaki PostgreSQL 17.5 de sorgulandı fakat uygulama ona bağlanmadı.

```sh
git clone https://github.com/eraydumaan/entech.git
cd entech
npm ci
```

`.env.example` dosyasını `.env.local` olarak kopyalayın. `DATABASE_URL` içine kendi bağlantınızı yazın. Neon için Connect ekranındaki pooled PostgreSQL adresini TLS parametreleriyle birlikte kullanın. Yerel PostgreSQL için önce boş bir veritabanı oluşturun. Gerçek bağlantı adresini sohbete, README'ye veya Git'e koymayın.

```sh
npm run db:setup
npm run dev
```

http://localhost:3000 adresini açın. `db:setup` tablo yoksa ilk migration dosyasını transaction içinde uygular. Tablo zaten varsa değiştirmez; sonraki şema değişikliği için yeni migration gerekir. Aynı klasörde ikinci dev sunucusu başlatmayın.

## Kontroller

```sh
npm run lint
npm test
npm run build
```

`npm test` Node.js yerleşik test aracıyla DB gerektirmeyen 18 test çalıştırır. Hata testlerinde görünen “Talep kaydı tamamlanamadı” logları beklenen simülasyonlardır.

Gerçek kayıt kontrolü için uygulama çalışırken başka bir terminalde:

```sh
npm run test:integration
```

Bu komut kurgusal `example.com` e-postasıyla **bir kalıcı test kaydı bırakır**, API yanıtını, bağımsız DB okumasını, yeniden bağlantı sonrası kalıcılığı ve 51 karakterlik isim reddini kontrol eder. `TEST_BASE_URL` varsayılanı `http://localhost:3000` değeridir. Canlı URL için bu ortam değişkeni değiştirilebilir; `DATABASE_URL` aynı hedef veritabanını göstermelidir.

Production sürümünü yerelde çalıştırmak için başarılı build sonrasında `npm start` kullanın.

## Veri akışı

```text
Form → ortak istemci doğrulaması → POST /api/requests
     → bağımsız sunucu doğrulaması → parametreli INSERT
     → PostgreSQL kayıt kimliği → HTTP 201 → başarı mesajı
```

- Dört alan zorunlu: isim 2–50, e-posta en fazla 254, açıklama 10–2000 karakter; hizmet sabit listedeki üç değerden biri.
- Baştaki/sondaki boşluklar temizlenir; beklenmeyen alanlar kayıt nesnesine alınmaz.
- İstemci ve sunucu `src/lib/request-validation.mjs` kullanır. Tarayıcı kontrollerinin atlatılabildiği varsayılır.
- `noValidate`, tarayıcı baloncukları yerine alan altında tutarlı Türkçe hata mesajları göstermek içindir. Sunucu kontrolünü kaldırmaz.
- `pg` sorgusu `$1…$4` parametreleri kullanır; kullanıcı girdisi SQL metnine birleştirilmez.
- `server-only` DB kodunun istemciye import edilmesini engeller. `DATABASE_URL` için `NEXT_PUBLIC_` kullanılmaz.
- PostgreSQL `NOT NULL`, `CHECK`, otomatik ID ve kayıt zamanı içerir. Aynı e-posta farklı talepler bırakabilir.

| Yanıt | Anlamı                                                   |
| ----- | -------------------------------------------------------- |
| 201   | Kayıt başarılı; `success: true`, kayıt ID ve mesaj döner |
| 400   | JSON okunamadı                                           |
| 413   | Gövde 16 KiB sınırını aştı                               |
| 415   | İçerik türü JSON değil                                   |
| 422   | Alan doğrulama hataları                                  |
| 503   | Kayıt sonucu doğrulanamadı                               |

Gönderimde alanlar/buton devre dışı kalır ve ikinci submit engellenir. Sadece `201 + success=true + id` başarı kabul edilir; ardından alanlar temizlenir. Hata halinde bilgiler korunur. 20 saniyelik istemci zaman aşımında otomatik tekrar yapılmaz. Bağlantı kaybında kayıt yapılmış olabileceğinden mesaj kesin olarak “kaydedilmedi” demez.

## Yayın

Vercel projesinde Node 22.x ve `DATABASE_URL` Production ortam değişkeni kullanılır. `vercel.json` sunucu bölgesini Neon'a yakın Frankfurt olarak belirler. Migration build sırasında otomatik çalıştırılmaz. `.env.local`, `.vercel` ve yerel CLI kimlik bilgileri Git/yayın yüklemesi dışında tutulur. Preview ortamında form test edilecekse ayrıca uygun bir test veritabanı ayarlanmalıdır.

Canlı sürüm: https://entech-seven.vercel.app

## Kullanılabilirlik

Mobilde tek sütun, 16px form girişleri, etiketli alanlar, görünür klavye odağı, ana içeriğe geç bağlantısı, alan bazlı hata ilişkileri ve canlı durum mesajları vardır. İlk hatalı alana odak taşınır. Alan terk edildiğinde doğrulama ve geçerli alanlara göre ilerleme çubuğu geri bildirim verir. Hizmet kartı seçimi form alanına aktarılır. Kullanıcının hareket azaltma tercihi gözetilir. Konsept panelinin beş sekmesi görünür içeriği değiştirir; örnek veriler gerçek operasyon verisi gibi sunulmaz.

## Bilinen sınırlar

- Dağıtık rate limiting, CAPTCHA ve kalıcı idempotency anahtarı yok. Buton kilidi aynı tarayıcıda eşzamanlı gönderimi önler; farklı istekler veya belirsiz sonuç sonrası tekrar mükerrer kayıt oluşturabilir.
- E-posta sahipliği/teslim edilebilirliği doğrulanmaz; e-posta gönderilmez.
- Kimlik doğrulama, yönetim paneli ve talep listeleme API'si yok.
- Tam WCAG denetimi ve yük testi yapılmadı. Ücretsiz plan kotaları ve uyuyan DB'nin açılış gecikmesi geçerlidir.

## Hazır kaynaklar ve kişisel katkı

Başlangıç: [create-next-app](https://nextjs.org/docs/app/api-reference/cli/create-next-app). Next.js, React, ESLint ve Geist font ayarları bu iskeletten gelir. Hazır ücretli tema kullanılmadı. Panel ve küçük SVG ikonlar kodla üretildi; adayın referans görseli yalnızca tasarım yönü sağladı.

Aday: gereksinimleri aktardı, PostgreSQL/ücretsiz hizmet kararlarını verdi, ilk kurulumu ve Türkçe içerik değişikliklerini yaptı, gizli bağlantıyı yapılandırdı, isim sınırını 50'ye indirdi, görsel yönlendirmeyi sağladı. Codex: seçeneklerin açıklanması, sonraki kodlama, hata kontrolleri, testler, belgeler ve yayın hazırlığı. Ayrıntılı karar geçmişi AI_LOG.md içindedir. Başka takım üyesi veya alt ajan kullanılmadı.

## Süre

Değerlendirme penceresi 30 Eylül 2026 15:10:36–1 Ekim 2026 15:10:36 İstanbul. Ön hazırlık bu pencere öncesinde yapıldı ve AI_LOG'da açıklandı. Çalışma kesintili ilerledi; duvar saati aralığı aktif emek süresi olarak sunulmaz. Otomatik aktif süre ölçümü tutulmadığı için doğrulanmamış saat iddiası yapılmaz.
