# AI_LOG

## Çalışma biçimi ve sorumluluklar

Bu projede AI desteğini Codex üzerinden kullandım. Ürün yönü, kapsam, teknoloji tercihleri ve son kabul kararları bana aittir. Codex; seçenekleri açıklama, kodlama, test otomasyonu, hata inceleme, belge hazırlama ve yayın kontrollerinde yardımcı oldu. İlk kurulumu ve temel iskeleti ben hazırladım; sonraki geliştirme adımlarını kendi yönlendirmelerim ve incelemelerimle pair programming biçiminde yürüttüm. Her önemli değişikliği çalışan uygulama, otomatik testler veya veri tabanı sorgularıyla kontrol ettim. Alt ajan veya başka bir ekip üyesi kullanmadım.

Kullanılan araçlar:

- Codex masaüstü uygulaması ve terminal
- Next.js, React, Node.js test aracı ve ESLint
- Neon PostgreSQL ve `pg`
- Vercel CLI
- Gerçek tarayıcı kontrolleri için agent-browser
- Git ve GitHub

## Benim belirlediğim yön

Bu projede aşağıdaki kararları ben verdim veya AI önerilerini bu yönde değiştirdim:

- Projeyi değerlendirme kapsamında ek ücretli servis gerektirmeyecek şekilde tasarladım.
- İlişkisel veri tabanı olarak PostgreSQL kullanılması
- Barındırılan PostgreSQL için Neon ile devam edilmesi
- Bildiği teknoloji setine uygun olarak JavaScript, React ve CSS kullanılması
- İsim alanı üst sınırının 100 yerine 50 karakter olması
- Ürün fikrinin küçük teknik servis işletmelerine odaklanması
- Dashboard'ın küçük bir görsel yerine sayfada güçlü ve geniş bir ürün önizlemesi olması
- Statik görünen panel bölümlerinin anlamlı biçimde etkileşimli hâle getirilmesi
- Bildirimlerin dashboard üzerine taşmak yerine panel içinde düzenli kartlar olarak gösterilmesi
- Marka işaretinin sağladığım stilize `A` referansına göre tema mavisine uyarlanması
- Commit mesajlarının Türkçe ve anlaşılır olması
- Gereksiz dosyaların kaldırılması ve AI kullanımının açıkça belgelenmesi

## Kabul edilen ve değiştirilen teknik öneriler

- Next.js App Router seçildi. Böylece React arayüzü ve sunucu API'si aynı projede yayınlanabildi.
- PostgreSQL erişiminde ORM yerine `pg` ve parametreli SQL kullanıldı. Küçük kapsamda veri akışının doğrudan görülebilmesi tercih edildi.
- Firebase değerlendirildi ancak PostgreSQL tercihiyle aynı doğrultuda olmadığı için kullanılmadı.
- Neon'un genel amaçlı agent/CLI kurulum önerileri yerine uygulamanın ihtiyaç duyduğu standart `DATABASE_URL` bağlantısı kullanıldı.
- Hazır tema veya ücretli UI paketi eklemedim. Arayüzü ve küçük arayüz ikonlarını proje içinde ürettim; ana marka işaretini sağladığım referanstan uyarladım.
- Dashboard gerçek yönetim paneli olarak sunulmadı. Gerçek admin özelliğinin kimlik doğrulama, rol yetkilendirmesi, korumalı okuma/güncelleme API'leri ve ek veri modeli gerektirdiği değerlendirildi. Görev bunları istemediği için panel açıkça kurgusal ürün önizlemesi olarak sınırlandı.
- Dağıtık rate limiting ve kalıcı idempotency kısa teslim kapsamına alınmadı; bu sınırlar README'de belirtildi.

## Uygulanan veri akışı

Dört zorunlu alan için ortak bir doğrulama modülü hazırlandı: isim, e-posta, hizmet ve açıklama. Aynı kurallar istemcide erken geri bildirim, sunucuda güvenlik sınırı olarak ayrı ayrı çalıştırılıyor. Sunucu yalnızca izin verilen alanları alıyor ve hizmet değerini sabit listeden doğruluyor.

AI ile önerilen hata durumlarını gerçek API ve otomatik testler üzerinde sınadım. Geçersiz JSON, yanlış içerik türü, büyük istek gövdesi, alan doğrulaması, veri tabanı hatası ve başarılı kayıt senaryolarını ayrı ayrı kontrol ettim. Kayıt sorgusunda parametreli SQL kullandım ve bağlantı bilgisini yalnızca sunucu ortam değişkeninde tuttum.

Formda ikinci gönderimi engelledim, gönderiliyor durumunu görünür kıldım ve hata halinde değerleri korudum. Başarı mesajını yalnızca doğrulanmış `201` yanıtı ve kayıt ID'si birlikte geldiğinde gösterdim. Durum kodlarının ayrıntıları README'de, tekrar çalıştırılabilir test kanıtları `docs/VERIFICATION.md` içinde bulunuyor.

## Arayüz kararları

İçerik sırası sorun → hizmetler → çalışma yaklaşımı → çalışan talep formu olarak kuruldu. Mobilde tek sütuna inen yapı, görünür klavye odağı, ana içeriğe geç bağlantısı, alan-hata ilişkileri ve canlı durum mesajları eklendi.

Dashboard beş sekmeli bir ürün önizlemesine dönüştürüldü: Genel bakış, Talepler, İş planı, Ekibim ve Raporlar. Sekmeler; başlık, metrikler, tablo satırları, grafik ve bildirimleri birlikte değiştiriyor. İçeriklerin kurgusal olduğu panel üzerinde belirtiliyor. Hizmet kartlarından yapılan seçim forma aktarılıyor; form ilerleme göstergesi geçerli alanlara göre güncelleniyor.

İlk bildirim yerleşimindeki yüzen kartlar görsel inceleme sonucunda panel içine alındı. Yeni düzende “Anlık bildirim” ve “Ekip hareketi” kartları grafiğin altında hizalanıyor ve mobilde tek sütuna iniyor.

Marka işareti için AI görsel aracından alınan çıktıyı mevcut tasarıma uyarlayarak kullandım. Çıktının boyutunu, şeffaf arka planını, görünürlüğünü ve farklı ekran genişliklerindeki kullanımını gerçek tarayıcıda kontrol ettim. Ortaya çıkan PNG header, problem akışı, footer ve favicon'da ortak `BrandMark` bileşeniyle kullanıldı. Dashboard içindeki sade `akış.` kelime işaretini korudum.

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

- 18/18 otomatik test geçti.
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

Başlangıç iskeletini create-next-app ile oluşturdum. Next.js, React, ESLint ve Geist yapılandırması bu iskeletten geliyor. Hazır ticari tema kullanmadım. Gereksinimleri ben yorumladım; ürün yönünü, teknoloji setini ve ücretsiz servis sınırını belirledim, alan kurallarını değiştirdim, arayüz revizyonlarını yönlendirdim ve gerçek admin kapsamını teknik gereksinimleriyle birlikte değerlendirdim. Codex uygulama kodu, testler, teknik belgeler ve yayın doğrulamalarında destek verdi.

Değerlendirme penceresi başlamadan önce gereksinimleri ve teknoloji seçeneklerini konuştum; uygulama kodunu süre başladıktan sonra oluşturdum. Otomatik aktif süre ölçümü tutmadığım için doğrulanmamış çalışma saati iddiasında bulunmadım.

## Son senaryo ve responsive denetimi

Teslim öncesinde yanlış e-posta, boş isim, izin verilmeyen hizmet, kısa açıklama, bekleyen gönderim, çift tıklama, kontrollü hata ve başarılı kayıt durumlarını gerçek tarayıcı ile API üzerinde yeniden denedim. Hata halinde değerlerin korunduğunu, başarıdan sonra formun temizlendiğini ve başarı mesajının yalnızca kayıt ID'si geldiğinde gösterildiğini doğruladım. Çalışan Neon servisini test amacıyla kapatmadım; veri tabanı hata yolunu otomatik testte kontrollü olarak sınadım.

Navbar, hero, dashboard, hizmet kartları, form ve footer alanlarını masaüstü ve mobil görünümlerde ayrı ayrı kontrol ettim. Yatay taşma bulmadım ve mobil içeriğin tek sütuna indiğini doğruladım. Dashboard sekmelerindeki küçük dokunma hedeflerini 44px'e çıkardım. Değişikliklerden sonra 18/18 otomatik test geçti, ESLint sıfır uyarıyla tamamlandı ve production build başarılı oldu.

Doğrulama kuralları zaten istemci ve sunucuda uygulanıyordu. Son form incelemesinde aynı sınırlar isim, e-posta ve açıklama alanlarına HTML `minLength`/`maxLength` özellikleri olarak da eklendi; böylece tarayıcı ve yardımcı teknolojiler alan sınırlarını doğrudan okuyabiliyor. E-posta hata metni kısa ve doğrudan olacak şekilde sadeleştirildi. Bu değişikliklerden sonra 18 test, ESLint ve production build tekrar geçti.
