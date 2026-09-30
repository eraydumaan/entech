-- Bir kez, geliştirme ve canlı veritabanlarına ayrı ayrı uygulanacak ilk şema.
-- Gerçek kişisel veri kullanmayın. Mevcut tabloyu değiştirmek için yeni migration yazın.
BEGIN;

CREATE TABLE service_requests (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text NOT NULL CHECK (char_length(btrim(name)) BETWEEN 2 AND 50),
  email text NOT NULL CHECK (char_length(btrim(email)) BETWEEN 3 AND 254),
  service text NOT NULL CHECK (service IN (
    'service-intake', 'task-tracking', 'reporting'
  )),
  description text NOT NULL CHECK (char_length(btrim(description)) BETWEEN 10 AND 2000),
  created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);

COMMIT;


