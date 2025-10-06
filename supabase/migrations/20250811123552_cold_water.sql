/*
  # إنشاء جدول المحافظات الفلسطينية

  1. الجداول الجديدة
    - `governorates`
      - `id` (uuid, primary key)
      - `name_ar` (text) - الاسم بالعربية
      - `name_en` (text) - الاسم بالإنجليزية
      - `code` (text) - رمز المحافظة
      - `region` (text) - المنطقة (الضفة الغربية/غزة)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. الأمان
    - تفعيل RLS على جدول `governorates`
    - إضافة سياسة للقراءة العامة
*/

CREATE TABLE IF NOT EXISTS governorates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ar text NOT NULL,
  name_en text NOT NULL,
  code text UNIQUE NOT NULL,
  region text NOT NULL CHECK (region IN ('west_bank', 'gaza')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE governorates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read governorates"
  ON governorates
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage governorates"
  ON governorates
  FOR ALL
  TO authenticated
  USING (true);

-- إدراج بيانات المحافظات الفلسطينية
INSERT INTO governorates (name_ar, name_en, code, region) VALUES
  ('القدس', 'Jerusalem', 'JER', 'west_bank'),
  ('رام الله والبيرة', 'Ramallah and Al-Bireh', 'RAM', 'west_bank'),
  ('نابلس', 'Nablus', 'NAB', 'west_bank'),
  ('الخليل', 'Hebron', 'HEB', 'west_bank'),
  ('بيت لحم', 'Bethlehem', 'BET', 'west_bank'),
  ('أريحا والأغوار', 'Jericho and Jordan Valley', 'JER_VAL', 'west_bank'),
  ('جنين', 'Jenin', 'JEN', 'west_bank'),
  ('طولكرم', 'Tulkarm', 'TUL', 'west_bank'),
  ('قلقيلية', 'Qalqilya', 'QAL', 'west_bank'),
  ('سلفيت', 'Salfit', 'SAL', 'west_bank'),
  ('طوباس', 'Tubas', 'TUB', 'west_bank'),
  ('غزة', 'Gaza', 'GAZ', 'gaza'),
  ('شمال غزة', 'North Gaza', 'N_GAZ', 'gaza'),
  ('دير البلح', 'Deir al-Balah', 'DEI', 'gaza'),
  ('خان يونس', 'Khan Younis', 'KHA', 'gaza'),
  ('رفح', 'Rafah', 'RAF', 'gaza')
ON CONFLICT (code) DO NOTHING;