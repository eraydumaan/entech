# AI_LOG

## Çalışma biçimi ve sorumluluklar

Bu projede AI desteği Codex üzerinden kullanıldı. Ürün yönü, kapsam, teknoloji tercihleri ve son kabul kararları adaya aittir. Codex; seçenekleri açıklama, kodlama, test otomasyonu, hata inceleme, belge hazırlama ve yayın kontrollerinde yardımcı oldu. Aday ilk kurulumu ve temel iskeleti hazırladı; sonraki geliştirme iterasyonları adayın yönlendirmeleri ve incelemesiyle pair programming biçiminde yürütüldü. Her önemli değişiklik çalışan uygulama, testler veya veri tabanı sorgularıyla kontrol edildi. Alt ajan veya başka bir ekip üyesi kullanılmadı.

Kullanılan araçlar:

- Codex masaüstü uygulaması ve terminal
- Next.js, React, Node.js test aracı ve ESLint
- Neon PostgreSQL ve `pg`
- Vercel CLI
- Gerçek tarayıcı kontrolleri için agent-browser
- Git ve GitHub

## Adayın belirlediği yön

Aday aşağıdaki kararları verdi veya önerileri bu yönde değiştirdi:

- Ücretli hizmet kullanılmaması
- İlişkisel veri tabanı olarak PostgreSQL kullanılması
- Barındırılan PostgreSQL için Neon ile devam edilmesi
- Bildiği teknoloji setine uygun olarak JavaScript, React ve CSS kullanılması
- İsim alanı üst sınırının 100 yerine 50 karakter olması
- Ürün fikrinin küçük teknik servis işletmelerine odaklanması
- Dashboard'ın küçük bir görsel yerine sayfada güçlü ve geniş bir ürün önizlemesi olması
- Statik görünen panel bölümlerinin anlamlı biçimde etkileşimli hâle getirilmesi
- Bildirimlerin dashboard üzerine taşmak yerine panel içinde düzenli kartlar olarak gösterilmesi
- Commit mesajlarının Türkçe ve anlaşılır olması
- Gereksiz dosyaların kaldırılması ve AI kullanımının açıkça belgelenmesi

## Kabul edilen ve değiştirilen teknik öneriler

- Next.js App Router seçildi. Böylece React arayüzü ve sunucu API'si aynı projede yayınlanabildi.
- PostgreSQL erişiminde ORM yerine `pg` ve parametreli SQL kullanıldı. Küçük kapsamda veri akışının doğrudan görülebilmesi tercih edildi.
- Firebase değerlendirildi ancak PostgreSQL tercihiyle aynı doğrultuda olmadığı için kullanılmadı.
- Neon'un genel amaçlı agent/CLI kurulum önerileri yerine uygulamanın ihtiyaç duyduğu standart `DATABASE_URL` bağlantısı kullanıldı.
- Hazır tema veya ücretli UI paketi eklenmedi. Arayüz ve küçük SVG ikonlar proje içinde üretildi.
- Dashboard gerçek yönetim paneli olarak sunulmadı. Gerçek admin özelliğinin kimlik doğrulama, rol yetkilendirmesi, korumalı okuma/güncelleme API'leri ve ek veri modeli gerektirdiği değerlendirildi. Görev bunları istemediği için panel açıkça kurgusal ürün önizlemesi olarak sınırlandı.
- Dağıtık rate limiting ve kalıcı idempotency kısa teslim kapsamına alınmadı; bu sınırlar README'de belirtildi.

## Uygulanan veri akışı

Dört zorunlu alan için ortak bir doğrulama modülü hazırlandı: isim, e-posta, hizmet ve açıklama. Aynı kurallar istemcide erken geri bildirim, sunucuda güvenlik sınırı olarak ayrı ayrı çalıştırılıyor. Sunucu yalnızca izin verilen alanları alıyor ve hizmet değerini sabit listeden doğruluyor.

`POST /api/requests` aşağıdaki sonuçları gerçek durumlarına göre döndürüyor:

- `201`: PostgreSQL INSERT tamamlandı, tek kayıt ve ID doğrulandı
- `400`: JSON okunamadı
- `413`: istek gövdesi 16 KiB sınırını aştı
- `415`: içerik türü JSON değil
- `422`: alan doğrulaması başarısız
- `503`: kayıt sonucu doğrulanamadı

Kayıt sorgusu `$1…$4` parametreleri kullanıyor. PostgreSQL tablosunda kimlik, zaman, `NOT NULL` ve uzunluk/hizmet `CHECK` kısıtları bulunuyor. Bağlantı bilgisi yalnızca sunucu ortam değişkeninde tutuluyor.

Form; gönderim kilidi, gönderiliyor durumu, alan bazlı hatalar, hata halinde değer koruma ve 20 saniyelik zaman aşımı içeriyor. Başarı yalnızca HTTP `201`, `success: true` ve kayıt ID'si birlikte geldiğinde gösteriliyor. Bağlantı sonucu belirsizse otomatik tekrar yapılmıyor ve kullanıcıya kesin olmayan bir kayıt iddiası sunulmuyor.

## Arayüz kararları

İçerik sırası sorun → hizmetler → çalışma yaklaşımı → çalışan talep formu olarak kuruldu. Mobilde tek sütuna inen yapı, görünür klavye odağı, ana içeriğe geç bağlantısı, alan-hata ilişkileri ve canlı durum mesajları eklendi.

Dashboard beş sekmeli bir ürün önizlemesine dönüştürüldü: Genel bakış, Talepler, İş planı, Ekibim ve Raporlar. Sekmeler; başlık, metrikler, tablo satırları, grafik ve bildirimleri birlikte değiştiriyor. İçeriklerin kurgusal olduğu panel üzerinde belirtiliyor. Hizmet kartlarından yapılan seçim forma aktarılıyor; form ilerleme göstergesi geçerli alanlara göre güncelleniyor.

İlk bildirim yerleşimindeki yüzen kartlar görsel inceleme sonucunda panel içine alındı. Yeni düzende “Anlık bildirim” ve “Ekip hareketi” kartları grafiğin altında hizalanıyor ve mobilde tek sütuna iniyor.

## Bulunan sorunlar ve yapılan düzeltmeler

- Sunucu alan hatası sonrasında ilk hatalı alana odağın render tamamlanınca taşınması sağlandı.
- Etkileşim eklenirken ürün panelini erişilebilirlik ağacından çıkaran `aria-hidden` kaldırıldı.
- Sınırlı kontrast ölçümünde eşik altında kalan yardımcı metin renkleri koyulaştırıldı.
- `pg` paketinin `sslmode=require` gelecek sürüm uyarısı incelendi; bağlantı açıkça `sslmode=verify-full` değerine normalize edildi ve bunun için iki test eklendi.
- create-next-app'tan kalan kullanılmayan CSS, favicon ve beş varsayılan SVG kaldırıldı.
- README'deki eski “statik panel” açıklaması mevcut etkileşimli önizlemeyi doğru anlatacak şekilde güncellendi.
- `.gitignore` tekrarları temizlendi; gizli ortam ve CLI oturum dosyalarının Git dışında kaldığı doğrulandı.

## Doğrulama kanıtları

Son doğrulamalarda:

- 18/18 birim testi geçti.
- ESLint sıfır uyarıyla tamamlandı.
- Next.js production build tamamlandı.
- Geçersiz JSON, içerik türü, büyük gövde, hatalı alanlar, bekleyen kayıt ve DB hata senaryoları sınandı.
- 51 karakterlik isim hem API hem PostgreSQL `CHECK` kısıtı tarafından reddedildi.
- Canlı API üzerinden yalnızca kurgusal veriyle oluşturulan kayıt ID 14, bağımsız PostgreSQL bağlantısıyla ve yeniden bağlantı sonrasında okundu.
- Production adresi oturumsuz HTTP 200 döndürdü; güvenlik başlıkları kontrol edildi.
- Masaüstü ve mobil görünümler gerçek tarayıcıda incelendi; mobilde belge ve viewport genişliği eşleşti.
- Dashboard sekmelerinin içerikleri birlikte değiştirdiği, dört form alanının bulunduğu ve boş gönderimde ilk hatalı alana odaklandığı doğrulandı.
- Son Production tarayıcı hata listesi boştu.
- Git geçmişi ve staged değişiklikler token, Neon sunucu adı, açık `DATABASE_URL` ve parola desenleri için tarandı; gerçek gizli değer bulunmadı.

Ayrıntılı tekrar çalıştırma adımları `README.md`, test sonuçlarının kapsamı `docs/VERIFICATION.md`, mimari gerekçeler `docs/DECISIONS.md` içindedir.

## Kaynaklar ve katkı ayrımı

Başlangıç iskeleti create-next-app ile oluşturuldu. Next.js, React, ESLint ve Geist yapılandırması bu iskeletten gelir. Hazır ticari tema kullanılmadı. Aday gereksinimleri yorumladı; ürün yönünü, teknoloji setini ve ücretsiz servis sınırını belirledi; alan kurallarını değiştirdi; arayüz revizyonlarını yönlendirdi ve gerçek admin kapsamını teknik gereksinimleriyle birlikte değerlendirdi. Codex uygulama kodu, testler, teknik belgeler ve yayın doğrulamalarında destek verdi.

Değerlendirme penceresi başlamadan önce gereksinimler ve teknoloji seçenekleri konuşuldu; uygulama kodu süre başladıktan sonra oluşturuldu. Otomatik aktif süre ölçümü tutulmadığı için doğrulanmamış çalışma saati iddiasında bulunulmadı.
