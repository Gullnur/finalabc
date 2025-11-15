# Postman-də Əl İlə User Yaratmaq - Addım-Addım Təlimat

## Addım 1: Signup (User Yaratmaq)

1. **Postman-i açın**
2. **Yeni Request yaradın:**
   - Method: `POST`
   - URL: `http://localhost:1000/api/v1/auth/signup`
3. **Headers əlavə edin:**
   - Key: `Content-Type`
   - Value: `application/json`
4. **Body seçin:**
   - `raw` seçin
   - `JSON` seçin
5. **Body-yə yazın:**
```json
{
  "email": "test1@example.com",
  "password": "test123"
}
```
6. **Send basın**
7. **Response gözləyirsiniz:**
```json
{
  "message": "Təsdiq kodu emailinizə göndərildi"
}
```

---

## Addım 2: Verify Kodunu Tapmaq

Email konfiqurasiya olunmayıbsa, database-dən kodu tapmalısınız:

### PostgreSQL-də:
1. **pgAdmin və ya DBeaver açın**
2. **Database-ə qoşulun:** `postgres`
3. **SQL query yazın:**
```sql
SELECT email, verification_code, code_expiry_date 
FROM users 
WHERE email = 'test1@example.com';
```
4. **`verification_code` sütunundakı kodu kopyalayın** (məsələn: `123456`)

---

## Addım 3: Verify (Email Təsdiq Etmək)

1. **Yeni Request yaradın:**
   - Method: `POST`
   - URL: `http://localhost:1000/api/v1/auth/verify`
2. **Headers əlavə edin:**
   - Key: `Content-Type`
   - Value: `application/json`
3. **Body seçin:**
   - `raw` seçin
   - `JSON` seçin
4. **Body-yə yazın:**
```json
{
  "email": "test1@example.com",
  "code": "123456"
}
```
**Qeyd:** `code` field-inə database-dən aldığınız kodu yazın!

5. **Send basın**
6. **Response gözləyirsiniz:**
```json
{
  "message": "Hesabınız aktiv edildi. İndi daxil ola bilərsiniz"
}
```

---

## Addım 4: Login (Daxil Olmaq)

1. **Yeni Request yaradın:**
   - Method: `POST`
   - URL: `http://localhost:1000/api/v1/auth/login`
2. **Headers əlavə edin:**
   - Key: `Content-Type`
   - Value: `application/json`
3. **Body seçin:**
   - `raw` seçin
   - `JSON` seçin
4. **Body-yə yazın:**
```json
{
  "email": "test1@example.com",
  "password": "test123"
}
```
5. **Send basın**
6. **Response-da token alacaqsınız:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0MUBleGFtcGxlLmNvbSIsImlhdCI6MTYzODk2NzIwMCwiZXhwIjoxNjM4OTcwODAwfQ..."
}
```

---

## Token İlə Digər API-lərə Çağırış

Digər API-lərə çağırış edərkən:

1. **Headers-ə əlavə edin:**
   - Key: `Authorization`
   - Value: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (login-dən aldığınız token)

**Nümunə:**
- Method: `GET`
- URL: `http://localhost:1000/api/products`
- Headers:
  - `Content-Type: application/json`
  - `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

---

## İkinci User Yaratmaq

Eyni addımları təkrarlayın, amma email-i dəyişdirin:

**Signup:**
```json
{
  "email": "test2@example.com",
  "password": "test123"
}
```

**Verify:** (database-dən yeni kodu tapın)
```json
{
  "email": "test2@example.com",
  "code": "654321"
}
```

**Login:**
```json
{
  "email": "test2@example.com",
  "password": "test123"
}
```

---

## Troubleshooting

### Problem: "Bu email artıq qeydiyyatdan keçib"
**Həll:** Database-dən user-i silin:
```sql
DELETE FROM users WHERE email = 'test1@example.com';
```

### Problem: "Yanlış və ya müddəti bitmiş kod"
**Həll:** 
1. Database-dən yeni kod yoxlayın:
```sql
SELECT verification_code, code_expiry_date FROM users WHERE email = 'test1@example.com';
```
2. Kodun müddəti bitibsə (code_expiry_date keçmişdirsə), user-i silib yenidən yaradın

### Problem: "Hesab aktiv deyil"
**Həll:** Verify prosesini tamamlayın və ya database-də:
```sql
UPDATE users SET is_active = true WHERE email = 'test1@example.com';
```

### Problem: "Email və ya şifrə səhvdir"
**Həll:** 
- Email-in düzgün olduğundan əmin olun
- Şifrənin düzgün olduğundan əmin olun
- User-in aktiv olduğundan əmin olun (is_active = true)

---

## Tez Test Üçün SQL (Verify Bypass)

Əgər verify prosesini keçmək istəyirsinizsə:

```sql
-- User-i aktiv etmək
UPDATE users 
SET is_active = true, verification_code = NULL, code_expiry_date = NULL 
WHERE email = 'test1@example.com';
```

Sonra birbaşa login edə bilərsiniz!


