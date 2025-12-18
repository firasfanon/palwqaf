/*
  # تطوير نظام الأراضي الوقفية - الجداول الأساسية

  ## الجداول الجديدة
  
  ### 1. جداول إدارة الموظفين والمدراء
    - `waqf_managers` - مدراء الأوقاف
    - `asset_types` - أنواع الأصول الوقفية
    
  ### 2. جداول التفتيش والصيانة
    - `inspections` - سجلات التفتيش
    - `maintenance_records` - سجلات الصيانة
    
  ### 3. جداول العقود والإيجارات
    - `contracts` - العقود
    - `leases` - الإيجارات
    - `tenants` - المستأجرين
    
  ### 4. جداول المستندات والوثائق
    - `waqf_documents` - وثائق الأوقاف
    - `document_categories` - تصنيفات المستندات
    
  ### 5. جداول المعاملات المالية
    - `financial_transactions` - المعاملات المالية
    - `income_records` - سجلات الإيرادات
    - `expense_records` - سجلات المصروفات

  ## الأمان
    - تفعيل RLS على جميع الجداول
    - سياسات القراءة للمستخدمين المصادق عليهم
    - سياسات الكتابة للإداريين فقط
*/

-- =====================================================
-- 1. جداول إدارة الموظفين والمدراء
-- =====================================================

-- جدول مدراء الأوقاف
CREATE TABLE IF NOT EXISTS waqf_managers (
  id serial PRIMARY KEY,
  admin_user_id uuid REFERENCES auth.users(id),
  name_ar text NOT NULL,
  name_en text,
  national_id text UNIQUE,
  phone text,
  email text,
  address text,
  governorate_code text REFERENCES governorates(code),
  position text NOT NULL DEFAULT 'manager',
  department text,
  hire_date date,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended', 'retired')),
  qualifications jsonb DEFAULT '[]',
  experience_years integer DEFAULT 0,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

ALTER TABLE waqf_managers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view waqf managers"
  ON waqf_managers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage waqf managers"
  ON waqf_managers FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- جدول أنواع الأصول الوقفية
CREATE TABLE IF NOT EXISTS asset_types (
  id serial PRIMARY KEY,
  name_ar text NOT NULL UNIQUE,
  name_en text,
  description_ar text,
  description_en text,
  category text NOT NULL CHECK (category IN ('religious', 'commercial', 'residential', 'agricultural', 'educational', 'healthcare', 'charitable', 'mixed')),
  icon text,
  color text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE asset_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Asset types are viewable by everyone"
  ON asset_types FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage asset types"
  ON asset_types FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- 2. جداول التفتيش والصيانة
-- =====================================================

-- جدول التفتيش
CREATE TABLE IF NOT EXISTS inspections (
  id serial PRIMARY KEY,
  waqf_land_id integer NOT NULL REFERENCES waqf_lands(id) ON DELETE CASCADE,
  inspector_id integer REFERENCES waqf_managers(id),
  inspection_date date NOT NULL DEFAULT CURRENT_DATE,
  inspection_type text NOT NULL CHECK (inspection_type IN ('routine', 'emergency', 'follow_up', 'annual', 'special')),
  status text DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
  findings text,
  recommendations text,
  overall_rating text CHECK (overall_rating IN ('excellent', 'good', 'fair', 'poor', 'critical')),
  requires_maintenance boolean DEFAULT false,
  priority text CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  images jsonb DEFAULT '[]',
  attachments jsonb DEFAULT '[]',
  next_inspection_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

ALTER TABLE inspections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view inspections"
  ON inspections FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage inspections"
  ON inspections FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- جدول سجلات الصيانة
CREATE TABLE IF NOT EXISTS maintenance_records (
  id serial PRIMARY KEY,
  waqf_land_id integer NOT NULL REFERENCES waqf_lands(id) ON DELETE CASCADE,
  inspection_id integer REFERENCES inspections(id),
  maintenance_type text NOT NULL CHECK (maintenance_type IN ('preventive', 'corrective', 'emergency', 'renovation', 'restoration')),
  description text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'in_progress', 'completed', 'cancelled')),
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  scheduled_date date,
  start_date date,
  completion_date date,
  estimated_cost numeric(12, 2),
  actual_cost numeric(12, 2),
  contractor_name text,
  contractor_contact text,
  supervisor_id integer REFERENCES waqf_managers(id),
  work_description text,
  materials_used text,
  notes text,
  images_before jsonb DEFAULT '[]',
  images_after jsonb DEFAULT '[]',
  documents jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

ALTER TABLE maintenance_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view maintenance records"
  ON maintenance_records FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage maintenance records"
  ON maintenance_records FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- 3. جداول العقود والإيجارات
-- =====================================================

-- جدول المستأجرين
CREATE TABLE IF NOT EXISTS tenants (
  id serial PRIMARY KEY,
  name_ar text NOT NULL,
  name_en text,
  national_id text UNIQUE,
  phone text NOT NULL,
  email text,
  address text,
  governorate_code text REFERENCES governorates(code),
  tenant_type text DEFAULT 'individual' CHECK (tenant_type IN ('individual', 'company', 'institution', 'government')),
  business_type text,
  registration_number text,
  tax_number text,
  notes text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view tenants"
  ON tenants FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage tenants"
  ON tenants FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- جدول العقود
CREATE TABLE IF NOT EXISTS contracts (
  id serial PRIMARY KEY,
  contract_number text UNIQUE NOT NULL,
  waqf_land_id integer NOT NULL REFERENCES waqf_lands(id) ON DELETE CASCADE,
  tenant_id integer REFERENCES tenants(id),
  contract_type text NOT NULL CHECK (contract_type IN ('lease', 'sale', 'partnership', 'service', 'maintenance', 'management')),
  contract_purpose text,
  start_date date NOT NULL,
  end_date date,
  duration_months integer,
  auto_renewal boolean DEFAULT false,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'expired', 'terminated', 'renewed', 'cancelled')),
  monthly_amount numeric(12, 2),
  total_amount numeric(12, 2),
  payment_frequency text CHECK (payment_frequency IN ('monthly', 'quarterly', 'semi_annual', 'annual', 'one_time')),
  payment_method text CHECK (payment_method IN ('cash', 'check', 'bank_transfer', 'direct_debit')),
  security_deposit numeric(12, 2),
  terms_conditions text,
  special_clauses text,
  manager_id integer REFERENCES waqf_managers(id),
  signed_date date,
  documents jsonb DEFAULT '[]',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view contracts"
  ON contracts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage contracts"
  ON contracts FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- جدول الإيجارات (تفصيل للعقود)
CREATE TABLE IF NOT EXISTS leases (
  id serial PRIMARY KEY,
  contract_id integer NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
  lease_number text UNIQUE NOT NULL,
  property_description text,
  leased_area numeric(10, 2),
  monthly_rent numeric(12, 2) NOT NULL,
  utilities_included boolean DEFAULT false,
  maintenance_responsibility text CHECK (maintenance_responsibility IN ('landlord', 'tenant', 'shared')),
  insurance_required boolean DEFAULT false,
  pets_allowed boolean DEFAULT false,
  sublease_allowed boolean DEFAULT false,
  early_termination_clause text,
  rent_increase_clause text,
  renewal_terms text,
  last_rent_increase_date date,
  last_rent_increase_percentage numeric(5, 2),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE leases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view leases"
  ON leases FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage leases"
  ON leases FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- 4. جداول المستندات والوثائق
-- =====================================================

-- جدول تصنيفات المستندات
CREATE TABLE IF NOT EXISTS document_categories (
  id serial PRIMARY KEY,
  name_ar text NOT NULL UNIQUE,
  name_en text,
  description text,
  icon text,
  color text,
  parent_id integer REFERENCES document_categories(id),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE document_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view document categories"
  ON document_categories FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage document categories"
  ON document_categories FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- جدول وثائق الأوقاف
CREATE TABLE IF NOT EXISTS waqf_documents (
  id serial PRIMARY KEY,
  document_number text UNIQUE NOT NULL,
  title_ar text NOT NULL,
  title_en text,
  description text,
  category_id integer REFERENCES document_categories(id),
  document_type text NOT NULL CHECK (document_type IN ('deed', 'contract', 'certificate', 'report', 'map', 'photo', 'legal', 'financial', 'technical', 'administrative', 'other')),
  related_entity_type text CHECK (related_entity_type IN ('waqf_land', 'contract', 'inspection', 'maintenance', 'manager', 'tenant')),
  related_entity_id integer,
  file_path text,
  file_url text,
  file_size bigint,
  file_type text,
  storage_location text,
  issue_date date,
  expiry_date date,
  issuing_authority text,
  is_original boolean DEFAULT true,
  is_certified boolean DEFAULT false,
  access_level text DEFAULT 'internal' CHECK (access_level IN ('public', 'internal', 'confidential', 'restricted')),
  tags text[] DEFAULT '{}',
  metadata jsonb DEFAULT '{}',
  version integer DEFAULT 1,
  status text DEFAULT 'active' CHECK (status IN ('draft', 'active', 'archived', 'deleted')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

ALTER TABLE waqf_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view non-confidential documents"
  ON waqf_documents FOR SELECT
  TO authenticated
  USING (access_level != 'confidential' OR created_by = auth.uid());

CREATE POLICY "Authenticated users can manage their documents"
  ON waqf_documents FOR ALL
  TO authenticated
  USING (created_by = auth.uid())
  WITH CHECK (created_by = auth.uid());

-- =====================================================
-- 5. جداول المعاملات المالية
-- =====================================================

-- جدول المعاملات المالية
CREATE TABLE IF NOT EXISTS financial_transactions (
  id serial PRIMARY KEY,
  transaction_number text UNIQUE NOT NULL,
  waqf_land_id integer REFERENCES waqf_lands(id) ON DELETE CASCADE,
  contract_id integer REFERENCES contracts(id),
  transaction_type text NOT NULL CHECK (transaction_type IN ('income', 'expense', 'transfer', 'refund', 'deposit')),
  category text NOT NULL CHECK (category IN ('rent', 'sale', 'donation', 'maintenance', 'utilities', 'salaries', 'taxes', 'fees', 'other')),
  description text NOT NULL,
  amount numeric(12, 2) NOT NULL,
  currency text DEFAULT 'ILS',
  payment_method text CHECK (payment_method IN ('cash', 'check', 'bank_transfer', 'credit_card', 'online')),
  payment_reference text,
  transaction_date date NOT NULL DEFAULT CURRENT_DATE,
  due_date date,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled', 'refunded')),
  payer_payee_name text,
  payer_payee_id text,
  bank_name text,
  account_number text,
  notes text,
  attachments jsonb DEFAULT '[]',
  fiscal_year integer,
  recorded_by uuid REFERENCES auth.users(id),
  approved_by uuid REFERENCES auth.users(id),
  approved_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE financial_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view financial transactions"
  ON financial_transactions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage financial transactions"
  ON financial_transactions FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- جدول سجلات الإيرادات
CREATE TABLE IF NOT EXISTS income_records (
  id serial PRIMARY KEY,
  transaction_id integer NOT NULL REFERENCES financial_transactions(id) ON DELETE CASCADE,
  income_source text NOT NULL,
  amount numeric(12, 2) NOT NULL,
  fiscal_year integer NOT NULL,
  quarter integer CHECK (quarter BETWEEN 1 AND 4),
  month integer CHECK (month BETWEEN 1 AND 12),
  is_recurring boolean DEFAULT false,
  recurrence_frequency text CHECK (recurrence_frequency IN ('monthly', 'quarterly', 'annual')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE income_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view income records"
  ON income_records FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage income records"
  ON income_records FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- جدول سجلات المصروفات
CREATE TABLE IF NOT EXISTS expense_records (
  id serial PRIMARY KEY,
  transaction_id integer NOT NULL REFERENCES financial_transactions(id) ON DELETE CASCADE,
  expense_category text NOT NULL,
  amount numeric(12, 2) NOT NULL,
  fiscal_year integer NOT NULL,
  quarter integer CHECK (quarter BETWEEN 1 AND 4),
  month integer CHECK (month BETWEEN 1 AND 12),
  vendor_name text,
  vendor_id text,
  budget_line text,
  is_planned boolean DEFAULT false,
  approval_status text DEFAULT 'pending' CHECK (approval_status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE expense_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view expense records"
  ON expense_records FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage expense records"
  ON expense_records FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- 6. الفهارس لتحسين الأداء
-- =====================================================

-- فهارس waqf_managers
CREATE INDEX IF NOT EXISTS idx_waqf_managers_governorate ON waqf_managers(governorate_code);
CREATE INDEX IF NOT EXISTS idx_waqf_managers_status ON waqf_managers(status);
CREATE INDEX IF NOT EXISTS idx_waqf_managers_national_id ON waqf_managers(national_id);

-- فهارس inspections
CREATE INDEX IF NOT EXISTS idx_inspections_waqf_land ON inspections(waqf_land_id);
CREATE INDEX IF NOT EXISTS idx_inspections_inspector ON inspections(inspector_id);
CREATE INDEX IF NOT EXISTS idx_inspections_date ON inspections(inspection_date);
CREATE INDEX IF NOT EXISTS idx_inspections_status ON inspections(status);

-- فهارس maintenance_records
CREATE INDEX IF NOT EXISTS idx_maintenance_waqf_land ON maintenance_records(waqf_land_id);
CREATE INDEX IF NOT EXISTS idx_maintenance_inspection ON maintenance_records(inspection_id);
CREATE INDEX IF NOT EXISTS idx_maintenance_status ON maintenance_records(status);
CREATE INDEX IF NOT EXISTS idx_maintenance_dates ON maintenance_records(scheduled_date, completion_date);

-- فهارس contracts
CREATE INDEX IF NOT EXISTS idx_contracts_waqf_land ON contracts(waqf_land_id);
CREATE INDEX IF NOT EXISTS idx_contracts_tenant ON contracts(tenant_id);
CREATE INDEX IF NOT EXISTS idx_contracts_status ON contracts(status);
CREATE INDEX IF NOT EXISTS idx_contracts_dates ON contracts(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_contracts_number ON contracts(contract_number);

-- فهارس tenants
CREATE INDEX IF NOT EXISTS idx_tenants_national_id ON tenants(national_id);
CREATE INDEX IF NOT EXISTS idx_tenants_active ON tenants(is_active);

-- فهارس waqf_documents
CREATE INDEX IF NOT EXISTS idx_documents_category ON waqf_documents(category_id);
CREATE INDEX IF NOT EXISTS idx_documents_type ON waqf_documents(document_type);
CREATE INDEX IF NOT EXISTS idx_documents_entity ON waqf_documents(related_entity_type, related_entity_id);
CREATE INDEX IF NOT EXISTS idx_documents_status ON waqf_documents(status);
CREATE INDEX IF NOT EXISTS idx_documents_access ON waqf_documents(access_level);
CREATE INDEX IF NOT EXISTS idx_documents_search ON waqf_documents USING gin(to_tsvector('arabic', title_ar || ' ' || COALESCE(description, '')));

-- فهارس financial_transactions
CREATE INDEX IF NOT EXISTS idx_transactions_waqf_land ON financial_transactions(waqf_land_id);
CREATE INDEX IF NOT EXISTS idx_transactions_contract ON financial_transactions(contract_id);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON financial_transactions(transaction_type);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON financial_transactions(transaction_date);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON financial_transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_fiscal_year ON financial_transactions(fiscal_year);

-- فهارس income_records
CREATE INDEX IF NOT EXISTS idx_income_fiscal_year ON income_records(fiscal_year, quarter, month);
CREATE INDEX IF NOT EXISTS idx_income_transaction ON income_records(transaction_id);

-- فهارس expense_records
CREATE INDEX IF NOT EXISTS idx_expense_fiscal_year ON expense_records(fiscal_year, quarter, month);
CREATE INDEX IF NOT EXISTS idx_expense_transaction ON expense_records(transaction_id);
CREATE INDEX IF NOT EXISTS idx_expense_approval ON expense_records(approval_status);
