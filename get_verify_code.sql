-- Verify kodunu database-dən tapmaq

-- Bütün user-ləri və verify kodlarını görmək
SELECT 
    id,
    email,
    verification_code,
    code_expiry_date,
    is_active,
    role
FROM users 
ORDER BY id DESC;

-- Xüsusi email üçün verify kodu
SELECT 
    email,
    verification_code,
    code_expiry_date,
    is_active
FROM users 
WHERE email = 'test1@example.com';

-- Son yaradılan user-in verify kodu
SELECT 
    email,
    verification_code,
    code_expiry_date
FROM users 
ORDER BY id DESC 
LIMIT 1;

-- Müddəti bitməmiş kodlar
SELECT 
    email,
    verification_code,
    code_expiry_date
FROM users 
WHERE code_expiry_date > NOW() 
  AND verification_code IS NOT NULL;


