/*
  # إنشاء جدول القضايا والمنازعات

  1. الجداول الجديدة
    - `cases`
      - `id` (integer, primary key)
      - `title` (text) - عنوان القضية
      - `description` (text) - وصف القضية
      - `type` (text) - نوع القضية
      - `status` (text) - حالة القضية
      - `priority` (text) - أولوية القضية
      - `waqf_land_id` (integer) - معرف الأرض الوقفية المرتبطة
      - `assigned_to` (integer) - المسؤول عن القضية
      - `created_by` (integer) - منشئ القضية
      - `due_date` (date) - الموعد النهائي
      - `resolved_date` (date) - تاريخ الحل
      - `resolution_notes` (text) - ملاحظات الحل
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `case_timeline`
      - `id` (integer, primary key)
      - `case_id` (integer) - معرف القضية
      - `action` (text) - الإجراء المتخذ
      - `description` (text) - وصف الإجراء
      - `user_id` (integer) - المستخدم الذي اتخذ الإجراء
      - `user_name` (text) - اسم المستخدم
      - `timestamp` (timestamp)
      - `attachments` (jsonb) - المرفقات

  2. الأمان
    - تفعيل RLS على الجداول
    - إضافة سياسات للمستخدمين المصادق عليهم
*/

CREATE TABLE IF NOT EXISTS cases (
  id serial PRIMARY KEY,
  title text NOT NULL,
  description text,
  type text NOT NULL DEFAULT 'ownership' CHECK (type IN ('ownership', 'boundary', 'income', 'maintenance', 'legal', 'administrative')),
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'pending', 'resolved', 'closed')),
  priority text NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  waqf_land_id integer REFERENCES waqf_lands(id),
  assigned_to integer REFERENCES users(id),
  created_by integer REFERENCES users(id),
  due_date date,
  resolved_date date,
  resolution_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS case_timeline (
  id serial PRIMARY KEY,
  case_id integer NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  action text NOT NULL,
  description text,
  user_id integer REFERENCES users(id),
  user_name text NOT NULL,
  timestamp timestamptz DEFAULT now(),
  attachments jsonb DEFAULT '[]'
);

ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_timeline ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read cases"
  ON cases
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Managers can manage cases"
  ON cases
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role IN ('admin', 'super_admin', 'manager')
    )
  );

CREATE POLICY "Users can read case timeline"
  ON case_timeline
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can add to case timeline"
  ON case_timeline
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role IN ('admin', 'super_admin', 'manager', 'employee')
    )
  );

-- إنشاء فهارس للأداء
CREATE INDEX IF NOT EXISTS idx_cases_status ON cases(status);
CREATE INDEX IF NOT EXISTS idx_cases_type ON cases(type);
CREATE INDEX IF NOT EXISTS idx_cases_assigned_to ON cases(assigned_to);
CREATE INDEX IF NOT EXISTS idx_cases_waqf_land ON cases(waqf_land_id);
CREATE INDEX IF NOT EXISTS idx_cases_due_date ON cases(due_date);
CREATE INDEX IF NOT EXISTS idx_case_timeline_case_id ON case_timeline(case_id);
CREATE INDEX IF NOT EXISTS idx_cases_search ON cases USING GIN(to_tsvector('arabic', title || ' ' || COALESCE(description, '')));