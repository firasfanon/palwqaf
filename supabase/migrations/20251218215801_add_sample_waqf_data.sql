/*
  # إضافة بيانات تجريبية للنظام الوقفي

  ## البيانات المضافة
  
  ### 1. أنواع الأصول
  ### 2. مدراء الأوقاف
  ### 3. المستأجرين
  ### 4. تصنيفات المستندات

  ## ملاحظة
    - هذه بيانات تجريبية للاختبار فقط
*/

-- =====================================================
-- 1. أنواع الأصول الوقفية
-- =====================================================

INSERT INTO asset_types (name_ar, name_en, description_ar, description_en, category, icon, color) VALUES
('مسجد', 'Mosque', 'مساجد ودور عبادة', 'Mosques and prayer halls', 'religious', 'mosque', '#059669'),
('مقبرة', 'Cemetery', 'مقابر إسلامية', 'Islamic cemeteries', 'religious', 'tombstone', '#64748b'),
('مدرسة', 'School', 'مدارس ومعاهد تعليمية', 'Schools and educational institutes', 'educational', 'school', '#0891b2'),
('محل تجاري', 'Shop', 'محلات ومتاجر', 'Commercial shops', 'commercial', 'store', '#d97706'),
('شقة سكنية', 'Apartment', 'شقق سكنية', 'Residential apartments', 'residential', 'home', '#7c3aed'),
('أرض زراعية', 'Agricultural Land', 'أراضي زراعية', 'Agricultural lands', 'agricultural', 'tree', '#16a34a'),
('عيادة', 'Clinic', 'عيادات ومراكز صحية', 'Clinics and health centers', 'healthcare', 'hospital', '#dc2626'),
('مؤسسة خيرية', 'Charity', 'مؤسسات ومراكز خيرية', 'Charitable institutions', 'charitable', 'heart', '#ec4899')
ON CONFLICT (name_ar) DO NOTHING;

-- =====================================================
-- 2. مدراء الأوقاف
-- =====================================================

INSERT INTO waqf_managers (name_ar, name_en, national_id, phone, email, position, department, hire_date, status, experience_years) VALUES
('أحمد محمود', 'Ahmed Mahmoud', '901234567', '0599123456', 'ahmed.mahmoud@awqaf.ps', 'مدير عام', 'الإدارة العامة', '2015-01-15', 'active', 9),
('فاطمة عبد الله', 'Fatima Abdullah', '902234567', '0599223456', 'fatima.abdullah@awqaf.ps', 'مديرة مديرية', 'مديرية رام الله', '2017-03-20', 'active', 7),
('محمد حسن', 'Mohammed Hasan', '903234567', '0599323456', 'mohammed.hasan@awqaf.ps', 'مفتش', 'قسم التفتيش', '2018-06-10', 'active', 6),
('سارة إبراهيم', 'Sara Ibrahim', '904234567', '0599423456', 'sara.ibrahim@awqaf.ps', 'محاسبة', 'القسم المالي', '2019-09-01', 'active', 5),
('خالد يوسف', 'Khaled Yousef', '905234567', '0599523456', 'khaled.yousef@awqaf.ps', 'مهندس', 'قسم الصيانة', '2020-02-15', 'active', 4)
ON CONFLICT (national_id) DO NOTHING;

-- =====================================================
-- 3. المستأجرين
-- =====================================================

INSERT INTO tenants (name_ar, name_en, national_id, phone, email, tenant_type, business_type, is_active) VALUES
('شركة النور التجارية', 'Al-Nour Trading Company', '400123456', '0598111222', 'info@alnour.ps', 'company', 'تجارة عامة', true),
('مؤسسة الأمل الخيرية', 'Al-Amal Charity', '400223456', '0598211222', 'info@alamal.ps', 'institution', 'خيري', true),
('عمر أحمد سعيد', 'Omar Ahmed Said', '901345678', '0598311222', 'omar.said@email.com', 'individual', 'محامي', true),
('مركز الشفاء الطبي', 'Al-Shifa Medical Center', '400323456', '0598411222', 'info@alshifa.ps', 'company', 'خدمات طبية', true),
('ليلى محمود', 'Layla Mahmoud', '902345678', '0598511222', 'layla.m@email.com', 'individual', 'معلمة', true)
ON CONFLICT (national_id) DO NOTHING;

-- =====================================================
-- 4. تصنيفات المستندات
-- =====================================================

INSERT INTO document_categories (name_ar, name_en, description, icon, color) VALUES
('عقود الإيجار', 'Lease Contracts', 'عقود إيجار الممتلكات الوقفية', 'file-text', '#3b82f6'),
('سندات ملكية', 'Ownership Deeds', 'سندات ملكية الأراضي والعقارات', 'file-check', '#10b981'),
('تقارير التفتيش', 'Inspection Reports', 'تقارير التفتيش الدورية', 'clipboard-check', '#f59e0b'),
('فواتير وإيصالات', 'Invoices & Receipts', 'الفواتير والإيصالات المالية', 'receipt', '#8b5cf6'),
('خرائط ومخططات', 'Maps & Plans', 'الخرائط والمخططات الهندسية', 'map', '#06b6d4'),
('وثائق قانونية', 'Legal Documents', 'الوثائق والمستندات القانونية', 'scale', '#ef4444')
ON CONFLICT (name_ar) DO NOTHING;
