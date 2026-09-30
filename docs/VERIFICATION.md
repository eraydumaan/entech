# Doğrulama kanıtları

Yalnızca kurgusal veri kullanıldı. Durumlar araç çıktıları ve gerçek gözlemlere dayanır.

| Gereksinim                     | Kanıt                                                               | Durum                |
| ------------------------------ | ------------------------------------------------------------------- | -------------------- |
| Hizmetin kime/niçin sunulduğu  | Teknik servis hedefi, üç hizmet, örnek konsept, çalışan talep formu | Yerelde tamam        |
| Mobil/masaüstü                 | 1440px ve 390px ekran görüntüleri; documentWidth viewport ile aynı  | Geçti                |
| Dört form alanı                | İsim, e-posta, hizmet seçimi, açıklama                              | Geçti                |
| İstemci doğrulaması            | Boş submit; ayrıca tek karakterli isim blur sırasında reddedildi    | Geçti                |
| Sunucu doğrulaması             | 422 ve alan hataları; 51 karakter kayıt oluşturmadı                 | Geçti                |
| Gönderiliyor                   | Gecikmeli fetch simülasyonunda aria-busy ve disabled buton          | Geçti                |
| Başarı yalnızca kayıt sonrası  | Birim testte bekletilen Promise; gerçek API 201 + kayıt ID          | Geçti                |
| Hata ve değer koruma           | Test tarayıcısında gecikmeli 503, alanlar aynı kaldı                | Geçti; simülasyon    |
| Çift gönderim                  | İki submit olayında tek fetch                                       | Geçti; aynı tarayıcı |
| Kalıcı kayıt                   | Neon ID 1/5/8/10/12/14 bağımsız bağlantı ve yeniden bağlantıyla okundu | Geçti              |
| Gerçek tarayıcı kaydı          | Enter ile form gönderildi, ID 3 ayrı DB sorgusuyla doğrulandı       | Geçti                |
| Dinamik hizmet seçimi          | Kart seçimi forma aktarıldı; ilerleme %0 → %25 → %100 değişti       | Geçti                |
| Etkileşimli konsept paneli     | Sekmeler metrik, tablo, durum, grafik ve bildirimleri birlikte değiştiriyor | Geçti          |
| DB kısıtı                      | Doğrudan 51 karakter INSERT, SQLSTATE 23514; rollback               | Geçti                |
| Hatalı JSON/Content-Type/boyut | 400/415/413 birim testleri                                          | Geçti                |
| Gizli değerler                 | .env.local ve CLI auth git check-ignore ile hariç                   | Geçti                |
| Kod/derleme                    | 18 test, ESLint, production build                                   | Geçti                |
| Canlı URL ve canlı kayıt       | entech-seven.vercel.app, HTTP 200, son Production kayıt ID 14       | Geçti                |
| İncelenebilir commit           | DELIVERY.md ile eşleştirilecek                                      | Bekliyor             |

## Gerçek kayıtlar

- ID 1: 2026-09-30T12:38:46.109Z, kurgusal entegrasyon kaydı.
- ID 3: browser-test@example.com ile tarayıcıdan oluşturulan kurgusal görev takibi talebi.
- ID 4: deniz.frontend.test@example.com ile yenilenen arayüzden oluşturulan kurgusal talep.
- ID 5: 2026-09-30T17:42:16.031Z, bağımsız bağlantı ve yeniden bağlantıyla okunan kurgusal entegrasyon kaydı.
- ID 8: 2026-09-30T17:57:17.794Z, canlı Production API üzerinden yazılıp bağımsız okunan kurgusal kayıt.
- ID 10: 2026-09-30T18:01:51.845Z, açık `verify-full` ayarı sonrası uyarısız yerel entegrasyon kaydı.
- ID 12: 2026-09-30T18:07:19.623Z, final Production API üzerinden uyarısız yazılıp bağımsız okunan kayıt.
- ID 14: 2026-09-30T18:56:06.853Z, genel temizlik sonrası Production API üzerinden yazılıp bağımsız bağlantı ve yeniden bağlantıyla okunan kayıt.

PostgreSQL identity dizileri geri alınan hatalı işlemlerde de ilerleyebilir. Bu nedenle ID aralıklarının kesintisiz olması beklenmez.

## Test kapsamının sınırı

Hata UI testi veritabanını kapatmadı; yalnızca test tarayıcısında gecikmeli 503 üretildi. Gerçek DB kayıt ve okuma ayrı testte yapıldı. Tam ekran okuyucu, WCAG, yük testi, bot koruması ve birden fazla bölge testi yapılmadı. HTTP kontrolü tek başına görsel test olarak raporlanmadı.

## Tekrar çalıştırma

README kurulumunu izleyin. npm test ve npm run lint DB gerektirmez. npm run test:integration çalışan uygulama ve DB ister, kalıcı kurgusal kayıt bırakır. Canlı URL için TEST_BASE_URL ayarlanmalıdır. Her yeni çalıştırmanın sonucunu ayrı değerlendirin; eski test başarısı yeni değişiklik için otomatik kanıt değildir.

## Son teslim hazırlığı kontrolü

320px ve 768px ölçümlerde yatay taşma yok. Kontrast düzeltmesi sonrası 41 örnek sayfa metninin hesaplanan oranları kontrol edildi; 4.5 altında sonuç kalmadı. Konsept panelin küçük iç metinleri bu kontrolde hariç tutuldu; gradient dahil tam otomatik erişilebilirlik denetimi yapılmadı. Repo push başarılı ancak anonim erişim 404; değerlendirici erişimi bekliyor.

Etkileşim revizyonu sonrası 1440×1000 ve 390×844 görüntüler yeniden incelendi. Panel düğmeleri erişilebilirlik ağacında görünüyor, mobil sayfa tek sütunda ve tarayıcı hata listesi boş. Bu gözlemsel kontrol tam ekran okuyucu veya otomatik WCAG denetimi değildir.

Son panel revizyonunda masaüstünde Talepler sekmesi ilk satırı “Klima bakımı”ndan “Acil klima arızası”na, grafik değerlerini `38,62,46,80,58,95,70` dizisinden `72,48,88,55,92,66,84` dizisine ve üst bildirimi “Öncelikli talep geldi” metnine çevirdi. Mobil snapshot üç sekme düğmesini erişilebilirlik ağacında gösterdi.

Son yerleşim kontrolünde dashboard küçük hero kolonu yerine 1440px viewport içinde 1168px genişlikte ana ürün yüzeyi oldu. 390px görünümde dashboard 331px'e uydu, üç sekme görünür kaldı ve yatay taşma farkı oluşmadı. Bu değişiklik sonrası 18 test, ESLint ve production build tekrar geçti.

Çerçeve kaldırma kontrolünde dashboard border değeri `0px`, box-shadow değeri `none` bulundu. Genel bakış, Talepler, İş planı, Ekibim ve Raporlar olmak üzere beş düğme erişilebilirlik ağacında ve çalışır durumda. Raporlar tıklanınca başlık “Kararlar için net raporlar”, ilk satır “Haftalık operasyon” oldu. Panel gerçek admin erişimi olarak sunulmadı; gerçek talep verisini listeleyen açık endpoint yok.

Production deployment `READY` durumunda ve https://entech-seven.vercel.app oturumsuz HTTP 200 döndü. Canlı sayfada Talepler düğmesi başlığı değiştirdi; üçüncü hizmet kartı formda `reporting` değerini ve %25 ilerlemeyi oluşturdu; tarayıcı hata listesi boştu. İlk log taramasındaki `pg` SSL gelecek sürüm uyarısından sonra bağlantı URL'si açıkça `sslmode=verify-full` olarak normalize edildi ve iki test eklendi. Yeniden yayınlanan deployment'ta canlı entegrasyon ID 12 geçti; son error log taraması temizdi.

Genel temizlikten sonra 18/18 test, ESLint ve production build yeniden geçti. Kullanılmayan create-next-app dosyalarına kalan referans, boş dosya, TODO/FIXME veya debugger bulunmadı. Mobil tarayıcı ölçümünde viewport ve belge genişliği 375px olarak eşleşti. Raporlar sekmesi başlık ve ilk tablo satırını değiştirdi; boş gönderim dört alan hatası üretti ve odağı `request-name` alanına taşıdı. Tarayıcı hata listesi boştu.

Temizlik commit'i Vercel Production'a yayımlandı. Canlı kök adres oturumsuz HTTP 200; `nosniff`, referrer ve permissions güvenlik başlıkları bulundu. Geçersiz dört alanlı istek 422 döndü. Entegrasyon testi ID 14'ü oluşturdu; bağımsız okuma, yeniden bağlantı okuması, geçersiz isteğin ek kayıt oluşturmaması ve DB isim kısıtı geçti. Son 15 dakikalık Production error log sorgusu sonuç döndürmedi.

Bildirim yerleşimi revizyonunda iki kart dashboard içindeki grafiğin altına alındı. Masaüstü tam sayfa görüntüsü görsel olarak incelendi. 390px mobil kontrolde iki kart tek sütuna indi, `documentWidth=viewportWidth=390` ölçüldü ve tarayıcı hata listesi boştu. Sekme değişiminde bildirim metinlerinin de değiştiği doğrulandı.
