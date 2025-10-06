/*
  # إنشاء جدول المواعيد والاجتماعات

  1. الجداول الجديدة
    - `appointments`
      - `id` (integer, primary key)
      - `title` (text) - عنوان الموعد
      - `description` (text) - وصف الموعد
      - `type` (text) - نوع الموعد
      - `start_time` (timestamp) - وقت البداية
      - `end_time` (timestamp) - وقت النهاية
      - `location` (text) - المكان
      - `meeting_type` (text) - نوع الاجتماع
      - `attendees` (jsonb) - قائمة الحضور
      - `related_case_id` (integer) - القضية المرتبطة
      - `related_waqf_id` (integer) - الأرض الوقفية المرتبطة
      - `status` (text) - حالة الموعد
      - `priority` (text) - أولوية الموعد
      - `created_by` (integer) - منشئ الموعد
      - `documents` (jsonb) - الوثائق المرفقة
      - `reminders` (jsonb) - التذكيرات
      - `created_at` (timestamp)

  2. الأمان
    - تفعيل RLS على جدول `appointments`
    - إضافة سياسات للمستخدمين المصادق عليهم
*/

CREATE TABLE IF NOT EXISTS appointments (
  id serial PRIMARY KEY,
  title text NOT NULL,
  description text,
  type text NOT NULL DEFAULT 'meeting' CHECK (type IN ('meeting', 'inspection', 'hearing', 'consultation')),
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  location text NOT NULL,
  meeting_type text DEFAULT 'in_person' CHECK (meeting_type IN ('in_person', 'remote', 'hybrid', 'field')),
  attendees jsonb DEFAULT '[]',
  related_case_id integer REFERENCES cases(id),
  related_waqf_id integer REFERENCES waqf_lands(id),
  status text NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled')),
  priority text NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  created_by integer REFERENCES users(id),
  documents jsonb DEFAULT '[]',
  reminders jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read appointments"
  ON appointments
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create appointments"
  ON appointments
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role IN ('admin', 'super_admin', 'manager', 'employee')
    )
  );

CREATE POLICY "Users can update their appointments"
  ON appointments
  FOR UPDATE
  TO authenticated
  USING (
    created_by::text = auth.uid()::text OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role IN ('admin', 'super_admin', 'manager')
    )
  );

-- إنشاء فهارس للأداء
CREATE INDEX IF NOT EXISTS idx_appointments_start_time ON appointments(start_time);
CREATE INDEX IF NOT EXISTS idx_appointments_type ON appointments(type);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_created_by ON appointments(created_by);
CREATE INDEX IF NOT EXISTS idx_appointments_related_case ON appointments(related_case_id);
CREATE INDEX IF NOT EXISTS idx_appointments_related_waqf ON appointments(related_waqf_id);