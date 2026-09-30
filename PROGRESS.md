# Güncel ilerleme — teslim hazırlığı

## Tamam

- Next.js 16.3.7, React 19.2.8, JavaScript/CSS landing page.
- İstemci ve sunucuda dört alan doğrulaması; isim 2–50.
- POST /api/requests, parametreli pg sorgusu, server-only DB modülü.
- Neon PostgreSQL tablosu; yerel ve Production kayıtları, son olarak final canlı ID 12 bağımsız bağlantıyla doğrulandı.
- Gönderiliyor/başarı/hata; hata halinde değer koruma; eşzamanlı ikinci submit kilidi.
- Tam genişlik etkileşimli ürün dashboard'u açık etiketli; sekmeler metrik/tablo/grafik/bildirimleri değiştiriyor, hizmet kartı → form seçimi, form ilerlemesi ve blur doğrulaması çalışıyor.
- 18 test, lint ve production build geçti.
- Masaüstü 1440px, mobil 390px/320px, tablet 768px kontrolleri geçti; son tarayıcı hata listesi boş.
- Son sınırlı DOM kontrast kontrolünde 41 metin, başarısız eşik 0. Tam WCAG denetimi değildir.
- README, AI_LOG, docs/DECISIONS, docs/VERIFICATION, DELIVERY dosyaları mevcut.
- Production URL https://entech-seven.vercel.app hazır ve oturumsuz HTTP 200 döndü.
- İlk commit 928e662f931ad0c89d55ffbc8533382ec1760fd6 GitHub main dalına gönderildi. Son doğrulama commit'i ayrıca gönderilecek.

## Bekleyen gerçek dış bağımlılıklar

1. GitHub değerlendirici erişimi: anonim URL 404; git push başarılı. Depoyu kendiliğinden public yapma.
2. Başvurudaki yazılı senaryo/geçmiş proje katkısı: kullanıcıya yanıtlayıp yanıtlamadığı soruldu; kişisel deneyim uydurma.

## Son teslim öncesi

- Final commit/push ve kaynak/yayın eşleşmesini doğrula.
- Kullanıcıya canlı URL, repo ve tam commit SHA ver. Değerlendirme sitesine teslim edilmediyse edildiğini söyleme.

## Kurallar ve sınırlar

Son teslim 01.10.2026 15:10:36 İstanbul. Kullanıcı rutin uygulama/yayın kararlarını Codex'e bıraktı; açıklamalarla ilerle, gereksiz onay sorma. Alt ajan yok. .env.local ve .vercel-cli gizli ve Git/yayın dışında; içeriklerini yazdırma. Uygulama yerelde de Neon kullanıyor. Dağıtık rate limiting/idempotency yok; README'de açık. Normal sandbox terminali çalışmıyor; izinli require_escalated exec çalışıyor. Git commit kimliği mevcut yerel ayardan kullanılır.
