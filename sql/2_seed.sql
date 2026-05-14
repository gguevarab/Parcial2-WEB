-- Contraseña para todos los usuarios: "password123"

INSERT INTO "roles" ("id", "role_name", "description") VALUES 
('11111111-1111-1111-1111-111111111111', 'admin', 'Administrador del sistema'),
('22222222-2222-2222-2222-222222222222', 'doctor', 'Doctor (ejemplo de rol extra)'),
('33333333-3333-3333-3333-333333333333', 'user', 'Usuario regular');

INSERT INTO "users" ("id", "email", "password", "name", "phone", "is_active") VALUES 
('44444444-4444-4444-4444-444444444444', 'admin@example.com', '$2b$10$XnEHO3UN/Bkz/0VFMS3qieyrJY6WG/knlJW0bGCu57mDLLVQ0T89.', 'Admin User', '1234567890', true),
('55555555-5555-5555-5555-555555555555', 'user@example.com', '$2b$10$XnEHO3UN/Bkz/0VFMS3qieyrJY6WG/knlJW0bGCu57mDLLVQ0T89.', 'Regular User', null, true);

INSERT INTO "users_roles_roles" ("usersId", "rolesId") VALUES 
('44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111'),
('55555555-5555-5555-5555-555555555555', '33333333-3333-3333-3333-333333333333');
