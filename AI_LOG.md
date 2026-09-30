# AI_LOG

## Çalışma biçimi

Araç: Codex masaüstü sohbeti, terminal ve resmî dokümantasyon. Alt ajan kullanılmadı. Aday her aşamanın nedenini öğrenmek istedi; ilk kurulum komutlarını kendisi çalıştırdı. Daha sonra dosya düzenleme ve kontrollerin Codex tarafından yürütülmesini istedi. Ürün ve kabul kararları adayın; öneri, uygulama ve kontrol katkıları aşağıda ayrılır.

## Süre öncesi hazırlık

Gereksinimler incelendi; teknoloji seçenekleri konuşuldu. Aday GitHub reposu ve yerel Git deposunu hazırladı, Node/npm/Git sürümlerini paylaştı. Yerel PostgreSQL sürüm sorgusu başarılı oldu. Neon hesabı ve boş proje oluşturuldu; bağlantı ekranı görüldü, uygulamadan bağlantı test edilmedi. Teslim kodu Next.js kurulumu ile süre başladıktan sonra oluşturuldu. Son teslim ekranı: 01.10.2026 15:10:36 İstanbul.

## Kabul edilen ve değiştirilen öneriler

- Aday PostgreSQL seçti ve ücretli hizmet istemedi.
- Next.js App Router, JavaScript, CSS ve parametreli SQL önerisi kabul edildi.
- Firebase seçeneği tartışıldı; aday PostgreSQL ile tutarlı olmak için Neon ile devam etti.
- Genel küçük işletme otomasyonu fikri, küçük teknik servis işletmelerine odaklanacak şekilde daraltıldı ve kabul edildi.
- Neon ekranındaki CLI/MCP/deploy önerisi uygulanmadı; doğrudan sunucudan PostgreSQL bağlantısı planlandı.
- Aday manuel kopyalama sürecini yavaş buldu; Codex dosya düzenleme ve kontrolleri devraldı, açıklamalı küçük aşamalar korunuyor.

## Uygulama ve gözlemler — 30 Eylül 2026

- Aday create-next-app ile Next.js 16.3.7 / React 19.2.8 iskeletini kurdu.
- Aday Codex önerisiyle Türkçe içerik, metadata ve html lang=tr değişikliklerini uyguladı.
- İkinci kez npm run dev başlatıldığında mevcut sunucu uyarısı görüldü. Mevcut 3000 portundaki sunucunun kullanılması açıklandı; bu bir uygulama kodu hatası olarak raporlanmadı.
- Codex terminali sandbox başlatma hatası verdi. İzinli sandbox dışı terminal çağrısıyla proje okunabildi.
- AGENTS.md ve kurulu Next.js paketindeki layouts-and-pages rehberi okundu. Next.js beceri rehberi incelendi.
- Codex sayfadaki kullanılmayan Image ve styles importlarını kaldırdı; README, AI_LOG ve PROGRESS dosyalarını hazırladı.
- Kontrol sonuçları PROGRESS.md içine gerçek sonuçlarıyla kaydedilir. Çalıştırılmayan testler başarılı olarak gösterilmez.

## Ortak doğrulama ve veri şeması

Codex dört zorunlu alan için ortak ve saf bir doğrulama fonksiyonu yazdı. İsim 2–100, açıklama 10–2000, e-posta en fazla 254 karakter; hizmet yalnızca tanımlı üç değerden biri olabilir. Bu sınırlar uygulama tercihidir, değerlendirme metninde verilmiş zorunlu sayılar değildir. Baştaki/sondaki boşluklar temizlenir; bilinmeyen alanlar kayıt verisine taşınmaz. E-posta kontrolü yalnızca biçimi sınar, sahiplik veya teslim edilebilirlik garantisi vermez.

İlk SQL migration dosyası NOT NULL, CHECK, identity primary key ve timestamptz kayıt zamanı içerir. Aynı e-posta ile farklı taleplere izin vermek için e-posta UNIQUE değildir. Şema henüz PostgreSQL üzerinde çalıştırılmadı. SQL parametreleme ileride kayıt sorgusunda yapılacak; doğrulama tek başına SQL injection koruması olarak sunulmaz.

Ek test paketi yerine Node.js yerleşik test aracı kullanıldı. npm test: 11/11 başarılı. Gerçek kişi verisi kullanılmadı. Önceki aşamanın ESLint işlemi çıkış kodu 0 ile tamamlandı.

Bu aşamanın npm run lint kontrolü de çıkış kodu 0 ile tamamlandı.

## Aday düzeltmesi ve kayıt API

Aday isim üst sınırını 100 yerine 50 istedi. Codex doğrulama modülünü, henüz uygulanmamış SQL migration dosyasını ve sınır testlerini 50 olarak güncelledi. Önceki karar kaydı tarihçe olarak korunuyor; geçerli sınır 2–50.

pg ile bağlantı havuzu ve parametreli INSERT ... RETURNING id yazıldı. server-only, DB modülünün istemciye import edilmesini engeller. Ortam dosyası boş hazırlandı, .env.local için git check-ignore başarılı; sadece şifresiz .env.example sürümlenebilir.

POST /api/requests eklendi; gövde sınırı, tür/JSON/alan doğrulaması ve güvenli hata yanıtları içeriyor. Veritabanı hata metni veya kişisel veri loglanmıyor. Belirsiz bağlantı hatasında kayıt kesinlikle oluşmadı denmiyor. Kalıcı rate limiting ve idempotency bu aşamada uygulanmadı.

Doğrulama: npm test 16/16, npm run lint başarılı. Kontrollü kayıt fonksiyonuyla tamamlanmayı bekleme ve başarısız kayıtta success=false sınandı. Gerçek yerel HTTP istekleri 400/422/503 sonuçlarını doğruladı. PostgreSQL bağlantısı ve gerçek kayıt henüz sınanmadı; sıradaki adım gizli bağlantı ayarı ve şema uygulaması.

## Gerçek PostgreSQL bağlantısı ve kalıcılık — 30 Eylül 2026

Aday gerçek bağlantı bilgisini sohbete göndermeden .env.local dosyasına yazdı. Codex bağlantı değerini çıktıya basmadan Neon PostgreSQL 17.11 bağlantısını doğruladı; hedef tablo yoktu. 001 migration npm run db:setup ile uygulandı. Yerel uygulama bu aşamada Neon kullanıyor; bilgisayardaki PostgreSQL uygulamaya bağlanmadı.

Tekrarlanabilir entegrasyon betiği eklendi. API üzerinden kurgusal Deniz Örnek ve benzersiz example.com adresiyle gönderilen talep 201 döndü. Kayıt ID 1, created_at 2026-09-30T12:38:46.109Z. Tüm alanlar API havuzundan bağımsız DB bağlantısıyla karşılaştırıldı, bağlantı kapatılıp yeniden açıldığında kayıt tekrar okundu. Kurgusal kayıt kalıcılık kanıtı olarak bırakıldı.

51 karakterlik isim API üzerinde 422 aldı; aynı test e-postası için ikinci satır oluşmadı. Doğrudan SQL ile sınanan 51 karakter DB CHECK kısıtına takıldı (23514); işlem ROLLBACK ile kapandı. npm run lint ve 16 birim testi tekrar geçti. .env.local Git dışında kaldı. Ham bağlantı ve hata ayrıntıları yazdırılmadı.

pg, sslmode=require yorumunun gelecekte değişeceğine ilişkin uyarı verdi. Mevcut bağlantı başarılı; TLS doğrulaması gevşetilmedi. Henüz form, canlı web yayını ve production build doğrulanmadı; bu aşama tarayıcı uçtan uca testi olarak sunulmaz.

## Form aşaması kayıtlarının tamamlanması

Önceki aşamanın belge yazımı kullanım limiti nedeniyle otomatik onay denetiminden geçemedi ve çalıştırılmadı. Aday devam istediğinde erişim yeniden kontrol edildi ve geri geldi. Aşağıdaki kayıtlar önceki aşamadaki gerçek araç sonuçlarını belgeler.

Codex Client Component formu, ortak doğrulama, etiketler, aria-invalid/aria-describedby, canlı durum mesajı, gönderim kilidi ve 20 saniyelik timeout ekledi. Kayıt 201 + success=true + id ile doğrulanır; hata halinde girdiler korunur. Kod incelemesinde sunucu alan hatası sonrası disabled alanın odaklanması sorunu ihtimali görülerek useEffect ile render sonrası odaklama yapıldı; bu otomatik testin bulduğu hata olarak sunulmaz.

agent-browser ile boş submit dört hata ve ilk alana odak üretti. İlk CLI click denemesi beklenen olayı tetiklemedi; requestSubmit ve ardından klavyeyle Enter kullanıldı. Gerçek tarayıcı talebi ID 3 olarak Neon üzerinde ayrıca doğrulandı; başarıdan sonra form temizlendi. Test tarayıcısında gecikmeli 503 simülasyonunda busy=true ve disabled buton görüldü, iki submit tek fetch üretti, hata sonrası alanlar korundu. Simülasyon kaldırıldı. Masaüstü ve 390px mobil görüntüler incelendi; yatay taşma yok, tarayıcı hata listesi boş. Son lint/build ve 16 birim testi başarılıydı.

## Hizmet içeriği

Formun önüne üç hizmeti açıklayan bölüm eklendi. Her hizmetin çözmeye çalıştığı sorun ve somut kullanım örneği yazıldı. Örnekler kurgusal hizmet senaryosu olarak açıklandı; otomasyonların demo içinde çalıştığı iddia edilmiyor. İçerik sırası sorun → hizmetler → talep formu olarak düzenlendi. Sahte müşteri yorumu veya başarı metriği eklenmedi.

Hizmet bölümü sonrası npm run lint başarılı. agent-browser ile üç hizmet başlığı, form alanları ve 390px mobilde documentWidth=390 doğrulandı. Masaüstü ve mobil ekran görüntüleri incelendi. Bu içerik/CSS değişikliğinde DB testleri tekrar çalıştırılmadı; önceki sonuçlar korunuyor.

## Görsel tasarım revizyonu — aday yönlendirmesi

Aday ilk tasarımı fazla temel buldu; örnek bir dispatch dashboard görseli ve ayrıntılı metin yönlendirmesi paylaştı. Tercihleri: açık zemin, lacivert metin, mavi/teal vurgu, outline ikonlar, hero sağında statik SaaS ürün paneli; stok fotoğraf veya AI teması olmaması. Bu yönlendirme uygulandı.

Codex özgün HTML/CSS ürün paneli (product-preview.js) ve küçük SVG ikon bileşeni (icon.js) oluşturdu. Referans ekranın markası veya görsel dosyası kopyalanmadı. Panel açıkça ürün konsepti/örnek veri olarak etiketlendi; gerçek uygulama veya canlı istatistik gibi sunulmadı. Kurgusal isimler, servis kartları, durum etiketleri, örnek grafik ve iki bildirim yalnızca görsel anlatım içindir; etkileşimsizdir. Ekran okuyuculara figür açıklaması verilir, dekoratif panel içi içerik gizlenir.

Sayfa sırası: değer önerisi + konsept panel → dağınık talep sorunu → üç çözüm → kaydet/planla/takip et → çalışan talep formu. API ve form kayıt mantığı değiştirilmedi. Arayüz için yeni paket eklenmedi. Panel mobilde hero metninin altına geçer; kartlar ve form tek sütuna iner.

Doğrulama: lint ve production build başarılı. 1440px masaüstü ve 390px mobil görüntüler incelendi, her ikisinde documentWidth viewport ile eşit. Dört gerçek form alanı yerinde. Mobil boş submit dört hata üretip odağı request-name alanına taşıdı. Tarayıcı hata listesi boş. Görsel kontrolde bildirim/konsept etiketi örtüşmesi fark edilip boşluk düzenlendi; form yardım metinleri büyütüldü. Yeni DB kaydı gerektiren mantık değişikliği yoktu, bu aşamada eski kayıt testleri tekrar edilmedi.

## Teslim odağına dönüş

Aday gidişattan memnun olmadığını, kapsamın ve zamanın önceliklendirilmesini istedi; rutin kararları Codex'e bıraktı. Yeni özellik/tasarım döngüsü açılmadı. Mevcut kayıt akışı korunarak yayın, GitHub ve kanıt belgeleri önceliklendirildi. README yeniden düzenlendi, docs/DECISIONS.md ve docs/VERIFICATION.md eklendi; DELIVERY.md teslim için hazırlandı.

Kod Prettier ile okunabilir hâle getirildi (SVG için parser yok uyarısı alındı; SVG dosyası otomatik biçimlendirilmedi, kalan JS/CSS kontrolleri geçti). Next.js proje kökü açık tanımlandı; başlangıç ikonuna karşı Akış SVG ikonu eklendi; gereksiz X-Powered-By kaldırıldı, nosniff/referrer/permissions yanıt başlıkları eklendi. Node 22.x ve Frankfurt Vercel bölgesi tanımlandı. Son 16 test, ESLint ve production build başarılı.

Vercel CLI başlangıçta profil klasöründe EXDEV verdi. Git ve yayın dışında tutulan .vercel-cli klasörüyle düzeltildi; mevcut oturum olmadığı saptandı, aday için cihaz giriş bağlantısı üretildi. Ücretli plan/abonelik açılmadı. Kimlik bilgileri çıktılara veya Git'e konulmadı.
