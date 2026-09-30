# Mimari ve problem çözme kararları

## Kapsam

Değerlendirme, bir otomasyon motoru değil kurgusal hizmetin anlaşılır sayfasını ve kalıcı talep kaydını istiyor. Bu nedenle dashboard statik konsept, form gerçek uygulama olarak ayrıldı. Kimlik doğrulama ve yönetim paneli eklenmedi; zaman doğrulanabilir kayıt akışına ayrıldı.

## Neden bu teknolojiler?

React deneyimini korumak ve ayrı backend yayını yönetmemek için Next.js App Router kullanıldı. Aday PostgreSQL istedi. Ücretsiz barındırma için Neon seçildi; uygulama kodunu SQL akışı üzerinden anlatabilmek için ORM yerine pg ve parametreli sorgu kullanıldı. JavaScript, adayın bildiği dil; ek TypeScript öğrenme maliyeti bu kısa teslimde alınmadı. CSS ve küçük SVG ikonlar ekstra UI bağımlılığı gerektirmedi.

## Başarı mesajının doğruluğu

En kritik hata, ağ isteği biter bitmez veya yalnızca form geçerli diye başarı göstermektir. Sunucu INSERT sonucunu bekler, tek satır ve ID kontrol eder. Form da HTTP 201, success=true ve ID kontrol eder. Testte kayıt Promise'i bekletilip bu sırada yanıt dönmediği sınandı; DB hatasında başarı dönmediği ayrıca kontrol edildi.

Bağlantı kayıt sonrasında kopabilir. Bu durumda istemci kaydın yapılmadığını bilemez. Mesaj bu belirsizliği açıklar, alanları korur ve otomatik tekrar göndermez. Tam çözüm olan kalıcı idempotency bu sürümde yok; sınır README'de açıkça yazıldı.

## Aynı kuralı iki yerde çalıştırmak

Ortak saf doğrulama fonksiyonu istemci ve sunucuda ayrı ayrı çağrılır. Böylece kullanıcı erken geri bildirim alır, fakat tarayıcıya güvenilmez. Sunucu yanlış tipleri ve hizmet listesinin dışındaki değerleri reddeder. PostgreSQL kısıtları son bir bütünlük kontrolü sağlar. İsim üst sınırı adayın isteğiyle 100'den 50'ye indirildi; JS, SQL ve test aynı değişiklikte güncellendi.

İsimler yalnızca İngilizce harflerle sınırlandırılmadı. SQL güvenliği adları yasaklamakla değil, parametreli sorguyla sağlandı. Karakter uzunluğu Unicode kod noktaları üzerinden sayılır. E-posta biçim kontrolü sahiplik doğrulaması olarak sunulmaz.

## Güvenli hata ve kaynak yönetimi

JSON gövdesi gerçek byte sayısıyla 16 KiB sınırlanır. DB bağlantıları küçük bir havuzda yeniden kullanılır; bağlantı ve sorgu zaman aşımı vardır. Sunucu cevaplarına şifre, ham DB hatası veya kişisel veri yazılmaz. Kaydı okuyan herkese açık endpoint yoktur. Ücretsiz, küçük kapsamlı bir demo olduğu için dağıtık rate limiting eklenmedi; bunun tam kötüye kullanım koruması olmadığı belirtilir.

## Ne öğrendik / neyi değiştirdik?

- İkinci dev sunucusu açılması uygulama hatası değildi; mevcut süreç kullanıldı.
- Gereksiz importlar temizlendi.
- Sunucu alan hataları dönünce disabled alan odağı, render sonrası useEffect ile düzenlendi.
- İlk sade tasarım adayın beklentisini karşılamadı; adayın dashboard referansına göre yeniden çalışıldı. Referans gerçek özellik taahhüdüne dönüştürülmedi.
- Tasarıma fazla zaman ayrılması teslimi geciktirdi. Son aşamada kapsam dondurulup yayın, erişim ve kanıtlar önceliklendirildi.
- Araç kullanım limiti bir belge yazımını engelledi; işlem başarılı gösterilmedi, erişim dönünce tamamlandı.
