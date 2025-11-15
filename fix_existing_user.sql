-- Mövcud user-ləri görmək
SELECT id, email, is_active, verification_code, code_expiry_date, role 
FROM users 
ORDER BY id DESC;

-- Xüsusi email-i görmək
SELECT id, email, is_active, verification_code, code_expiry_date, role 
FROM users 
WHERE email = 'test1@example.com';

-- User-i silmək (yenidən signup etmək üçün)
DELETE FROM users WHERE email = 'test1@example.com';

-- Və ya user-i aktiv etmək və verify kodunu silmək (birbaşa login üçün)
UPDATE users 
SET is_active = true, 
    verification_code = NULL, 
    code_expiry_date = NULL 
WHERE email = 'test1@example.com';

-- Bütün test user-ləri silmək
DELETE FROM users WHERE email LIKE '%@example.com';

-- Bütün user-ləri silmək (diqqətli olun!)
-- DELETE FROM users;


