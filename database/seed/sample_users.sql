-- Sample roles and users for the smart library system.

INSERT INTO roles (role_id, role_code, role_name, description, is_active, created_at, updated_at) VALUES
(1, 'ADMIN', 'Administrator', 'Full system access for library staff and admins.', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'USER', 'Library Member', 'Standard patron account for borrowing books.', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO users (
    user_id,
    role_id,
    library_card_no,
    first_name,
    last_name,
    username,
    email,
    phone_number,
    password_hash,
    status,
    last_login_at,
    password_changed_at,
    email_verified_at,
    deleted_at,
    created_at,
    updated_at
) VALUES
(1, 1, 'LIB-00001', 'System', 'Admin', 'admin', 'admin@library.local', '9999999999', '$2a$10$sampleadminhash', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 'LIB-00002', 'Aarav', 'Sharma', 'aarav.sharma', 'aarav.sharma@example.com', '8888888888', '$2a$10$sampleuserhash1', 'ACTIVE', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 2, 'LIB-00003', 'Meera', 'Iyer', 'meera.iyer', 'meera.iyer@example.com', '7777777777', '$2a$10$sampleuserhash2', 'ACTIVE', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);