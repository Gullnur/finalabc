# Postman Troubleshooting - "Bu email artıq qeydiyyatdan keçib"

## Problem
Signup edərkən bu xəta alırsınız:
```json
{
    "error": "Bad Request",
    "message": "Bu email artıq qeydiyyatdan keçib",
    "timestamp": "2025-11-15T14:18:00.654978100",
    "status": 400
}
```

## Həll Yolları

### Seçim 1: User-i silmək və yenidən yaratmaq (Tövsiyə olunur)

**PostgreSQL-də:**
```sql
-- User-i silmək
DELETE FROM users WHERE email = 'test1@example.com';
```

Sonra Postman-də yenidən signup edin.

---

### Seçim 2: Mövcud user-i aktiv etmək və login olmaq

**PostgreSQL-də:**
```sql
-- User-i aktiv etmək
UPDATE users 
SET is_active = true, 
    verification_code = NULL, 
    code_expiry_date = NULL 
WHERE email = 'test1@example.com';
```

Sonra Postman-də birbaşa login edin (verify lazım deyil):
- **POST** `http://localhost:1000/api/v1/auth/login`
- Body:
```json
{
  "email": "test1@example.com",
  "password": "test123"
}
```

---

### Seçim 3: Fərqli email istifadə etmək

Postman-də signup edərkən fərqli email istifadə edin:
```json
{
  "email": "test2@example.com",
  "password": "test123"
}
```

---

## Mövcud User-ləri Görmək

Database-də hansı user-lərin olduğunu görmək üçün:
```sql
SELECT id, email, is_active, verification_code, role 
FROM users 
ORDER BY id DESC;
```

---

## Tez Həll (Copy-Paste)

**User-i silmək:**
```sql
DELETE FROM users WHERE email = 'test1@example.com';
```

**Və ya aktiv etmək:**
```sql
UPDATE users SET is_active = true, verification_code = NULL, code_expiry_date = NULL WHERE email = 'test1@example.com';
```


