# Doğrulama kanıtları

Yalnızca kurgusal veri kullanıldı. Durumlar araç çıktıları ve gerçek gözlemlere dayanır.

| Gereksinim                     | Kanıt                                                               | Durum                |
| ------------------------------ | ------------------------------------------------------------------- | -------------------- |
| Hizmetin kime/niçin sunulduğu  | Teknik servis hedefi, üç hizmet, örnek konsept, çalışan talep formu | Yerelde tamam        |
| Mobil/masaüstü                 | 1440px ve 390px ekran görüntüleri; documentWidth viewport ile aynı  | Geçti                |
| Dört form alanı                | İsim, e-posta, hizmet seçimi, açıklama                              | Geçti                |
| İstemci doğrulaması            | Boş submit dört hata ve ilk alana odak verdi                        | Geçti                |
| Sunucu doğrulaması             | 422 ve alan hataları; 51 karakter kayıt oluşturmadı                 | Geçti                |
| Gönderiliyor                   | Gecikmeli fetch simülasyonunda aria-busy ve disabled buton          | Geçti                |
| Başarı yalnızca kayıt sonrası  | Birim testte bekletilen Promise; gerçek API 201 + kayıt ID          | Geçti                |
| Hata ve değer koruma           | Test tarayıcısında gecikmeli 503, alanlar aynı kaldı                | Geçti; simülasyon    |
| Çift gönderim                  | İki submit olayında tek fetch                                       | Geçti; aynı tarayıcı |
| Kalıcı kayıt                   | Neon ID 1 bağımsız bağlantı ve yeniden bağlantıyla okundu           | Geçti                |
| Gerçek tarayıcı kaydı          | Enter ile form gönderildi, ID 3 ayrı DB sorgusuyla doğrulandı       | Geçti                |
| DB kısıtı                      | Doğrudan 51 karakter INSERT, SQLSTATE 23514; rollback               | Geçti                |
| Hatalı JSON/Content-Type/boyut | 400/415/413 birim testleri                                          | Geçti                |
| Gizli değerler                 | .env.local ve CLI auth git check-ignore ile hariç                   | Geçti                |
| Kod/derleme                    | 16 test, ESLint, production build                                   | Geçti                |
| Canlı URL ve canlı kayıt       | Yayın sonrası eklenecek                                             | Bekliyor             |
| İncelenebilir commit           | DELIVERY.md ile eşleştirilecek                                      | Bekliyor             |

## Gerçek kayıtlar

- ID 1: 2026-09-30T12:38:46.109Z, kurgusal entegrasyon kaydı.
- ID 3: browser-test@example.com ile tarayıcıdan oluşturulan kurgusal görev takibi talebi.

PostgreSQL identity dizileri geri alınan hatalı işlemlerde de ilerleyebilir. Bu nedenle ID aralıklarının kesintisiz olması beklenmez.

## Test kapsamının sınırı

Hata UI testi veritabanını kapatmadı; yalnızca test tarayıcısında gecikmeli 503 üretildi. Gerçek DB kayıt ve okuma ayrı testte yapıldı. Tam ekran okuyucu, WCAG, yük testi, bot koruması ve birden fazla bölge testi yapılmadı. HTTP kontrolü tek başına görsel test olarak raporlanmadı.

## Tekrar çalıştırma

README kurulumunu izleyin. npm test ve npm run lint DB gerektirmez. npm run test:integration çalışan uygulama ve DB ister, kalıcı kurgusal kayıt bırakır. Canlı URL için TEST_BASE_URL ayarlanmalıdır. Her yeni çalıştırmanın sonucunu ayrı değerlendirin; eski test başarısı yeni değişiklik için otomatik kanıt değildir.
