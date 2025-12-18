/*
  # إضافة جداول الأوقاف والوصايا

  ## الجداول الجديدة
  
  ### 1. جداول إدارة الأوقاف الشاملة
    - `endowers` - الواقفون (أصحاب الأوقاف)
    - `endowment_names` - أسماء الأوقاف
    - `endowment_cases` - حالات وقضايا الأوقاف
    - `endowment_beneficiaries` - المستفيدون من الأوقاف
    - `endowment_supervisors` - المشرفون على الأوقاف
    - `endowment_endower_relations` - العلاقات بين الأوقاف والواقفين
    - `case_supervisors` - المشرفون على القضايا
  
  ### 2. جداول الخدمات والأصول
    - `assettypes` - أنواع الأصول
    - `servicetypes` - أنواع الخدمات
    - `serviceproviders` - مزودو الخدمات
    - `servicepoints` - نقاط الخدمة
    - `intelligentrecommendations` - التوصيات الذكية للأصول

  ## الأمان
    - تفعيل RLS على جميع الجداول
    - إضافة سياسات أمان مناسبة
    - حماية بيانات الأوقاف الحساسة
*/

-- =====================================================
-- 1. جداول إدارة الأوقاف الشاملة
-- =====================================================

-- إنشاء الأنواع المخصصة (ENUMS) إذا لم تكن موجودة
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'endowment_type_enum') THEN
    CREATE TYPE endowment_type_enum AS ENUM ('ذري', 'خيري', 'مشترك', 'غير محدد');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'endowment_status_enum') THEN
    CREATE TYPE endowment_status_enum AS ENUM ('صحيح', 'متنازع عليه', 'ملغى', 'تحت المراجعة', 'غير محدد');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'property_type_enum') THEN
    CREATE TYPE property_type_enum AS ENUM ('أرض', 'بناء', 'محل تجاري', 'شقة', 'مزرعة', 'بستان', 'أخرى');
  END IF;
END $$;

-- جدول الواقفون
CREATE TABLE IF NOT EXISTS endowers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  endower_name varchar NOT NULL UNIQUE,
  endower_full_name varchar,
  endowment_names uuid[],
  endowment_name_references uuid[],
  contact_phone varchar,
  contact_email varchar,
  address text,
  birth_place varchar,
  birth_year_hijri varchar,
  birth_year_gregorian integer,
  death_year_hijri varchar,
  death_year_gregorian integer,
  occupation varchar,
  social_status varchar,
  endower_details text,
  historical_background text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE endowers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Endowers are viewable by authenticated users"
  ON endowers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage endowers"
  ON endowers FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- جدول أسماء الأوقاف
CREATE TABLE IF NOT EXISTS endowment_names (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  endowment_name varchar NOT NULL UNIQUE,
  full_name varchar,
  endowment_type endowment_type_enum NOT NULL,
  endowment_status endowment_status_enum DEFAULT 'صحيح',
  establishment_date_hijri varchar,
  establishment_date_gregorian date,
  location text,
  governorate_id uuid REFERENCES governorates(id),
  city_id uuid REFERENCES cities(id),
  description text,
  historical_significance text,
  current_administrator varchar,
  contact_info text,
  reference_documents jsonb DEFAULT '[]',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  endower_id uuid REFERENCES endowers(id)
);

ALTER TABLE endowment_names ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Endowment names are viewable by authenticated users"
  ON endowment_names FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage endowment names"
  ON endowment_names FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- جدول حالات وقضايا الأوقاف
CREATE TABLE IF NOT EXISTS endowment_cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_number varchar NOT NULL UNIQUE,
  case_summary text,
  full_case_text text,
  hegira_date varchar NOT NULL,
  hegira_date_normalized date,
  egyptian_date varchar,
  registration_date date,
  court_name varchar NOT NULL,
  court_address text,
  judge_name varchar,
  judge_title varchar,
  endower_id uuid REFERENCES endowers(id),
  endower_name varchar,
  endower_full_name varchar,
  endowment_name_id uuid REFERENCES endowment_names(id),
  endowment_name varchar,
  endowment_type endowment_type_enum,
  endowment_status endowment_status_enum DEFAULT 'صحيح',
  property_number varchar,
  property_type property_type_enum,
  property_location text NOT NULL,
  property_boundaries text NOT NULL,
  property_area numeric,
  area_unit varchar DEFAULT 'متر مربع',
  property_description text NOT NULL,
  registration_number varchar,
  land_registry_number varchar,
  tabo_number varchar,
  estimated_value numeric,
  currency varchar DEFAULT 'شيكل',
  beneficiaries text NOT NULL,
  beneficiaries_type varchar,
  supervisor_name varchar,
  supervisor_type varchar,
  supervision_conditions text,
  endower_conditions text,
  special_conditions text,
  governorate_id uuid REFERENCES governorates(id),
  city_id uuid REFERENCES cities(id),
  district varchar,
  neighborhood varchar,
  documents jsonb DEFAULT '[]',
  document_types text[],
  current_status varchar,
  last_inspection_date date,
  next_inspection_date date,
  notes text,
  historical_notes text,
  research_notes text,
  is_active boolean DEFAULT true,
  verification_status varchar DEFAULT 'غير مؤكد',
  verification_date date,
  verified_by varchar,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  updated_by uuid REFERENCES auth.users(id),
  version integer DEFAULT 1
);

ALTER TABLE endowment_cases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Endowment cases are viewable by authenticated users"
  ON endowment_cases FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage endowment cases"
  ON endowment_cases FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- جدول المستفيدون من الأوقاف
CREATE TABLE IF NOT EXISTS endowment_beneficiaries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  endowment_case_id uuid NOT NULL REFERENCES endowment_cases(id),
  beneficiary_name varchar NOT NULL,
  beneficiary_type varchar,
  beneficiary_details text,
  share_percentage numeric,
  share_description text,
  special_conditions text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE endowment_beneficiaries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Endowment beneficiaries are viewable by authenticated users"
  ON endowment_beneficiaries FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage endowment beneficiaries"
  ON endowment_beneficiaries FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- جدول المشرفون على الأوقاف
CREATE TABLE IF NOT EXISTS endowment_supervisors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  supervisor_name varchar NOT NULL,
  supervisor_type varchar,
  contact_info text,
  qualifications text,
  start_date date,
  end_date date,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE endowment_supervisors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Endowment supervisors are viewable by authenticated users"
  ON endowment_supervisors FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage endowment supervisors"
  ON endowment_supervisors FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- جدول العلاقات بين الأوقاف والواقفين
CREATE TABLE IF NOT EXISTS endowment_endower_relations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  endowment_id uuid REFERENCES endowment_names(id),
  endower_id uuid REFERENCES endowers(id),
  role varchar,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE endowment_endower_relations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Endowment-endower relations are viewable by authenticated users"
  ON endowment_endower_relations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage endowment-endower relations"
  ON endowment_endower_relations FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- جدول المشرفون على القضايا
CREATE TABLE IF NOT EXISTS case_supervisors (
  endowment_case_id uuid NOT NULL REFERENCES endowment_cases(id),
  supervisor_id uuid NOT NULL REFERENCES endowment_supervisors(id),
  supervisor_role varchar,
  supervision_period text,
  PRIMARY KEY (endowment_case_id, supervisor_id)
);

ALTER TABLE case_supervisors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Case supervisors are viewable by authenticated users"
  ON case_supervisors FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage case supervisors"
  ON case_supervisors FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- 2. جداول الخدمات والأصول
-- =====================================================

-- جدول أنواع الأصول
CREATE TABLE IF NOT EXISTS assettypes (
  id serial PRIMARY KEY,
  name text NOT NULL UNIQUE,
  code varchar UNIQUE,
  icon_name text
);

ALTER TABLE assettypes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Asset types are viewable by everyone"
  ON assettypes FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage asset types"
  ON assettypes FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- جدول أنواع الخدمات
CREATE TABLE IF NOT EXISTS servicetypes (
  id serial PRIMARY KEY,
  name text NOT NULL UNIQUE,
  unit text NOT NULL
);

ALTER TABLE servicetypes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service types are viewable by everyone"
  ON servicetypes FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage service types"
  ON servicetypes FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- جدول مزودو الخدمات
CREATE TABLE IF NOT EXISTS serviceproviders (
  id serial PRIMARY KEY,
  name text NOT NULL,
  service_type_id integer NOT NULL REFERENCES servicetypes(id),
  website text,
  support_phone text
);

ALTER TABLE serviceproviders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service providers are viewable by everyone"
  ON serviceproviders FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage service providers"
  ON serviceproviders FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- جدول نقاط الخدمة
CREATE TABLE IF NOT EXISTS servicepoints (
  id serial PRIMARY KEY,
  asset_id integer NOT NULL REFERENCES waqf_lands(id),
  service_type_id integer NOT NULL REFERENCES servicetypes(id),
  provider_id integer NOT NULL REFERENCES serviceproviders(id),
  service_identifier text NOT NULL,
  description text,
  is_active boolean NOT NULL DEFAULT true
);

ALTER TABLE servicepoints ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service points are viewable by authenticated users"
  ON servicepoints FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage service points"
  ON servicepoints FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- جدول التوصيات الذكية
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'recommendation_status') THEN
    CREATE TYPE recommendation_status AS ENUM ('NEW', 'ACKNOWLEDGED', 'IN_PROGRESS', 'COMPLETED', 'DISMISSED');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS intelligentrecommendations (
  id bigserial PRIMARY KEY,
  asset_id integer REFERENCES waqf_lands(id),
  recommendation_code text NOT NULL,
  title text NOT NULL,
  description text,
  suggested_action text,
  priority text NOT NULL DEFAULT 'MEDIUM',
  status recommendation_status NOT NULL DEFAULT 'NEW',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE intelligentrecommendations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Intelligent recommendations are viewable by authenticated users"
  ON intelligentrecommendations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage intelligent recommendations"
  ON intelligentrecommendations FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
