/*
  # إنشاء جدول المستخدمين والموظفين

  1. الجداول الجديدة
    - `users`
      - `id` (integer, primary key)
      - `email` (text, unique)
      - `name` (text)
      - `role` (text) - الدور الوظيفي
      - `department` (text) - القسم
      - `governorate` (text) - المحافظة
      - `phone` (text)
      - `avatar_url` (text)
      - `is_active` (boolean)
      - `last_login` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. الأمان
    - تفعيل RLS على جدول `users`
    - إضافة سياسات للمستخدمين المصادق عليهم
*/

CREATE TABLE IF NOT EXISTS users (
  id serial PRIMARY KEY,
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  role text NOT NULL DEFAULT 'employee' CHECK (role IN ('super_admin', 'admin', 'manager', 'employee', 'viewer')),
  department text NOT NULL,
  governorate text REFERENCES governorates(code),
  phone text,
  avatar_url text,
  is_active boolean DEFAULT true,
  last_login timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text OR role IN ('admin', 'super_admin'));

CREATE POLICY "Admins can manage all users"
  ON users
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role IN ('admin', 'super_admin')
    )
  );

-- إدراج بيانات المستخدمين التجريبية
INSERT INTO users (email, name, role, department, governorate, phone, is_active) VALUES
  ('admin@awqaf.gov.ps', 'مدير النظام العام', 'super_admin', 'الإدارة العامة', 'JER', '+970 2 298 2530', true),
  ('cases.manager.jerusalem@awqaf.gov.ps', 'مدير القضايا - القدس', 'manager', 'إدارة القضايا', 'JER', '+970 2 298 2531', true),
  ('lands.manager.ramallah@awqaf.gov.ps', 'مدير الأراضي الوقفية - رام الله', 'manager', 'إدارة الأراضي الوقفية', 'RAM', '+970 2 298 2532', true),
  ('documents.manager@awqaf.gov.ps', 'مدير الوثائق والأرشيف', 'manager', 'إدارة الوثائق', 'JER', '+970 2 298 2533', true),
  ('employee.nablus@awqaf.gov.ps', 'موظف - نابلس', 'employee', 'المكتب الإقليمي', 'NAB', '+970 9 238 4567', true),
  ('regional.manager.gaza@awqaf.gov.ps', 'المدير الإقليمي - غزة', 'manager', 'الإدارة الإقليمية', 'GAZ', '+970 8 282 3456', true)
ON CONFLICT (email) DO NOTHING;