/*
  # إنشاء جداول الإشعارات والتقارير وصلاحيات المستخدمين

  1. الجداول الجديدة
    - `notifications`
      - `id` (integer, primary key)
      - `title` (text) - عنوان الإشعار
      - `message` (text) - محتوى الإشعار
      - `type` (text) - نوع الإشعار
      - `priority` (text) - أولوية الإشعار
      - `user_id` (integer) - المستخدم المستهدف
      - `is_read` (boolean) - مقروء أم لا
      - `related_to_type` (text) - نوع العنصر المرتبط
      - `related_to_id` (integer) - معرف العنصر المرتبط
      - `sender` (text) - المرسل
      - `created_at` (timestamp)

    - `reports`
      - `id` (integer, primary key)
      - `title` (text) - عنوان التقرير
      - `type` (text) - نوع التقرير
      - `parameters` (jsonb) - معاملات التقرير
      - `data` (jsonb) - بيانات التقرير
      - `format` (text) - تنسيق التقرير
      - `generated_by` (integer) - منشئ التقرير
      - `generated_at` (timestamp)

    - `user_permissions`
      - `id` (integer, primary key)
      - `user_id` (integer) - معرف المستخدم
      - `module` (text) - النظام/الوحدة
      - `permissions` (text[]) - قائمة الصلاحيات
      - `governorate_restricted` (boolean) - مقيد بالمحافظة
      - `allowed_governorates` (text[]) - المحافظات المسموحة
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. الأمان
    - تفعيل RLS على جميع الجداول
    - إضافة سياسات مناسبة لكل جدول
*/

CREATE TABLE IF NOT EXISTS notifications (
  id serial PRIMARY KEY,
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'warning', 'error', 'success', 'news', 'announcement', 'reminder', 'update', 'security', 'document', 'user', 'report')),
  priority text NOT NULL DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  is_read boolean DEFAULT false,
  related_to_type text CHECK (related_to_type IN ('case', 'waqf_land', 'appointment', 'document', 'news', 'announcement', 'activity', 'user', 'report', 'security')),
  related_to_id integer,
  sender text DEFAULT 'النظام',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS reports (
  id serial PRIMARY KEY,
  title text NOT NULL,
  type text NOT NULL DEFAULT 'general' CHECK (type IN ('financial', 'cases', 'lands', 'performance', 'custom', 'general')),
  parameters jsonb DEFAULT '{}',
  data jsonb DEFAULT '{}',
  format text NOT NULL DEFAULT 'pdf' CHECK (format IN ('pdf', 'excel', 'csv', 'json')),
  generated_by integer REFERENCES users(id),
  generated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_permissions (
  id serial PRIMARY KEY,
  user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module text NOT NULL CHECK (module IN ('cases_management', 'waqf_lands', 'documents', 'archive', 'gis', 'users', 'reports', 'settings', 'appointments', 'notifications')),
  permissions text[] NOT NULL DEFAULT '{}',
  governorate_restricted boolean DEFAULT false,
  allowed_governorates text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, module)
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_permissions ENABLE ROW LEVEL SECURITY;

-- سياسات الإشعارات
CREATE POLICY "Users can read their own notifications"
  ON notifications
  FOR SELECT
  TO authenticated
  USING (user_id::text = auth.uid()::text);

CREATE POLICY "Users can update their own notifications"
  ON notifications
  FOR UPDATE
  TO authenticated
  USING (user_id::text = auth.uid()::text);

CREATE POLICY "Admins can create notifications"
  ON notifications
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role IN ('admin', 'super_admin', 'manager')
    )
  );

-- سياسات التقارير
CREATE POLICY "Users can read reports"
  ON reports
  FOR SELECT
  TO authenticated
  USING (
    generated_by::text = auth.uid()::text OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role IN ('admin', 'super_admin', 'manager')
    )
  );

CREATE POLICY "Users can create reports"
  ON reports
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role IN ('admin', 'super_admin', 'manager', 'employee')
    )
  );

-- سياسات صلاحيات المستخدمين
CREATE POLICY "Users can read their own permissions"
  ON user_permissions
  FOR SELECT
  TO authenticated
  USING (user_id::text = auth.uid()::text);

CREATE POLICY "Admins can manage all permissions"
  ON user_permissions
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role IN ('admin', 'super_admin')
    )
  );

-- إنشاء فهارس للأداء
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);

CREATE INDEX IF NOT EXISTS idx_reports_type ON reports(type);
CREATE INDEX IF NOT EXISTS idx_reports_generated_by ON reports(generated_by);
CREATE INDEX IF NOT EXISTS idx_reports_generated_at ON reports(generated_at);

CREATE INDEX IF NOT EXISTS idx_user_permissions_user_id ON user_permissions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_permissions_module ON user_permissions(module);