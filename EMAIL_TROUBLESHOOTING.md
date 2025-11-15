# Email Göndərilmədi - Həll Yolu

## Problem
Signup edəndə "Təsdiq kodu emailinizə göndərildi" mesajı gəlir, amma email-ə heç nə gəlmir.

## Səbəb
Email konfiqurasiyası (SMTP) düzgün quraşdırılmayıb və ya email göndərilmir. Amma verify kodu database-də saxlanılır!

## Həll: Verify Kodunu Database-dən Tapmaq

### Adım 1: Database-ə qoşulun
PostgreSQL-də `postgres` database-inə qoşulun.

### Adım 2: Verify kodunu tapın

**Son yaradılan user üçün:**
```sql
SELECT email, verification_code, code_expiry_date, is_active
FROM users 
ORDER BY id DESC 
LIMIT 1;
```

**Xüsusi email üçün:**
```sql
SELECT email, verification_code, code_expiry_date, is_active
FROM users 
WHERE email = 'test1@example.com';
```

**Bütün user-ləri görmək:**
```sql
SELECT id, email, verification_code, code_expiry_date, is_active
FROM users 
ORDER BY id DESC;
```

### Adım 3: Postman-də Verify Edin

Tapdığınız `verification_code`-u istifadə edin:

**POST** `http://localhost:1000/api/v1/auth/verify`

**Body:**
```json
{
  "email": "test1@example.com",
  "code": "123456"
}
```
*(code-u database-dən aldığınız kodla əvəz edin)*

---

## Alternativ: User-i Aktiv Etmək (Verify Bypass)

Əgər verify kodunu istifadə etmək istəmirsinizsə, user-i birbaşa aktiv edə bilərsiniz:

```sql
UPDATE users 
SET is_active = true, 
    verification_code = NULL, 
    code_expiry_date = NULL 
WHERE email = 'test1@example.com';
```

Sonra birbaşa login edə bilərsiniz!

---

## Email Konfiqurasiyasını Düzəltmək (İstəyə görə)

Email göndərmək istəyirsinizsə, `IdentityService/src/main/resources/application.properties` faylında:

```properties
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

**Qeyd:** Gmail üçün "App Password" istifadə etməlisiniz, adi şifrə işləməz.

---

## Tez Həll (Copy-Paste)

**1. Verify kodunu tapmaq:**
```sql
SELECT email, verification_code FROM users WHERE email = 'test1@example.com';
```

**2. Və ya user-i aktiv etmək:**
```sql
UPDATE users SET is_active = true, verification_code = NULL WHERE email = 'test1@example.com';
```


