# Güncel ilerleme — teslim hazırlığı

## Tamam

- Next.js 16.3.7, React 19.2.8, JavaScript/CSS landing page.
- İstemci ve sunucuda dört alan doğrulaması; isim 2–50.
- POST /api/requests, parametreli pg sorgusu, server-only DB modülü.
- Neon PostgreSQL tablosu; gerçek kayıtlar ID 1/3 ve son bağımsız entegrasyon kaydı ID 5 doğrulandı.
- Gönderiliyor/başarı/hata; hata halinde değer koruma; eşzamanlı ikinci submit kilidi.
- Etkileşimli ürün konsepti açık etiketli; hizmet kartı → form seçimi, form ilerlemesi ve blur doğrulaması çalışıyor.
- 16 test, lint ve production build geçti.
- Masaüstü 1440px, mobil 390px/320px, tablet 768px kontrolleri geçti; son tarayıcı hata listesi boş.
- Son sınırlı DOM kontrast kontrolünde 41 metin, başarısız eşik 0. Tam WCAG denetimi değildir.
- README, AI_LOG, docs/DECISIONS, docs/VERIFICATION, DELIVERY dosyaları mevcut.
- İlk commit 928e662f931ad0c89d55ffbc8533382ec1760fd6 GitHub main dalına gönderildi. Son değişiklikler ayrıca commit edilecek.

## Bekleyen gerçek dış bağımlılıklar

1. Vercel oturumu: CLI cihaz girişi başlatıldı. CLI --global-config .vercel-cli kullanıyor; standart profil yolu EXDEV verdi. Giriş adayı gerektiriyor. Bağlı Vercel aracının team listesi boş.
2. GitHub değerlendirici erişimi: anonim URL 404; git push başarılı. Kullanıcıdan erişim talimatı istendi. Depoyu kendiliğinden public yapma.
3. Başvurudaki yazılı senaryo/geçmiş proje katkısı: kullanıcıya yanıtlayıp yanıtlamadığı soruldu; kişisel deneyim uydurma.

## Oturum gelince tamamlanacaklar

- Vercel hesabı ve ücretsiz plan kapsamını doğrula; proje adı entech/akis-entech için link.
- DATABASE_URL değerini .env.local dosyasından güvenli stdin ile Production ortama aktar; çıktı veya komut argümanına yazma.
- Production deploy; canlı URL, HEAD/HTML, invalid POST, gerçek kurgusal kayıt, bağımsız DB okuması ve tarayıcı akışı kontrolü.
- DELIVERY ve doğrulama belgesine canlı kanıtları ekle, final commit/push ve kaynak/yayın eşleşmesini doğrula.
- Kullanıcıya canlı URL, repo ve tam commit SHA ver. Değerlendirme sitesine teslim edilmediyse edildiğini söyleme.

## Kurallar ve sınırlar

Son teslim 01.10.2026 15:10:36 İstanbul. Kullanıcı rutin uygulama/yayın kararlarını Codex'e bıraktı; açıklamalarla ilerle, gereksiz onay sorma. Alt ajan yok. .env.local ve .vercel-cli gizli ve Git/yayın dışında; içeriklerini yazdırma. Uygulama yerelde de Neon kullanıyor. Dağıtık rate limiting/idempotency yok; README'de açık. Normal sandbox terminali çalışmıyor; izinli require_escalated exec çalışıyor. Git commit kimliği mevcut yerel ayardan kullanılır.
