/*
  # إضافة جداول إضافية لنظام وزارة الأوقاف
  
  ## الجداول الجديدة
  
  ### 1. mosques - المساجد
  - `id` (uuid, primary key)
  - `name` - اسم المسجد
  - `description` - وصف المسجد
  - `address` - العنوان التفصيلي
  - `governorate` - المحافظة (foreign key)
  - `capacity` - السعة
  - `imam_id` - معرف الإمام (foreign key)
  - `construction_date` - تاريخ البناء
  - `status` - الحالة (active/under_construction/maintenance/closed)
  - `facilities` - المرافق (jsonb)
  - `coordinates` - الإحداثيات (jsonb)
  - `contact_phone` - رقم التواصل
  - `images` - الصور (jsonb array)
  - `waqf_land_id` - معرف الأرض الوقفية
  - `created_at`, `updated_at`
  
  ### 2. imams - الأئمة والخطباء
  - `id` (uuid, primary key)
  - `name` - الاسم
  - `qualification` - المؤهل العلمي
  - `specialization` - التخصص
  - `experience_years` - سنوات الخبرة
  - `phone` - رقم الهاتف
  - `email` - البريد الإلكتروني
  - `status` - الحالة (active/inactive/retired)
  - `appointment_date` - تاريخ التعيين
  - `photo_url` - رابط الصورة
  - `biography` - السيرة الذاتية
  - `created_at`, `updated_at`
  
  ### 3. friday_sermons - خطب الجمعة
  - `id` (uuid, primary key)
  - `title` - عنوان الخطبة
  - `content` - محتوى الخطبة
  - `preacher` - اسم الخطيب
  - `preacher_id` - معرف الخطيب (foreign key)
  - `sermon_date` - تاريخ الخطبة
  - `mosque_id` - معرف المسجد
  - `audio_url` - رابط التسجيل الصوتي
  - `video_url` - رابط التسجيل المرئي
  - `attachments` - المرفقات (jsonb)
  - `views` - عدد المشاهدات
  - `created_at`, `updated_at`
  
  ### 4. projects - المشاريع
  - `id` (uuid, primary key)
  - `name` - اسم المشروع
  - `description` - وصف المشروع
  - `type` - نوع المشروع (construction/renovation/development/service)
  - `status` - الحالة (planned/in_progress/completed/suspended)
  - `budget` - الميزانية
  - `spent_amount` - المبلغ المصروف
  - `start_date` - تاريخ البدء
  - `end_date` - تاريخ الانتهاء
  - `completion_percentage` - نسبة الإنجاز
  - `location` - الموقع
  - `governorate` - المحافظة
  - `manager_id` - معرف المدير المسؤول
  - `images` - صور المشروع (jsonb)
  - `created_at`, `updated_at`
  
  ### 5. former_ministers - الوزراء السابقون
  - `id` (uuid, primary key)
  - `name` - الاسم بالعربية
  - `name_en` - الاسم بالإنجليزية
  - `photo_url` - رابط الصورة
  - `start_date` - تاريخ البدء
  - `end_date` - تاريخ الانتهاء
  - `biography` - السيرة الذاتية
  - `achievements` - الإنجازات
  - `display_order` - ترتيب العرض
  - `created_at`, `updated_at`
  
  ### 6. organizational_structure - الهيكل التنظيمي
  - `id` (uuid, primary key)
  - `title` - المسمى الوظيفي
  - `parent_id` - معرف الوحدة الأعلى
  - `level` - المستوى في الهيكل
  - `description` - الوصف
  - `responsibilities` - المسؤوليات
  - `head_name` - اسم المسؤول
  - `head_email` - البريد الإلكتروني
  - `head_phone` - رقم الهاتف
  - `display_order` - ترتيب العرض
  - `created_at`, `updated_at`
  
  ### 7. media_gallery - المعرض الإعلامي
  - `id` (uuid, primary key)
  - `title` - العنوان
  - `description` - الوصف
  - `type` - النوع (image/video)
  - `url` - رابط الملف
  - `thumbnail_url` - رابط الصورة المصغرة
  - `category` - الفئة (events/mosques/activities/projects/other)
  - `tags` - الوسوم (array)
  - `event_date` - تاريخ الحدث
  - `views` - عدد المشاهدات
  - `created_at`, `updated_at`
  
  ### 8. social_services - الخدمات الاجتماعية
  - `id` (uuid, primary key)
  - `name` - اسم الخدمة
  - `description` - وصف الخدمة
  - `type` - نوع الخدمة (financial_aid/education/healthcare/marriage/other)
  - `eligibility_criteria` - شروط الاستحقاق
  - `required_documents` - المستندات المطلوبة
  - `contact_info` - معلومات التواصل
  - `status` - الحالة (active/inactive)
  - `icon` - أيقونة الخدمة
  - `created_at`, `updated_at`
  
  ### 9. contact_messages - رسائل التواصل
  - `id` (uuid, primary key)
  - `name` - الاسم
  - `email` - البريد الإلكتروني
  - `phone` - رقم الهاتف
  - `subject` - الموضوع
  - `message` - الرسالة
  - `status` - الحالة (new/in_progress/resolved/closed)
  - `priority` - الأولوية (low/normal/high/urgent)
  - `assigned_to` - مسند إلى (foreign key)
  - `replied_at` - تاريخ الرد
  - `reply_message` - نص الرد
  - `created_at`, `updated_at`
  
  ## الأمان
  - تفعيل RLS على جميع الجداول
  - سياسات قراءة عامة للمحتوى العام
  - سياسات تعديل للمستخدمين المصرح لهم فقط
*/

-- 1. جدول الأئمة والخطباء
CREATE TABLE IF NOT EXISTS imams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  qualification text,
  specialization text,
  experience_years integer DEFAULT 0,
  phone text,
  email text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'retired')),
  appointment_date date,
  photo_url text,
  biography text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. جدول المساجد
CREATE TABLE IF NOT EXISTS mosques (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  address text,
  governorate text REFERENCES governorates(code),
  capacity integer DEFAULT 0,
  imam_id uuid REFERENCES imams(id),
  construction_date date,
  status text DEFAULT 'active' CHECK (status IN ('active', 'under_construction', 'maintenance', 'closed')),
  facilities jsonb DEFAULT '[]'::jsonb,
  coordinates jsonb DEFAULT '{}'::jsonb,
  contact_phone text,
  images jsonb DEFAULT '[]'::jsonb,
  waqf_land_id integer REFERENCES waqf_lands(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 3. جدول خطب الجمعة
CREATE TABLE IF NOT EXISTS friday_sermons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text,
  preacher text NOT NULL,
  preacher_id uuid REFERENCES imams(id),
  sermon_date date NOT NULL,
  mosque_id uuid REFERENCES mosques(id),
  audio_url text,
  video_url text,
  attachments jsonb DEFAULT '[]'::jsonb,
  views integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 4. جدول المشاريع
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  type text DEFAULT 'construction' CHECK (type IN ('construction', 'renovation', 'development', 'service')),
  status text DEFAULT 'planned' CHECK (status IN ('planned', 'in_progress', 'completed', 'suspended')),
  budget numeric DEFAULT 0,
  spent_amount numeric DEFAULT 0,
  start_date date,
  end_date date,
  completion_percentage integer DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
  location text,
  governorate text REFERENCES governorates(code),
  manager_id integer REFERENCES users(id),
  images jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 5. جدول الوزراء السابقون
CREATE TABLE IF NOT EXISTS former_ministers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  name_en text,
  photo_url text,
  start_date date NOT NULL,
  end_date date,
  biography text,
  achievements text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 6. جدول الهيكل التنظيمي
CREATE TABLE IF NOT EXISTS organizational_structure (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  parent_id uuid REFERENCES organizational_structure(id),
  level integer DEFAULT 1,
  description text,
  responsibilities text,
  head_name text,
  head_email text,
  head_phone text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 7. جدول المعرض الإعلامي
CREATE TABLE IF NOT EXISTS media_gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  type text DEFAULT 'image' CHECK (type IN ('image', 'video')),
  url text NOT NULL,
  thumbnail_url text,
  category text DEFAULT 'other' CHECK (category IN ('events', 'mosques', 'activities', 'projects', 'other')),
  tags text[] DEFAULT '{}'::text[],
  event_date date,
  views integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 8. جدول الخدمات الاجتماعية
CREATE TABLE IF NOT EXISTS social_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  type text DEFAULT 'other' CHECK (type IN ('financial_aid', 'education', 'healthcare', 'marriage', 'other')),
  eligibility_criteria text,
  required_documents text,
  contact_info text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  icon text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 9. جدول رسائل التواصل
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'closed')),
  priority text DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  assigned_to integer REFERENCES users(id),
  replied_at timestamptz,
  reply_message text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- تفعيل RLS على جميع الجداول
ALTER TABLE imams ENABLE ROW LEVEL SECURITY;
ALTER TABLE mosques ENABLE ROW LEVEL SECURITY;
ALTER TABLE friday_sermons ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE former_ministers ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizational_structure ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان - القراءة العامة للمحتوى العام

-- سياسات الأئمة
CREATE POLICY "الأئمة: القراءة العامة"
  ON imams FOR SELECT
  TO public
  USING (true);

CREATE POLICY "الأئمة: الإدارة للمصرح لهم"
  ON imams FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- سياسات المساجد
CREATE POLICY "المساجد: القراءة العامة"
  ON mosques FOR SELECT
  TO public
  USING (true);

CREATE POLICY "المساجد: الإدارة للمصرح لهم"
  ON mosques FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- سياسات خطب الجمعة
CREATE POLICY "خطب الجمعة: القراءة العامة"
  ON friday_sermons FOR SELECT
  TO public
  USING (true);

CREATE POLICY "خطب الجمعة: الإدارة للمصرح لهم"
  ON friday_sermons FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- سياسات المشاريع
CREATE POLICY "المشاريع: القراءة العامة"
  ON projects FOR SELECT
  TO public
  USING (true);

CREATE POLICY "المشاريع: الإدارة للمصرح لهم"
  ON projects FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- سياسات الوزراء السابقون
CREATE POLICY "الوزراء السابقون: القراءة العامة"
  ON former_ministers FOR SELECT
  TO public
  USING (true);

CREATE POLICY "الوزراء السابقون: الإدارة للمصرح لهم"
  ON former_ministers FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- سياسات الهيكل التنظيمي
CREATE POLICY "الهيكل التنظيمي: القراءة العامة"
  ON organizational_structure FOR SELECT
  TO public
  USING (true);

CREATE POLICY "الهيكل التنظيمي: الإدارة للمصرح لهم"
  ON organizational_structure FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- سياسات المعرض الإعلامي
CREATE POLICY "المعرض الإعلامي: القراءة العامة"
  ON media_gallery FOR SELECT
  TO public
  USING (true);

CREATE POLICY "المعرض الإعلامي: الإدارة للمصرح لهم"
  ON media_gallery FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- سياسات الخدمات الاجتماعية
CREATE POLICY "الخدمات الاجتماعية: القراءة العامة"
  ON social_services FOR SELECT
  TO public
  USING (status = 'active');

CREATE POLICY "الخدمات الاجتماعية: الإدارة للمصرح لهم"
  ON social_services FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- سياسات رسائل التواصل
CREATE POLICY "رسائل التواصل: الإنشاء للجميع"
  ON contact_messages FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "رسائل التواصل: القراءة للمصرح لهم"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "رسائل التواصل: التعديل للمصرح لهم"
  ON contact_messages FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "رسائل التواصل: الحذف للمصرح لهم"
  ON contact_messages FOR DELETE
  TO authenticated
  USING (true);

-- إنشاء فهارس للأداء
CREATE INDEX IF NOT EXISTS idx_mosques_governorate ON mosques(governorate);
CREATE INDEX IF NOT EXISTS idx_mosques_imam ON mosques(imam_id);
CREATE INDEX IF NOT EXISTS idx_mosques_status ON mosques(status);
CREATE INDEX IF NOT EXISTS idx_friday_sermons_date ON friday_sermons(sermon_date DESC);
CREATE INDEX IF NOT EXISTS idx_friday_sermons_mosque ON friday_sermons(mosque_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_governorate ON projects(governorate);
CREATE INDEX IF NOT EXISTS idx_media_gallery_category ON media_gallery(category);
CREATE INDEX IF NOT EXISTS idx_media_gallery_type ON media_gallery(type);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created ON contact_messages(created_at DESC);