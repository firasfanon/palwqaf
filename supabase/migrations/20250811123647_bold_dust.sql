/*
  # إنشاء جدول الوثائق والمستندات

  1. الجداول الجديدة
    - `documents`
      - `id` (integer, primary key)
      - `name` (text) - اسم الوثيقة
      - `type` (text) - نوع الملف
      - `size_mb` (numeric) - حجم الملف بالميجابايت
      - `url` (text) - رابط الملف
      - `content` (text) - محتوى الوثيقة للبحث
      - `tags` (text[]) - العلامات
      - `category` (text) - فئة الوثيقة
      - `related_to_type` (text) - نوع العنصر المرتبط
      - `related_to_id` (integer) - معرف العنصر المرتبط
      - `uploaded_by` (integer) - المستخدم الذي رفع الوثيقة
      - `access_level` (text) - مستوى الوصول
      - `is_archived` (boolean) - مؤرشفة أم لا
      - `download_count` (integer) - عدد مرات التحميل
      - `view_count` (integer) - عدد مرات المشاهدة
      - `uploaded_at` (timestamp)
      - `last_modified` (timestamp)

  2. الأمان
    - تفعيل RLS على جدول `documents`
    - إضافة سياسات حسب مستوى الوصول
*/

CREATE TABLE IF NOT EXISTS documents (
  id serial PRIMARY KEY,
  name text NOT NULL,
  type text NOT NULL DEFAULT 'pdf' CHECK (type IN ('pdf', 'image', 'word', 'excel', 'other')),
  size_mb numeric DEFAULT 0,
  url text NOT NULL,
  content text,
  tags text[] DEFAULT '{}',
  category text NOT NULL DEFAULT 'general' CHECK (category IN ('legal', 'financial', 'technical', 'administrative', 'historical', 'general')),
  related_to_type text CHECK (related_to_type IN ('case', 'waqf_land', 'general')),
  related_to_id integer,
  uploaded_by integer REFERENCES users(id),
  access_level text NOT NULL DEFAULT 'internal' CHECK (access_level IN ('public', 'internal', 'restricted', 'confidential')),
  is_archived boolean DEFAULT false,
  download_count integer DEFAULT 0,
  view_count integer DEFAULT 0,
  uploaded_at timestamptz DEFAULT now(),
  last_modified timestamptz DEFAULT now()
);

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public documents are readable by all"
  ON documents
  FOR SELECT
  TO public
  USING (access_level = 'public' AND NOT is_archived);

CREATE POLICY "Internal documents are readable by authenticated users"
  ON documents
  FOR SELECT
  TO authenticated
  USING (access_level IN ('public', 'internal') AND NOT is_archived);

CREATE POLICY "Restricted documents are readable by managers"
  ON documents
  FOR SELECT
  TO authenticated
  USING (
    access_level IN ('public', 'internal') OR
    (access_level = 'restricted' AND EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role IN ('admin', 'super_admin', 'manager')
    ))
  );

CREATE POLICY "Confidential documents are readable by admins only"
  ON documents
  FOR SELECT
  TO authenticated
  USING (
    access_level IN ('public', 'internal') OR
    (access_level IN ('restricted', 'confidential') AND EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role IN ('admin', 'super_admin')
    ))
  );

CREATE POLICY "Users can upload documents"
  ON documents
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role IN ('admin', 'super_admin', 'manager', 'employee')
    )
  );

CREATE POLICY "Users can update their own documents"
  ON documents
  FOR UPDATE
  TO authenticated
  USING (
    uploaded_by::text = auth.uid()::text OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role IN ('admin', 'super_admin', 'manager')
    )
  );

-- إنشاء فهارس للأداء
CREATE INDEX IF NOT EXISTS idx_documents_category ON documents(category);
CREATE INDEX IF NOT EXISTS idx_documents_type ON documents(type);
CREATE INDEX IF NOT EXISTS idx_documents_access_level ON documents(access_level);
CREATE INDEX IF NOT EXISTS idx_documents_uploaded_by ON documents(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_documents_related ON documents(related_to_type, related_to_id);
CREATE INDEX IF NOT EXISTS idx_documents_tags ON documents USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_documents_search ON documents USING GIN(to_tsvector('arabic', name || ' ' || COALESCE(content, '')));