/*
  # إنشاء جدول الأراضي الوقفية

  1. الجداول الجديدة
    - `waqf_lands`
      - `id` (integer, primary key)
      - `name` (text) - اسم الأرض الوقفية
      - `description` (text) - الوصف
      - `area` (numeric) - المساحة بالمتر المربع
      - `location` (jsonb) - معلومات الموقع والإحداثيات
      - `boundaries` (jsonb) - نقاط الحدود
      - `type` (text) - نوع الوقف
      - `status` (text) - حالة الوقف
      - `value` (numeric) - القيمة التقديرية
      - `monthly_income` (numeric) - الدخل الشهري
      - `monthly_expenses` (numeric) - المصروفات الشهرية
      - `manager_name` (text) - اسم المدير
      - `manager_id` (integer) - معرف المدير
      - `governorate` (text) - المحافظة
      - `establishment_date` (date) - تاريخ التأسيس
      - `historical_period` (text) - الفترة التاريخية
      - `founder` (text) - المؤسس
      - `management_type` (text) - نوع الإدارة
      - `maintenance_status` (text) - حالة الصيانة
      - `last_inspection` (date) - آخر تفتيش
      - `next_inspection` (date) - التفتيش القادم
      - `national_registry_id` (text) - المفتاح الوطني
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. الأمان
    - تفعيل RLS على جدول `waqf_lands`
    - إضافة سياسات للمستخدمين المصادق عليهم
*/

CREATE TABLE IF NOT EXISTS waqf_lands (
  id serial PRIMARY KEY,
  name text NOT NULL,
  description text,
  area numeric DEFAULT 0,
  location jsonb DEFAULT '{}',
  boundaries jsonb DEFAULT '[]',
  type text NOT NULL DEFAULT 'mosque' CHECK (type IN ('mosque', 'cemetery', 'school', 'commercial', 'residential', 'agricultural', 'mixed')),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'under_development', 'disputed', 'under_review', 'suspended')),
  value numeric DEFAULT 0,
  monthly_income numeric DEFAULT 0,
  monthly_expenses numeric DEFAULT 0,
  manager_name text,
  manager_id integer REFERENCES users(id),
  governorate text REFERENCES governorates(code),
  establishment_date date,
  historical_period text CHECK (historical_period IN ('islamic_conquest', 'umayyad', 'abbasid', 'fatimid', 'ayyubid', 'mamluk', 'ottoman', 'british_mandate', 'jordanian_rule', 'israeli_occupation', 'palestinian_authority', 'modern')),
  founder text,
  management_type text DEFAULT 'ministry_direct' CHECK (management_type IN ('ministry_direct', 'local_committee', 'private_manager', 'community_managed', 'family_managed', 'contracted', 'vacant')),
  maintenance_status text DEFAULT 'good' CHECK (maintenance_status IN ('excellent', 'good', 'fair', 'poor', 'critical', 'under_maintenance', 'needs_assessment')),
  last_inspection date,
  next_inspection date,
  national_registry_id text UNIQUE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE waqf_lands ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read waqf lands"
  ON waqf_lands
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Managers can manage waqf lands"
  ON waqf_lands
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role IN ('admin', 'super_admin', 'manager')
    )
  );

-- إنشاء فهارس للأداء
CREATE INDEX IF NOT EXISTS idx_waqf_lands_governorate ON waqf_lands(governorate);
CREATE INDEX IF NOT EXISTS idx_waqf_lands_type ON waqf_lands(type);
CREATE INDEX IF NOT EXISTS idx_waqf_lands_status ON waqf_lands(status);
CREATE INDEX IF NOT EXISTS idx_waqf_lands_manager ON waqf_lands(manager_id);
CREATE INDEX IF NOT EXISTS idx_waqf_lands_location ON waqf_lands USING GIN(location);
CREATE INDEX IF NOT EXISTS idx_waqf_lands_search ON waqf_lands USING GIN(to_tsvector('arabic', name || ' ' || COALESCE(description, '')));