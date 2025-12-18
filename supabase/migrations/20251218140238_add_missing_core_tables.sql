/*
  # إضافة الجداول الأساسية الناقصة

  ## الجداول الجديدة
  
  ### 1. جداول إدارة الموقع والصفحة الرئيسية
    - `site_settings` - إعدادات الموقع العامة
    - `header_settings` - إعدادات ترويسة الموقع
    - `footer_settings` - إعدادات تذييل الموقع
    - `app_settings` - إعدادات التطبيق (key-value)
    - `hero_slides` - شرائح البانر الرئيسي
    - `home_hero_slides` - شرائح الصفحة الرئيسية
    - `home_news` - أخبار الصفحة الرئيسية
    - `home_services` - خدمات الصفحة الرئيسية
    - `home_stats` - إحصائيات الصفحة الرئيسية
    - `homepage_sections` - إدارة أقسام الصفحة الرئيسية
    - `breaking_news` - الأخبار العاجلة
  
  ### 2. جداول المستخدمين الإداريين
    - `admin_users` - مستخدمو النظام الإداري (مرتبط بـ auth.users)
  
  ### 3. جداول المواقع الجغرافية
    - `cities` - المدن والبلدات والقرى
    - `locations` - المواقع التفصيلية
  
  ### 4. جداول الأخبار والإعلانات الإضافية
    - `news_items` - عناصر الأخبار
    - `news_articles` - مقالات الأخبار
    - `announcement_items` - عناصر الإعلانات
  
  ### 5. جداول التاريخ
    - `historical_periods` - الفترات التاريخية
    - `historical_admin_units` - الوحدات الإدارية التاريخية
    - `islamic_terms` - المصطلحات الإسلامية
  
  ### 6. جداول إضافية
    - `categories` - التصنيفات
    - `achievements` - الإنجازات
    - `daily_habits` - العادات اليومية

  ## الأمان
    - تفعيل RLS على جميع الجداول
    - إضافة سياسات أمان مناسبة لكل جدول
    - سياسات القراءة للجمهور حيث مناسب
    - سياسات الكتابة للمستخدمين المصادق عليهم فقط
*/

-- =====================================================
-- 1. جداول إدارة الموقع والصفحة الرئيسية
-- =====================================================

-- جدول إعدادات الموقع العامة
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  logo_url text NOT NULL DEFAULT '',
  favicon_url text,
  site_title text NOT NULL DEFAULT 'وزارة الأوقاف والشؤون الدينية',
  site_subtitle text NOT NULL DEFAULT 'دولة فلسطين',
  contact_email text DEFAULT 'info@awqaf.ps',
  contact_phone text DEFAULT '+970-2-2406340',
  contact_address text DEFAULT 'رام الله - فلسطين - شارع الإرسال - مجمع الوزارات',
  facebook_url text,
  twitter_url text,
  instagram_url text,
  youtube_url text,
  footer_text text DEFAULT 'جميع الحقوق محفوظة © 2025 وزارة الأوقاف والشؤون الدينية الفلسطينية',
  slider_autoplay boolean DEFAULT true,
  slider_speed integer DEFAULT 5000,
  slider_show_dots boolean DEFAULT true,
  slider_show_arrows boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Site settings are viewable by everyone"
  ON site_settings FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only authenticated users can update site settings"
  ON site_settings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- جدول إعدادات الترويسة
CREATE TABLE IF NOT EXISTS header_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  logo_url text NOT NULL,
  logo_alt text DEFAULT 'Ministry Logo',
  site_name text NOT NULL DEFAULT 'وزارة الأوقاف والشؤون الدينية',
  site_tagline text DEFAULT 'دولة فلسطين',
  favicon_url text,
  show_breaking_news boolean DEFAULT true,
  breaking_news_text text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE header_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Header settings are viewable by everyone"
  ON header_settings FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only authenticated users can update header settings"
  ON header_settings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- جدول إعدادات التذييل
CREATE TABLE IF NOT EXISTS footer_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ministry_logo_url text,
  ministry_name text DEFAULT 'وزارة الأوقاف',
  ministry_subtitle text DEFAULT 'دولة فلسطين',
  ministry_description text,
  contact_phone text,
  contact_fax text,
  contact_email text,
  contact_address text,
  working_days text DEFAULT 'من الأحد إلى الخميس',
  working_hours text DEFAULT '8:00 صباحاً - 3:00 مساءً',
  facebook_url text,
  twitter_url text,
  instagram_url text,
  youtube_url text,
  linkedin_url text,
  quick_links jsonb DEFAULT '[]',
  services_links jsonb DEFAULT '[]',
  partners jsonb DEFAULT '[]',
  show_partners boolean DEFAULT true,
  copyright_text text DEFAULT '© 2024 وزارة الأوقاف والشؤون الدينية - دولة فلسطين. جميع الحقوق محفوظة.',
  bottom_links jsonb DEFAULT '[]',
  developer_credit text DEFAULT 'تم التطوير بواسطة فريق تقنية المعلومات',
  show_developer_credit boolean DEFAULT true,
  show_phone boolean DEFAULT true,
  show_email boolean DEFAULT true,
  show_address boolean DEFAULT true,
  show_working_hours boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE footer_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Footer settings are viewable by everyone"
  ON footer_settings FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only authenticated users can update footer settings"
  ON footer_settings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- جدول إعدادات التطبيق (key-value)
CREATE TABLE IF NOT EXISTS app_settings (
  key text PRIMARY KEY,
  value text,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "App settings are viewable by everyone"
  ON app_settings FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only authenticated users can manage app settings"
  ON app_settings FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- جدول شرائح البانر الرئيسي
CREATE TABLE IF NOT EXISTS hero_slides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  cta_text text NOT NULL DEFAULT 'اقرأ المزيد',
  cta_link text NOT NULL DEFAULT '/news',
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Hero slides are viewable by everyone"
  ON hero_slides FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage hero slides"
  ON hero_slides FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- جدول شرائح الصفحة الرئيسية
CREATE TABLE IF NOT EXISTS home_hero_slides (
  id bigserial PRIMARY KEY,
  title_ar text NOT NULL,
  title_en text,
  subtitle_ar text,
  subtitle_en text,
  description_ar text,
  description_en text,
  button_text_ar text,
  button_text_en text,
  button_url text,
  image_url text,
  overlay_alpha integer NOT NULL DEFAULT 60,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE home_hero_slides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Home hero slides are viewable by everyone"
  ON home_hero_slides FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage home hero slides"
  ON home_hero_slides FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- جدول أخبار الصفحة الرئيسية
CREATE TABLE IF NOT EXISTS home_news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_ar text NOT NULL,
  title_en text,
  summary_ar text,
  summary_en text,
  image_url text,
  published_at date,
  is_announcement boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE home_news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Home news are viewable by everyone"
  ON home_news FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage home news"
  ON home_news FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- جدول خدمات الصفحة الرئيسية
CREATE TABLE IF NOT EXISTS home_services (
  id bigserial PRIMARY KEY,
  title_ar text NOT NULL,
  title_en text,
  description_ar text,
  description_en text,
  icon_name text,
  url text NOT NULL,
  service_type text NOT NULL DEFAULT 'internal' CHECK (service_type IN ('internal', 'external', 'download')),
  is_featured boolean NOT NULL DEFAULT true,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE home_services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Home services are viewable by everyone"
  ON home_services FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage home services"
  ON home_services FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- جدول إحصائيات الصفحة الرئيسية
CREATE TABLE IF NOT EXISTS home_stats (
  id bigserial PRIMARY KEY,
  key text NOT NULL UNIQUE,
  label_ar text NOT NULL,
  label_en text,
  value text NOT NULL,
  icon_name text,
  stat_type text NOT NULL DEFAULT 'primary' CHECK (stat_type IN ('primary', 'secondary', 'accent', 'success')),
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE home_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Home stats are viewable by everyone"
  ON home_stats FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage home stats"
  ON home_stats FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- جدول إدارة أقسام الصفحة الرئيسية
CREATE TABLE IF NOT EXISTS homepage_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_name varchar NOT NULL UNIQUE,
  settings jsonb NOT NULL DEFAULT '{}',
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

ALTER TABLE homepage_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Homepage sections are viewable by everyone"
  ON homepage_sections FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage homepage sections"
  ON homepage_sections FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- جدول الأخبار العاجلة
CREATE TABLE IF NOT EXISTS breaking_news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text text NOT NULL,
  link text,
  icon text,
  priority text NOT NULL DEFAULT 'normal' CHECK (priority IN ('urgent', 'high', 'normal')),
  bg_color text NOT NULL DEFAULT '#DC2626',
  text_color text NOT NULL DEFAULT '#FFFFFF',
  display_order integer NOT NULL DEFAULT 1,
  is_active boolean NOT NULL DEFAULT true,
  expires_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

ALTER TABLE breaking_news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Breaking news are viewable by everyone"
  ON breaking_news FOR SELECT
  TO public
  USING (is_active = true AND (expires_at IS NULL OR expires_at > now()));

CREATE POLICY "Authenticated users can manage breaking news"
  ON breaking_news FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- 2. جدول المستخدمين الإداريين
-- =====================================================

CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text NOT NULL UNIQUE,
  name text NOT NULL,
  role text NOT NULL DEFAULT 'employee' CHECK (role IN ('super_admin', 'admin', 'manager', 'employee', 'viewer')),
  department text NOT NULL,
  governorate text REFERENCES governorates(code),
  phone text,
  avatar_url text,
  is_active boolean DEFAULT true,
  last_login timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  directorate_id integer
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin users can view their own profile"
  ON admin_users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admin users can update their own profile"
  ON admin_users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Super admins can view all admin users"
  ON admin_users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

CREATE POLICY "Super admins can manage all admin users"
  ON admin_users FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- =====================================================
-- 3. جداول المواقع الجغرافية
-- =====================================================

-- جدول المدن والبلدات
CREATE TABLE IF NOT EXISTS cities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  governorate_id uuid NOT NULL REFERENCES governorates(id),
  name_ar text NOT NULL CHECK (name_ar IS NOT NULL AND name_ar <> ''),
  name_en text NOT NULL,
  code varchar NOT NULL,
  type varchar NOT NULL CHECK (type IN ('مدينة', 'بلدة', 'قرية', 'مخيم', 'حارة', 'منطقة')),
  population integer,
  area_km2 numeric,
  elevation integer,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  name_ar_full text,
  name_ar_variant text,
  historical_name_ar text
);

ALTER TABLE cities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cities are viewable by everyone"
  ON cities FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage cities"
  ON cities FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- جدول المواقع التفصيلية
CREATE TABLE IF NOT EXISTS locations (
  id serial PRIMARY KEY,
  governorate_code text NOT NULL REFERENCES governorates(code),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('City', 'Village', 'Camp')),
  code varchar
);

ALTER TABLE locations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Locations are viewable by everyone"
  ON locations FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage locations"
  ON locations FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- 4. جداول الأخبار والإعلانات الإضافية
-- =====================================================

-- جدول عناصر الأخبار
CREATE TABLE IF NOT EXISTS news_items (
  id bigserial PRIMARY KEY,
  title_ar text NOT NULL,
  title_en text,
  summary_ar text,
  summary_en text,
  content_ar text,
  content_en text,
  image_url text,
  published_at timestamptz NOT NULL DEFAULT now(),
  is_published boolean NOT NULL DEFAULT true,
  is_featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE news_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "News items are viewable by everyone"
  ON news_items FOR SELECT
  TO public
  USING (is_published = true);

CREATE POLICY "Authenticated users can manage news items"
  ON news_items FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- جدول مقالات الأخبار
CREATE TABLE IF NOT EXISTS news_articles (
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

ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published news articles are viewable by everyone"
  ON news_articles FOR SELECT
  TO public
  USING (status = 'published');

CREATE POLICY "Authenticated users can manage news articles"
  ON news_articles FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- جدول عناصر الإعلانات
CREATE TABLE IF NOT EXISTS announcement_items (
  id bigserial PRIMARY KEY,
  title_ar text NOT NULL,
  title_en text,
  summary_ar text,
  summary_en text,
  content_ar text,
  content_en text,
  published_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz,
  is_published boolean NOT NULL DEFAULT true,
  is_featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE announcement_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published announcement items are viewable by everyone"
  ON announcement_items FOR SELECT
  TO public
  USING (is_published = true AND (expires_at IS NULL OR expires_at > now()));

CREATE POLICY "Authenticated users can manage announcement items"
  ON announcement_items FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- 5. جداول التاريخ
-- =====================================================

-- جدول الفترات التاريخية
CREATE TABLE IF NOT EXISTS historical_periods (
  id serial PRIMARY KEY,
  name text NOT NULL,
  start_year integer,
  end_year integer,
  order_index integer
);

ALTER TABLE historical_periods ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Historical periods are viewable by everyone"
  ON historical_periods FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage historical periods"
  ON historical_periods FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- جدول الوحدات الإدارية التاريخية
CREATE TABLE IF NOT EXISTS historical_admin_units (
  id serial PRIMARY KEY,
  name text NOT NULL,
  period_id integer REFERENCES historical_periods(id)
);

ALTER TABLE historical_admin_units ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Historical admin units are viewable by everyone"
  ON historical_admin_units FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage historical admin units"
  ON historical_admin_units FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- جدول المصطلحات الإسلامية
CREATE TABLE IF NOT EXISTS islamic_terms (
  id serial PRIMARY KEY,
  term_ar text NOT NULL,
  category varchar NOT NULL,
  explanation text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE islamic_terms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Islamic terms are viewable by everyone"
  ON islamic_terms FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage islamic terms"
  ON islamic_terms FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- 6. جداول إضافية
-- =====================================================

-- جدول التصنيفات
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  name varchar NOT NULL,
  color varchar,
  icon varchar
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own categories"
  ON categories FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own categories"
  ON categories FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- جدول الإنجازات
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  name varchar NOT NULL,
  unlocked_at timestamptz,
  type varchar
);

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own achievements"
  ON achievements FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "System can create achievements"
  ON achievements FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- جدول العادات اليومية
CREATE TABLE IF NOT EXISTS daily_habits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  name varchar NOT NULL,
  streak_count integer DEFAULT 0,
  best_streak integer DEFAULT 0,
  days_active bit DEFAULT B'1111111'
);

ALTER TABLE daily_habits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own daily habits"
  ON daily_habits FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own daily habits"
  ON daily_habits FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
