# Postman-də User Yaratmaq və Login Olmaq - Təlimatlar

## 1. Postman Collection Import Etmək

1. Postman-i açın
2. **Import** düyməsini basın
3. `Postman_Collection.json` faylını seçin və import edin

## 2. User Yaratmaq (Signup)

### Adım 1: Signup Request Göndərmək

1. Postman-də **"Signup - User 1"** request-ini açın
2. **Send** düyməsini basın
3. Response-da mesaj görəcəksiniz: `"Təsdiq kodu emailinizə göndərildi"`

### Adım 2: Verify Kodunu Tapmaq

Email konfiqurasiya olunmayıbsa, verify kodunu database-dən tapmalısınız:

**PostgreSQL-də:**
```sql
SELECT email, verification_code, code_expiry_date, is_active 
FROM users 
WHERE email = 'admin@test.com';
```

**Və ya bütün user-ləri görmək üçün:**
```sql
SELECT id, email, verification_code, code_expiry_date, is_active, role 
FROM users 
ORDER BY id DESC;
```

### Adım 3: Verify Etmək

1. Database-dən aldığınız `verification_code`-u kopyalayın
2. **"Verify - User 1"** request-ini açın
3. Body-də `code` field-ini database-dən aldığınız kodla dəyişdirin
4. **Send** düyməsini basın
5. Response: `"Hesabınız aktiv edildi. İndi daxil ola bilərsiniz"`

## 3. Login Olmaq

1. **"Login - User 1"** request-ini açın
2. **Send** düyməsini basın
3. Response-da `token` alacaqsınız:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Bu token-i kopyalayın və digər API çağırışlarında istifadə edin.

## 4. Token İlə API Çağırışı

Digər API-lərə çağırış edərkən, Header-a token əlavə edin:

**Header:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Nümunə User-lar

### User 1: admin@test.com
- Password: `admin123`
- Role: `ROLE_USER` (default)

### User 2: user@test.com
- Password: `user123`
- Role: `ROLE_USER` (default)

### User 3: manager@test.com
- Password: `manager123`
- Role: `ROLE_USER` (default)

## Tez Test Üçün SQL Script

Əgər email konfiqurasiya olunmayıbsa və tez test etmək istəyirsinizsə, database-də birbaşa user yarada bilərsiniz:

```sql
-- User yaratmaq (şifrə: admin123)
INSERT INTO users (email, password_hash, role, is_active, verification_code, code_expiry_date)
VALUES (
  'admin@test.com',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', -- admin123
  'ROLE_USER',
  true, -- Aktiv etmək üçün true
  NULL,
  NULL
);

-- Daha çox user yaratmaq
INSERT INTO users (email, password_hash, role, is_active, verification_code, code_expiry_date)
VALUES 
  ('user@test.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ROLE_USER', true, NULL, NULL),
  ('manager@test.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ROLE_USER', true, NULL, NULL);
```

**Qeyd:** `$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy` = `admin123` şifrəsinin hash-i

## Troubleshooting

### Problem: "Bu email artıq qeydiyyatdan keçib"
**Həll:** Database-dən user-i silin:
```sql
DELETE FROM users WHERE email = 'admin@test.com';
```

### Problem: "Yanlış və ya müddəti bitmiş kod"
**Həll:** 
1. Database-dən yeni kod yoxlayın
2. Və ya user-i silib yenidən yaradın
3. Və ya `is_active = true` edin və `verification_code = NULL` edin

### Problem: "Hesab aktiv deyil"
**Həll:** Database-də `is_active = true` edin:
```sql
UPDATE users SET is_active = true WHERE email = 'admin@test.com';
```

## API Endpoint-lər

- **Signup:** `POST http://localhost:1000/api/v1/auth/signup`
- **Verify:** `POST http://localhost:1000/api/v1/auth/verify`
- **Login:** `POST http://localhost:1000/api/v1/auth/login`
- **Validate Token:** `POST http://localhost:1000/api/v1/auth/validate`


