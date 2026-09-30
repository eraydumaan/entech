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
- Marka işaretinin adayın sağladığı stilize `A` referansına göre tema mavisine uyarlanması
- Commit mesajlarının Türkçe ve anlaşılır olması
- Gereksiz dosyaların kaldırılması ve AI kullanımının açıkça belgelenmesi

## Kabul edilen ve değiştirilen teknik öneriler

- Next.js App Router seçildi. Böylece React arayüzü ve sunucu API'si aynı projede yayınlanabildi.
- PostgreSQL erişiminde ORM yerine `pg` ve parametreli SQL kullanıldı. Küçük kapsamda veri akışının doğrudan görülebilmesi tercih edildi.
- Firebase değerlendirildi ancak PostgreSQL tercihiyle aynı doğrultuda olmadığı için kullanılmadı.
- Neon'un genel amaçlı agent/CLI kurulum önerileri yerine uygulamanın ihtiyaç duyduğu standart `DATABASE_URL` bağlantısı kullanıldı.
- Hazır tema veya ücretli UI paketi eklenmedi. Arayüz ve küçük arayüz ikonları proje içinde üretildi; ana marka işareti adayın sağladığı referanstan uyarlandı.
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

İlk marka işaretindeki kutu içi “a” harfi kaldırıldı ve geçici bir akış sembolü denendi. Aday son marka yönü olarak stilize `A` referansı sağladı. Built-in ImageGen ile şekil korunarak tema mavisine uyarlandı ve arka planı şeffaflaştırıldı. Ortaya çıkan PNG header, problem akışı, footer ve favicon'da ortak `BrandMark` bileşeniyle kullanıldı. Dashboard içindeki sade `akış.` kelime işareti korundu. Masaüstü ve mobil boyutlar gerçek tarayıcıda incelendi; ikonların yüklendiği ve yatay taşma oluşmadığı doğrulandı.

Hero için yapılan son içerik revizyonunda kullanıcıya dönük PostgreSQL ifadeleri kaldırıldı; kayıt davranışı “Başarılı gönderimde talebiniz için kayıt numarası oluşturulur” cümlesiyle anlatıldı. Masaüstündeki ikincil bağlantı “Nasıl çalışır ↓” olarak değiştirildi ve daha kısa bir hero için mobilde gizlendi. Mobil üst/alt boşluklar, başlık boyutu ve içerik aralıkları azaltıldı; ana CTA 280px genişliğe çıkarıldı. Dashboard mockup'ı ve “Yönetim önizlemesi” etiketi korundu; dashboard içindeki logo sade `akış.` kelime işaretine dönüştürüldü. 390px ayarında hero yüksekliği 1363px, dashboard başlangıcı 480px, CTA genişliği 280px ve belge/viewport genişliği 375px olarak ölçüldü.

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

## Son senaryo ve responsive denetimi

Teslim öncesi form durumları gerçek tarayıcı ve API üzerinden yeniden denetlendi. Yanlış e-posta, boş isim, izin verilmeyen hizmet ve kısa açıklama ayrı isteklerde `422` aldı. Geçersiz istemci formu dört alan hatasını birlikte gösterdi, ilk alana odaklandı ve API isteği oluşturmadı. Bekletilen istek sırasında iki gönderim denemesi tek `fetch` üretti; form, buton ve `aria-busy` loading durumuna geçti. Kontrollü `503` yanıtında hata mesajı gösterildi ve değerler korundu. Kontrollü `201 + success + ID` yanıtından sonra başarı mesajı gösterildi, alanlar ve ilerleme sıfırlandı. Sunucunun DB hata yolu birim testinde ayrıca doğrulandı; çalışan Neon servisi test amacıyla kapatılmadı.

Navbar, hero, dashboard, hizmet kartları, form ve footer 1440px ile 390px görünümlerde ayrı ayrı ölçüldü. Yatay taşma bulunmadı ve mobil içerik tek sütuna indi. Bu kontrolde dashboard sekmelerinin mobil dokunma yüksekliğinin 29px olduğu görüldü; hedef 44px'e çıkarıldı ve sekme yazısı büyütüldü. Sonrasında beş sekmenin de 44px olduğu ölçüldü, mobil tam sayfa görüntüsü incelendi, 18/18 test geçti, ESLint sıfır uyarıyla tamamlandı ve production build başarılı oldu.

Doğrulama kuralları zaten istemci ve sunucuda uygulanıyordu. Son form incelemesinde aynı sınırlar isim, e-posta ve açıklama alanlarına HTML `minLength`/`maxLength` özellikleri olarak da eklendi; böylece tarayıcı ve yardımcı teknolojiler alan sınırlarını doğrudan okuyabiliyor. E-posta hata metni kısa ve doğrudan olacak şekilde sadeleştirildi. Bu değişikliklerden sonra 18 test, ESLint ve production build tekrar geçti.
