/*
  # إضافة جدول إعدادات النظام الشامل

  ## نظرة عامة
  هذا الـ migration يقوم بإنشاء جدول settings متقدم يستخدم نموذج key-value
  لتخزين جميع إعدادات النظام بمرونة عالية.

  ## الجداول الجديدة
  
  ### جدول `system_settings`
  - `id` (uuid, primary key) - المعرف الفريد
  - `category` (text) - فئة الإعداد (general, security, notifications, etc.)
  - `key` (text) - مفتاح الإعداد الفريد
  - `value` (jsonb) - القيمة (يدعم أي نوع بيانات)
  - `data_type` (text) - نوع البيانات (string, number, boolean, array, object)
  - `label_ar` (text) - التسمية بالعربية
  - `label_en` (text) - التسمية بالإنجليزية
  - `description_ar` (text) - وصف الإعداد بالعربية
  - `description_en` (text) - وصف الإعداد بالإنجليزية
  - `is_public` (boolean) - هل الإعداد عام للجميع؟
  - `is_editable` (boolean) - هل يمكن تعديله؟
  - `created_at` (timestamptz) - تاريخ الإنشاء
  - `updated_at` (timestamptz) - تاريخ التحديث
  - `updated_by` (uuid) - المستخدم الذي قام بالتحديث

  ## الأمان
  - تفعيل RLS على جدول system_settings
  - سياسة قراءة للجميع للإعدادات العامة
  - سياسة قراءة للمصادقين لجميع الإعدادات
  - سياسة كتابة للمدراء فقط

  ## الفهارس
  - فهرس على (category, key) لتسريع البحث
  - فهرس على category لتسريع الاستعلامات حسب الفئة
  - فهرس على key لتسريع البحث بالمفتاح
*/

-- إنشاء جدول system_settings
CREATE TABLE IF NOT EXISTS system_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  key text NOT NULL,
  value jsonb DEFAULT '{}',
  data_type text NOT NULL DEFAULT 'string' CHECK (data_type IN ('string', 'number', 'boolean', 'array', 'object', 'json')),
  label_ar text NOT NULL,
  label_en text,
  description_ar text,
  description_en text,
  is_public boolean DEFAULT false,
  is_editable boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id),
  UNIQUE(category, key)
);

-- إنشاء فهارس للأداء
CREATE INDEX IF NOT EXISTS idx_system_settings_category_key ON system_settings(category, key);
CREATE INDEX IF NOT EXISTS idx_system_settings_category ON system_settings(category);
CREATE INDEX IF NOT EXISTS idx_system_settings_key ON system_settings(key);
CREATE INDEX IF NOT EXISTS idx_system_settings_is_public ON system_settings(is_public);

-- تفعيل RLS
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

-- سياسة قراءة الإعدادات العامة للجميع
CREATE POLICY "Anyone can read public settings"
  ON system_settings
  FOR SELECT
  USING (is_public = true);

-- سياسة قراءة جميع الإعدادات للمصادقين
CREATE POLICY "Authenticated users can read all settings"
  ON system_settings
  FOR SELECT
  TO authenticated
  USING (true);

-- سياسة كتابة للمدراء والمشرفين فقط
CREATE POLICY "Admins can manage settings"
  ON system_settings
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id::text = auth.uid()::text 
      AND users.role IN ('admin', 'super_admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id::text = auth.uid()::text 
      AND users.role IN ('admin', 'super_admin')
    )
  );

-- إدراج بيانات افتراضية

-- 1. الإعدادات العامة
INSERT INTO system_settings (category, key, value, data_type, label_ar, label_en, description_ar, is_public, is_editable) VALUES
('general', 'site_name', '"وزارة الأوقاف والشؤون الدينية"', 'string', 'اسم الموقع', 'Site Name', 'اسم الموقع الرسمي', true, true),
('general', 'site_description', '"الموقع الرسمي لوزارة الأوقاف والشؤون الدينية - دولة فلسطين"', 'string', 'وصف الموقع', 'Site Description', 'وصف الموقع للظهور في محركات البحث', true, true),
('general', 'site_keywords', '"أوقاف، فلسطين، مساجد، شؤون دينية، وزارة"', 'string', 'الكلمات المفتاحية', 'Keywords', 'كلمات مفتاحية لمحركات البحث', true, true),
('general', 'site_url', '"https://awqaf.gov.ps"', 'string', 'رابط الموقع', 'Site URL', 'الرابط الأساسي للموقع', true, true),
('general', 'admin_email', '"admin@awqaf.gov.ps"', 'string', 'بريد المدير', 'Admin Email', 'البريد الإلكتروني للمدير العام', false, true),
('general', 'support_email', '"support@awqaf.gov.ps"', 'string', 'بريد الدعم', 'Support Email', 'البريد الإلكتروني للدعم الفني', true, true)
ON CONFLICT (category, key) DO NOTHING;

-- 2. معلومات التواصل
INSERT INTO system_settings (category, key, value, data_type, label_ar, label_en, description_ar, is_public, is_editable) VALUES
('contact', 'contact_email', '"info@awqaf.gov.ps"', 'string', 'البريد الإلكتروني', 'Contact Email', 'بريد التواصل الرسمي', true, true),
('contact', 'contact_phone', '"+970 2 298 2532"', 'string', 'رقم الهاتف', 'Phone Number', 'رقم الهاتف الرئيسي', true, true),
('contact', 'contact_fax', '"+970 2 298 2534"', 'string', 'رقم الفاكس', 'Fax Number', 'رقم الفاكس', true, true),
('contact', 'address', '"رام الله - فلسطين - شارع الإرسال"', 'string', 'العنوان', 'Address', 'عنوان المقر الرئيسي', true, true),
('contact', 'working_hours', '"الأحد - الخميس: 8:00 ص - 3:00 م"', 'string', 'ساعات العمل', 'Working Hours', 'أوقات الدوام الرسمي', true, true),
('contact', 'emergency_phone', '"+970 2 298 2530"', 'string', 'هاتف الطوارئ', 'Emergency Phone', 'رقم هاتف الطوارئ', true, true)
ON CONFLICT (category, key) DO NOTHING;

-- 3. وسائل التواصل الاجتماعي
INSERT INTO system_settings (category, key, value, data_type, label_ar, label_en, description_ar, is_public, is_editable) VALUES
('social', 'facebook_url', '"https://facebook.com/awqaf.ps"', 'string', 'فيسبوك', 'Facebook', 'رابط صفحة فيسبوك', true, true),
('social', 'twitter_url', '"https://twitter.com/awqaf_ps"', 'string', 'تويتر', 'Twitter', 'رابط حساب تويتر', true, true),
('social', 'instagram_url', '"https://instagram.com/awqaf.ps"', 'string', 'إنستغرام', 'Instagram', 'رابط حساب إنستغرام', true, true),
('social', 'youtube_url', '"https://youtube.com/awqafps"', 'string', 'يوتيوب', 'YouTube', 'رابط قناة يوتيوب', true, true),
('social', 'linkedin_url', '"https://linkedin.com/company/awqaf-ps"', 'string', 'لينكد إن', 'LinkedIn', 'رابط صفحة لينكد إن', true, true)
ON CONFLICT (category, key) DO NOTHING;

-- 4. إعدادات اللغة والمنطقة
INSERT INTO system_settings (category, key, value, data_type, label_ar, label_en, description_ar, is_public, is_editable) VALUES
('localization', 'default_language', '"ar"', 'string', 'اللغة الافتراضية', 'Default Language', 'اللغة الافتراضية للموقع', true, true),
('localization', 'supported_languages', '["ar", "en"]', 'array', 'اللغات المدعومة', 'Supported Languages', 'قائمة اللغات المتاحة', true, true),
('localization', 'timezone', '"Asia/Jerusalem"', 'string', 'المنطقة الزمنية', 'Timezone', 'المنطقة الزمنية للنظام', true, true),
('localization', 'currency', '"ILS"', 'string', 'العملة', 'Currency', 'العملة الافتراضية', true, true),
('localization', 'date_format', '"dd/mm/yyyy"', 'string', 'تنسيق التاريخ', 'Date Format', 'تنسيق عرض التاريخ', true, true),
('localization', 'time_format', '"24h"', 'string', 'تنسيق الوقت', 'Time Format', 'تنسيق عرض الوقت', true, true),
('localization', 'number_format', '"arabic"', 'string', 'تنسيق الأرقام', 'Number Format', 'تنسيق عرض الأرقام', true, true),
('localization', 'rtl_support', 'true', 'boolean', 'دعم RTL', 'RTL Support', 'تفعيل الكتابة من اليمين لليسار', true, true)
ON CONFLICT (category, key) DO NOTHING;

-- 5. إعدادات الأمان
INSERT INTO system_settings (category, key, value, data_type, label_ar, label_en, description_ar, is_public, is_editable) VALUES
('security', 'enable_two_factor', 'false', 'boolean', 'المصادقة الثنائية', 'Two-Factor Auth', 'تفعيل المصادقة الثنائية', false, true),
('security', 'password_min_length', '8', 'number', 'الحد الأدنى لطول كلمة المرور', 'Min Password Length', 'الحد الأدنى لطول كلمة المرور', false, true),
('security', 'password_require_special', 'true', 'boolean', 'طلب رموز خاصة', 'Require Special Chars', 'طلب رموز خاصة في كلمة المرور', false, true),
('security', 'password_require_numbers', 'true', 'boolean', 'طلب أرقام', 'Require Numbers', 'طلب أرقام في كلمة المرور', false, true),
('security', 'password_require_uppercase', 'true', 'boolean', 'طلب أحرف كبيرة', 'Require Uppercase', 'طلب أحرف كبيرة في كلمة المرور', false, true),
('security', 'session_timeout', '30', 'number', 'مهلة الجلسة (دقيقة)', 'Session Timeout', 'مدة انتهاء الجلسة بالدقائق', false, true),
('security', 'max_login_attempts', '5', 'number', 'محاولات تسجيل الدخول', 'Max Login Attempts', 'الحد الأقصى لمحاولات تسجيل الدخول', false, true),
('security', 'lockout_duration', '15', 'number', 'مدة القفل (دقيقة)', 'Lockout Duration', 'مدة قفل الحساب بالدقائق', false, true),
('security', 'enable_captcha', 'true', 'boolean', 'تفعيل CAPTCHA', 'Enable CAPTCHA', 'تفعيل التحقق من الروبوتات', false, true),
('security', 'allow_registration', 'false', 'boolean', 'السماح بالتسجيل', 'Allow Registration', 'السماح بتسجيل حسابات جديدة', false, true),
('security', 'require_email_verification', 'true', 'boolean', 'طلب تأكيد البريد', 'Require Email Verification', 'طلب تأكيد البريد الإلكتروني', false, true),
('security', 'enable_audit_log', 'true', 'boolean', 'تفعيل سجل التدقيق', 'Enable Audit Log', 'تفعيل سجل تدقيق العمليات', false, true)
ON CONFLICT (category, key) DO NOTHING;

-- 6. إعدادات الإشعارات
INSERT INTO system_settings (category, key, value, data_type, label_ar, label_en, description_ar, is_public, is_editable) VALUES
('notifications', 'enable_notifications', 'true', 'boolean', 'تفعيل الإشعارات', 'Enable Notifications', 'تفعيل نظام الإشعارات', false, true),
('notifications', 'enable_email_alerts', 'true', 'boolean', 'تنبيهات البريد', 'Email Alerts', 'إرسال التنبيهات عبر البريد', false, true),
('notifications', 'enable_sms_alerts', 'false', 'boolean', 'تنبيهات SMS', 'SMS Alerts', 'إرسال التنبيهات عبر SMS', false, true),
('notifications', 'enable_push_notifications', 'true', 'boolean', 'الإشعارات الفورية', 'Push Notifications', 'إرسال الإشعارات الفورية', false, true),
('notifications', 'enable_desktop_notifications', 'true', 'boolean', 'إشعارات سطح المكتب', 'Desktop Notifications', 'إشعارات على سطح المكتب', false, true),
('notifications', 'notification_sound', 'true', 'boolean', 'صوت الإشعارات', 'Notification Sound', 'تشغيل صوت عند الإشعارات', false, true),
('notifications', 'email_digest_frequency', '"daily"', 'string', 'تكرار ملخص البريد', 'Email Digest Frequency', 'تكرار إرسال ملخص البريد', false, true)
ON CONFLICT (category, key) DO NOTHING;

-- 7. إعدادات النظام
INSERT INTO system_settings (category, key, value, data_type, label_ar, label_en, description_ar, is_public, is_editable) VALUES
('system', 'maintenance_mode', 'false', 'boolean', 'وضع الصيانة', 'Maintenance Mode', 'تفعيل وضع الصيانة', false, true),
('system', 'debug_mode', 'false', 'boolean', 'وضع التصحيح', 'Debug Mode', 'تفعيل وضع التصحيح', false, true),
('system', 'log_level', '"info"', 'string', 'مستوى السجلات', 'Log Level', 'مستوى تفصيل السجلات', false, true),
('system', 'max_file_size', '50', 'number', 'حجم الملف الأقصى (MB)', 'Max File Size', 'الحد الأقصى لحجم الملفات', false, true),
('system', 'allowed_file_types', '["pdf","doc","docx","xls","xlsx","jpg","png","gif","mp4","mp3"]', 'array', 'أنواع الملفات المسموحة', 'Allowed File Types', 'قائمة أنواع الملفات المسموح برفعها', false, true),
('system', 'auto_backup', 'true', 'boolean', 'النسخ الاحتياطي التلقائي', 'Auto Backup', 'تفعيل النسخ الاحتياطي التلقائي', false, true),
('system', 'backup_frequency', '"daily"', 'string', 'تكرار النسخ الاحتياطي', 'Backup Frequency', 'تكرار عمل النسخ الاحتياطي', false, true),
('system', 'backup_retention', '30', 'number', 'مدة حفظ النسخ (يوم)', 'Backup Retention', 'مدة الاحتفاظ بالنسخ الاحتياطية', false, true),
('system', 'compression_enabled', 'true', 'boolean', 'تفعيل الضغط', 'Compression Enabled', 'تفعيل ضغط البيانات', false, true),
('system', 'cache_enabled', 'true', 'boolean', 'تفعيل التخزين المؤقت', 'Cache Enabled', 'تفعيل التخزين المؤقت', false, true),
('system', 'cache_duration', '3600', 'number', 'مدة التخزين المؤقت (ثانية)', 'Cache Duration', 'مدة التخزين المؤقت بالثواني', false, true)
ON CONFLICT (category, key) DO NOTHING;

-- 8. إعدادات المظهر
INSERT INTO system_settings (category, key, value, data_type, label_ar, label_en, description_ar, is_public, is_editable) VALUES
('appearance', 'theme', '"islamic"', 'string', 'السمة', 'Theme', 'سمة الموقع', true, true),
('appearance', 'primary_color', '"#22c55e"', 'string', 'اللون الأساسي', 'Primary Color', 'اللون الأساسي للموقع', true, true),
('appearance', 'secondary_color', '"#eab308"', 'string', 'اللون الثانوي', 'Secondary Color', 'اللون الثانوي للموقع', true, true),
('appearance', 'accent_color', '"#16a34a"', 'string', 'لون التمييز', 'Accent Color', 'لون التمييز في الموقع', true, true),
('appearance', 'font_size', '"medium"', 'string', 'حجم الخط', 'Font Size', 'حجم الخط الافتراضي', true, true),
('appearance', 'font_family', '"Noto Sans Arabic"', 'string', 'نوع الخط', 'Font Family', 'نوع الخط المستخدم', true, true),
('appearance', 'dark_mode_enabled', 'false', 'boolean', 'الوضع الليلي', 'Dark Mode', 'تفعيل الوضع الليلي', true, true),
('appearance', 'high_contrast_mode', 'false', 'boolean', 'وضع التباين العالي', 'High Contrast', 'تفعيل وضع التباين العالي', true, true),
('appearance', 'animations_enabled', 'true', 'boolean', 'تفعيل الحركات', 'Animations Enabled', 'تفعيل الحركات والتأثيرات', true, true),
('appearance', 'reduced_motion', 'false', 'boolean', 'تقليل الحركة', 'Reduced Motion', 'تقليل الحركات لتجربة أفضل', true, true)
ON CONFLICT (category, key) DO NOTHING;

-- 9. إعدادات الخرائط
INSERT INTO system_settings (category, key, value, data_type, label_ar, label_en, description_ar, is_public, is_editable) VALUES
('maps', 'default_map_center', '{"lat": 31.7767, "lng": 35.2345}', 'json', 'مركز الخريطة الافتراضي', 'Default Map Center', 'نقطة المركز الافتراضية للخرائط', true, true),
('maps', 'default_zoom_level', '8', 'number', 'مستوى التكبير', 'Zoom Level', 'مستوى التكبير الافتراضي', true, true),
('maps', 'map_provider', '"openstreetmap"', 'string', 'مزود الخرائط', 'Map Provider', 'مزود خدمة الخرائط', false, true),
('maps', 'enable_satellite_view', 'true', 'boolean', 'عرض الأقمار الصناعية', 'Satellite View', 'تفعيل عرض الأقمار الصناعية', true, true),
('maps', 'enable_terrain_view', 'true', 'boolean', 'عرض التضاريس', 'Terrain View', 'تفعيل عرض التضاريس', true, true),
('maps', 'show_traffic_layer', 'false', 'boolean', 'طبقة الزحام', 'Traffic Layer', 'عرض طبقة الزحام المروري', true, true)
ON CONFLICT (category, key) DO NOTHING;

-- 10. إعدادات التقارير
INSERT INTO system_settings (category, key, value, data_type, label_ar, label_en, description_ar, is_public, is_editable) VALUES
('reports', 'default_report_format', '"pdf"', 'string', 'تنسيق التقرير الافتراضي', 'Default Report Format', 'تنسيق التقرير الافتراضي', false, true),
('reports', 'enable_scheduled_reports', 'true', 'boolean', 'التقارير المجدولة', 'Scheduled Reports', 'تفعيل التقارير المجدولة', false, true),
('reports', 'report_retention', '90', 'number', 'مدة حفظ التقارير (يوم)', 'Report Retention', 'مدة الاحتفاظ بالتقارير', false, true),
('reports', 'enable_report_sharing', 'true', 'boolean', 'مشاركة التقارير', 'Report Sharing', 'السماح بمشاركة التقارير', false, true),
('reports', 'watermark_reports', 'true', 'boolean', 'علامة مائية', 'Watermark Reports', 'إضافة علامة مائية للتقارير', false, true)
ON CONFLICT (category, key) DO NOTHING;

-- 11. إعدادات الأداء
INSERT INTO system_settings (category, key, value, data_type, label_ar, label_en, description_ar, is_public, is_editable) VALUES
('performance', 'enable_lazy_loading', 'true', 'boolean', 'التحميل التدريجي', 'Lazy Loading', 'تفعيل التحميل التدريجي', false, true),
('performance', 'enable_image_optimization', 'true', 'boolean', 'تحسين الصور', 'Image Optimization', 'تفعيل تحسين الصور', false, true),
('performance', 'enable_gzip_compression', 'true', 'boolean', 'ضغط Gzip', 'Gzip Compression', 'تفعيل ضغط Gzip', false, true),
('performance', 'enable_cdn', 'false', 'boolean', 'تفعيل CDN', 'Enable CDN', 'تفعيل شبكة توصيل المحتوى', false, true),
('performance', 'max_concurrent_users', '100', 'number', 'الحد الأقصى للمستخدمين', 'Max Concurrent Users', 'الحد الأقصى للمستخدمين المتزامنين', false, true)
ON CONFLICT (category, key) DO NOTHING;

-- 12. إعدادات التكامل
INSERT INTO system_settings (category, key, value, data_type, label_ar, label_en, description_ar, is_public, is_editable) VALUES
('integrations', 'enable_api_access', 'true', 'boolean', 'تفعيل API', 'Enable API Access', 'تفعيل الوصول عبر API', false, true),
('integrations', 'api_rate_limit', '1000', 'number', 'حد طلبات API', 'API Rate Limit', 'الحد الأقصى لطلبات API', false, true),
('integrations', 'enable_webhooks', 'false', 'boolean', 'تفعيل Webhooks', 'Enable Webhooks', 'تفعيل Webhooks', false, true),
('integrations', 'enable_external_auth', 'false', 'boolean', 'المصادقة الخارجية', 'External Auth', 'تفعيل المصادقة الخارجية', false, true)
ON CONFLICT (category, key) DO NOTHING;

-- 13. إعدادات الصيانة
INSERT INTO system_settings (category, key, value, data_type, label_ar, label_en, description_ar, is_public, is_editable) VALUES
('maintenance', 'auto_updates', 'false', 'boolean', 'التحديثات التلقائية', 'Auto Updates', 'تفعيل التحديثات التلقائية', false, true),
('maintenance', 'update_channel', '"stable"', 'string', 'قناة التحديث', 'Update Channel', 'قناة التحديث المفضلة', false, true),
('maintenance', 'maintenance_window', '"02:00-04:00"', 'string', 'نافذة الصيانة', 'Maintenance Window', 'وقت الصيانة المفضل', false, true),
('maintenance', 'enable_health_checks', 'true', 'boolean', 'فحوصات الصحة', 'Health Checks', 'تفعيل فحوصات صحة النظام', false, true),
('maintenance', 'health_check_interval', '300', 'number', 'فترة الفحص (ثانية)', 'Health Check Interval', 'فترة فحص صحة النظام', false, true)
ON CONFLICT (category, key) DO NOTHING;

-- إنشاء دالة لتحديث updated_at تلقائياً
CREATE OR REPLACE FUNCTION update_system_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- إنشاء trigger لتحديث updated_at
DROP TRIGGER IF EXISTS trigger_update_system_settings_updated_at ON system_settings;
CREATE TRIGGER trigger_update_system_settings_updated_at
  BEFORE UPDATE ON system_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_system_settings_updated_at();
