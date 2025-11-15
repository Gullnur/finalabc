# Postman Collection - User Yaratmaq və Login Olmaq

## Base URL
```
http://localhost:1000
```

## 1. Signup (User Yaratmaq)

**Method:** `POST`  
**URL:** `http://localhost:1000/api/v1/auth/signup`  
**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "user1@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Təsdiq kodu emailinizə göndərildi"
}
```

## 2. Verify (Email Təsdiq Etmək)

**Method:** `POST`  
**URL:** `http://localhost:1000/api/v1/auth/verify`  
**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "user1@example.com",
  "code": "123456"
}
```

**Qeyd:** Kod email-ə göndərilir. Əgər email konfiqurasiya olunmayıbsa, database-dən kodu yoxlaya bilərsiniz.

**Response:**
```json
{
  "message": "Hesabınız aktiv edildi. İndi daxil ola bilərsiniz"
}
```

## 3. Login (Daxil Olmaq)

**Method:** `POST`  
**URL:** `http://localhost:1000/api/v1/auth/login`  
**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "user1@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## 4. Token Validate (Token Yoxlamaq)

**Method:** `POST`  
**URL:** `http://localhost:1000/api/v1/auth/validate`  
**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**
```json
{
  "valid": true
}
```

## Nümunə User-lar

### User 1
```json
{
  "email": "admin@test.com",
  "password": "admin123"
}
```

### User 2
```json
{
  "email": "user@test.com",
  "password": "user123"
}
```

### User 3
```json
{
  "email": "manager@test.com",
  "password": "manager123"
}
```

## Postman Collection Import

Postman-də yeni collection yaradın və aşağıdakı request-ləri əlavə edin:

1. **Signup - User 1**
   - POST `http://localhost:1000/api/v1/auth/signup`
   - Body: `{"email": "admin@test.com", "password": "admin123"}`

2. **Verify - User 1**
   - POST `http://localhost:1000/api/v1/auth/verify`
   - Body: `{"email": "admin@test.com", "code": "123456"}`

3. **Login - User 1**
   - POST `http://localhost:1000/api/v1/auth/login`
   - Body: `{"email": "admin@test.com", "password": "admin123"}`

Eyni şəkildə User 2 və User 3 üçün də request-lər yarada bilərsiniz.

## Qeyd

Əgər email konfiqurasiya olunmayıbsa, verify kodunu database-dən yoxlaya bilərsiniz:
- Database: `postgres`
- Table: `users`
- Column: `verification_code`


