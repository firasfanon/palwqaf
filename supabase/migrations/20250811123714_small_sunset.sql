/*
  # إنشاء جداول الأخبار والإعلانات والأنشطة

  1. الجداول الجديدة
    - `news`
      - `id` (integer, primary key)
      - `title` (text) - عنوان الخبر
      - `excerpt` (text) - مقتطف
      - `content` (text) - محتوى الخبر
      - `image_url` (text) - رابط الصورة
      - `author` (text) - الكاتب
      - `category` (text) - فئة الخبر
      - `status` (text) - حالة النشر
      - `view_count` (integer) - عدد المشاهدات
      - `is_featured` (boolean) - مميز أم لا
      - `tags` (text[]) - العلامات
      - `published_at` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `announcements`
      - `id` (integer, primary key)
      - `title` (text) - عنوان الإعلان
      - `content` (text) - محتوى الإعلان
      - `priority` (text) - أولوية الإعلان
      - `valid_until` (date) - صالح حتى
      - `is_active` (boolean) - نشط أم لا
      - `target_audience` (text) - الجمهور المستهدف
      - `created_by` (integer) - منشئ الإعلان
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `activities`
      - `id` (integer, primary key)
      - `title` (text) - عنوان النشاط
      - `description` (text) - وصف النشاط
      - `category` (text) - فئة النشاط
      - `type` (text) - نوع النشاط
      - `start_date` (date) - تاريخ البداية
      - `end_date` (date) - تاريخ النهاية
      - `location` (text) - المكان
      - `organizer` (text) - المنظم
      - `max_participants` (integer) - الحد الأقصى للمشاركين
      - `current_participants` (integer) - المشاركون الحاليون
      - `status` (text) - حالة النشاط
      - `image_url` (text) - رابط الصورة
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. الأمان
    - تفعيل RLS على الجداول
    - إضافة سياسات للقراءة العامة والإدارة المحدودة
*/

CREATE TABLE IF NOT EXISTS news (
  id serial PRIMARY KEY,
  title text NOT NULL,
  excerpt text,
  content text,
  image_url text,
  author text NOT NULL,
  category text NOT NULL DEFAULT 'general' CHECK (category IN ('general', 'mosques', 'events', 'education', 'social', 'religious')),
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  view_count integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  tags text[] DEFAULT '{}',
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS announcements (
  id serial PRIMARY KEY,
  title text NOT NULL,
  content text NOT NULL,
  priority text NOT NULL DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  valid_until date,
  is_active boolean DEFAULT true,
  target_audience text DEFAULT 'general' CHECK (target_audience IN ('general', 'employees', 'managers', 'public')),
  created_by integer REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS activities (
  id serial PRIMARY KEY,
  title text NOT NULL,
  description text,
  category text NOT NULL DEFAULT 'religious' CHECK (category IN ('religious', 'educational', 'cultural', 'social', 'family', 'training')),
  type text NOT NULL DEFAULT 'lecture' CHECK (type IN ('lecture', 'seminar', 'workshop', 'competition', 'exhibition', 'course')),
  start_date date NOT NULL,
  end_date date,
  location text NOT NULL,
  organizer text NOT NULL,
  max_participants integer DEFAULT 0,
  current_participants integer DEFAULT 0,
  status text NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- سياسات الأخبار
CREATE POLICY "Anyone can read published news"
  ON news
  FOR SELECT
  TO public
  USING (status = 'published');

CREATE POLICY "Authenticated users can manage news"
  ON news
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role IN ('admin', 'super_admin', 'manager')
    )
  );

-- سياسات الإعلانات
CREATE POLICY "Anyone can read active announcements"
  ON announcements
  FOR SELECT
  TO public
  USING (is_active = true AND (valid_until IS NULL OR valid_until >= CURRENT_DATE));

CREATE POLICY "Authenticated users can manage announcements"
  ON announcements
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role IN ('admin', 'super_admin', 'manager')
    )
  );

-- سياسات الأنشطة
CREATE POLICY "Anyone can read activities"
  ON activities
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage activities"
  ON activities
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
CREATE INDEX IF NOT EXISTS idx_news_status ON news(status);
CREATE INDEX IF NOT EXISTS idx_news_category ON news(category);
CREATE INDEX IF NOT EXISTS idx_news_published_at ON news(published_at);
CREATE INDEX IF NOT EXISTS idx_news_featured ON news(is_featured);
CREATE INDEX IF NOT EXISTS idx_news_tags ON news USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_news_search ON news USING GIN(to_tsvector('arabic', title || ' ' || COALESCE(excerpt, '') || ' ' || COALESCE(content, '')));

CREATE INDEX IF NOT EXISTS idx_announcements_priority ON announcements(priority);
CREATE INDEX IF NOT EXISTS idx_announcements_active ON announcements(is_active);
CREATE INDEX IF NOT EXISTS idx_announcements_valid_until ON announcements(valid_until);

CREATE INDEX IF NOT EXISTS idx_activities_category ON activities(category);
CREATE INDEX IF NOT EXISTS idx_activities_status ON activities(status);
CREATE INDEX IF NOT EXISTS idx_activities_start_date ON activities(start_date);