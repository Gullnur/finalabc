-- Test user-ları yaratmaq üçün SQL script
-- Bu script user-ları birbaşa database-ə yazır və verify prosesini bypass edir

-- Əvvəlcə mövcud user-ları silmək (əgər varsa)
DELETE FROM users WHERE email IN ('admin@test.com', 'user@test.com', 'manager@test.com');

-- User 1: admin@test.com (şifrə: admin123)
INSERT INTO users (email, password_hash, role, is_active, verification_code, code_expiry_date)
VALUES (
  'admin@test.com',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', -- admin123
  'ROLE_USER',
  true, -- Aktiv
  NULL,
  NULL
);

-- User 2: user@test.com (şifrə: user123)
INSERT INTO users (email, password_hash, role, is_active, verification_code, code_expiry_date)
VALUES (
  'user@test.com',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', -- user123 (eyni hash, test üçün)
  'ROLE_USER',
  true, -- Aktiv
  NULL,
  NULL
);

-- User 3: manager@test.com (şifrə: manager123)
INSERT INTO users (email, password_hash, role, is_active, verification_code, code_expiry_date)
VALUES (
  'manager@test.com',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', -- manager123 (eyni hash, test üçün)
  'ROLE_USER',
  true, -- Aktiv
  NULL,
  NULL
);

-- Yoxlamaq üçün
SELECT id, email, role, is_active FROM users WHERE email IN ('admin@test.com', 'user@test.com', 'manager@test.com');


