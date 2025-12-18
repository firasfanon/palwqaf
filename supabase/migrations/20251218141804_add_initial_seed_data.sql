/*
  # إضافة بيانات أولية للنظام
  
  ## نظرة عامة
  إضافة البيانات الأساسية اللازمة لتشغيل النظام بشكل كامل
  
  ## البيانات المضافة
  
  ### 1. المحافظات الفلسطينية (governorates)
  - 16 محافظة (الضفة الغربية وقطاع غزة)
  - تشمل الاسم بالعربية والإنجليزية، الكود، والمنطقة
  
  ### 2. المدن الرئيسية (cities)
  - 17 مدينة رئيسية في المحافظات المختلفة
  - مرتبطة بالمحافظات مع بيانات السكان والمساحة
  
  ### 3. حالات المهام (task_statuses)
  - 6 حالات أساسية لتتبع المهام
  - من الجديدة إلى المكتملة والملغاة
  
  ### 4. أنواع المهام (task_types)
  - 8 أنواع أساسية للمهام الإدارية
  - تشمل الزيارات الميدانية، الاجتماعات، التفتيش، إلخ
  
  ## ملاحظات مهمة
  - استخدام IF NOT EXISTS لتجنب التكرار
  - جميع البيانات باللغة العربية والإنجليزية
  - البيانات قابلة للتعديل من لوحة الإدارة
*/

-- =====================================================
-- 1. المحافظات الفلسطينية
-- =====================================================
INSERT INTO governorates (name_ar, name_en, code, region) VALUES
  ('رام الله والبيرة', 'Ramallah and Al-Bireh', 'RMB', 'west_bank'),
  ('القدس', 'Jerusalem', 'JRS', 'west_bank'),
  ('الخليل', 'Hebron', 'HBN', 'west_bank'),
  ('بيت لحم', 'Bethlehem', 'BTH', 'west_bank'),
  ('أريحا والأغوار', 'Jericho and the Jordan Valley', 'JRC', 'west_bank'),
  ('نابلس', 'Nablus', 'NBS', 'west_bank'),
  ('جنين', 'Jenin', 'JNN', 'west_bank'),
  ('طولكرم', 'Tulkarm', 'TKM', 'west_bank'),
  ('قلقيلية', 'Qalqilya', 'QLQ', 'west_bank'),
  ('سلفيت', 'Salfit', 'SLF', 'west_bank'),
  ('طوباس', 'Tubas', 'TBS', 'west_bank'),
  ('غزة', 'Gaza', 'GZA', 'gaza'),
  ('شمال غزة', 'North Gaza', 'NGZ', 'gaza'),
  ('دير البلح', 'Deir al-Balah', 'DBH', 'gaza'),
  ('خان يونس', 'Khan Yunis', 'KYN', 'gaza'),
  ('رفح', 'Rafah', 'RFH', 'gaza')
ON CONFLICT (code) DO NOTHING;

-- =====================================================
-- 2. المدن الرئيسية
-- =====================================================
DO $$
BEGIN
  -- رام الله
  IF NOT EXISTS (SELECT 1 FROM cities WHERE code = 'RML') THEN
    INSERT INTO cities (name_ar, name_en, code, governorate_id, population, area_km2, type, is_active)
    SELECT 'رام الله', 'Ramallah', 'RML', id, 38998, 16.5, 'مدينة', true FROM governorates WHERE code = 'RMB';
  END IF;
  
  -- البيرة
  IF NOT EXISTS (SELECT 1 FROM cities WHERE code = 'BIR') THEN
    INSERT INTO cities (name_ar, name_en, code, governorate_id, population, area_km2, type, is_active)
    SELECT 'البيرة', 'Al-Bireh', 'BIR', id, 42915, 22.5, 'مدينة', true FROM governorates WHERE code = 'RMB';
  END IF;
  
  -- القدس
  IF NOT EXISTS (SELECT 1 FROM cities WHERE code = 'JRS') THEN
    INSERT INTO cities (name_ar, name_en, code, governorate_id, population, area_km2, type, is_active)
    SELECT 'القدس', 'Jerusalem', 'JRS', id, 456300, 125.0, 'مدينة', true FROM governorates WHERE code = 'JRS';
  END IF;
  
  -- الخليل
  IF NOT EXISTS (SELECT 1 FROM cities WHERE code = 'HBN') THEN
    INSERT INTO cities (name_ar, name_en, code, governorate_id, population, area_km2, type, is_active)
    SELECT 'الخليل', 'Hebron', 'HBN', id, 215452, 74.1, 'مدينة', true FROM governorates WHERE code = 'HBN';
  END IF;
  
  -- بيت لحم
  IF NOT EXISTS (SELECT 1 FROM cities WHERE code = 'BTH') THEN
    INSERT INTO cities (name_ar, name_en, code, governorate_id, population, area_km2, type, is_active)
    SELECT 'بيت لحم', 'Bethlehem', 'BTH', id, 29930, 6.0, 'مدينة', true FROM governorates WHERE code = 'BTH';
  END IF;
  
  -- أريحا
  IF NOT EXISTS (SELECT 1 FROM cities WHERE code = 'JRC') THEN
    INSERT INTO cities (name_ar, name_en, code, governorate_id, population, area_km2, type, is_active)
    SELECT 'أريحا', 'Jericho', 'JRC', id, 22668, 58.7, 'مدينة', true FROM governorates WHERE code = 'JRC';
  END IF;
  
  -- نابلس
  IF NOT EXISTS (SELECT 1 FROM cities WHERE code = 'NBS') THEN
    INSERT INTO cities (name_ar, name_en, code, governorate_id, population, area_km2, type, is_active)
    SELECT 'نابلس', 'Nablus', 'NBS', id, 156906, 28.6, 'مدينة', true FROM governorates WHERE code = 'NBS';
  END IF;
  
  -- جنين
  IF NOT EXISTS (SELECT 1 FROM cities WHERE code = 'JNN') THEN
    INSERT INTO cities (name_ar, name_en, code, governorate_id, population, area_km2, type, is_active)
    SELECT 'جنين', 'Jenin', 'JNN', id, 48346, 14.4, 'مدينة', true FROM governorates WHERE code = 'JNN';
  END IF;
  
  -- طولكرم
  IF NOT EXISTS (SELECT 1 FROM cities WHERE code = 'TKM') THEN
    INSERT INTO cities (name_ar, name_en, code, governorate_id, population, area_km2, type, is_active)
    SELECT 'طولكرم', 'Tulkarm', 'TKM', id, 64532, 32.6, 'مدينة', true FROM governorates WHERE code = 'TKM';
  END IF;
  
  -- قلقيلية
  IF NOT EXISTS (SELECT 1 FROM cities WHERE code = 'QLQ') THEN
    INSERT INTO cities (name_ar, name_en, code, governorate_id, population, area_km2, type, is_active)
    SELECT 'قلقيلية', 'Qalqilya', 'QLQ', id, 51683, 14.4, 'مدينة', true FROM governorates WHERE code = 'QLQ';
  END IF;
  
  -- سلفيت
  IF NOT EXISTS (SELECT 1 FROM cities WHERE code = 'SLF') THEN
    INSERT INTO cities (name_ar, name_en, code, governorate_id, population, area_km2, type, is_active)
    SELECT 'سلفيت', 'Salfit', 'SLF', id, 10911, 4.4, 'مدينة', true FROM governorates WHERE code = 'SLF';
  END IF;
  
  -- طوباس
  IF NOT EXISTS (SELECT 1 FROM cities WHERE code = 'TBS') THEN
    INSERT INTO cities (name_ar, name_en, code, governorate_id, population, area_km2, type, is_active)
    SELECT 'طوباس', 'Tubas', 'TBS', id, 21982, 12.2, 'مدينة', true FROM governorates WHERE code = 'TBS';
  END IF;
  
  -- غزة
  IF NOT EXISTS (SELECT 1 FROM cities WHERE code = 'GZC') THEN
    INSERT INTO cities (name_ar, name_en, code, governorate_id, population, area_km2, type, is_active)
    SELECT 'غزة', 'Gaza City', 'GZC', id, 700000, 45.0, 'مدينة', true FROM governorates WHERE code = 'GZA';
  END IF;
  
  -- جباليا
  IF NOT EXISTS (SELECT 1 FROM cities WHERE code = 'JBL') THEN
    INSERT INTO cities (name_ar, name_en, code, governorate_id, population, area_km2, type, is_active)
    SELECT 'جباليا', 'Jabalia', 'JBL', id, 168568, 35.0, 'مخيم', true FROM governorates WHERE code = 'NGZ';
  END IF;
  
  -- دير البلح
  IF NOT EXISTS (SELECT 1 FROM cities WHERE code = 'DBH') THEN
    INSERT INTO cities (name_ar, name_en, code, governorate_id, population, area_km2, type, is_active)
    SELECT 'دير البلح', 'Deir al-Balah', 'DBH', id, 75132, 25.0, 'مدينة', true FROM governorates WHERE code = 'DBH';
  END IF;
  
  -- خان يونس
  IF NOT EXISTS (SELECT 1 FROM cities WHERE code = 'KYN') THEN
    INSERT INTO cities (name_ar, name_en, code, governorate_id, population, area_km2, type, is_active)
    SELECT 'خان يونس', 'Khan Yunis', 'KYN', id, 205125, 54.0, 'مدينة', true FROM governorates WHERE code = 'KYN';
  END IF;
  
  -- رفح
  IF NOT EXISTS (SELECT 1 FROM cities WHERE code = 'RFH') THEN
    INSERT INTO cities (name_ar, name_en, code, governorate_id, population, area_km2, type, is_active)
    SELECT 'رفح', 'Rafah', 'RFH', id, 152950, 55.0, 'مدينة', true FROM governorates WHERE code = 'RFH';
  END IF;
END $$;

-- =====================================================
-- 3. حالات المهام
-- =====================================================
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM task_statuses WHERE name_ar = 'جديدة') THEN
    INSERT INTO task_statuses (name_ar, name_en, description_ar, description_en, color, order_index, is_active, is_final, allows_editing)
    VALUES ('جديدة', 'New', 'مهمة جديدة لم يتم البدء بها', 'New task not yet started', '#6B7280', 1, true, false, true);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM task_statuses WHERE name_ar = 'قيد التنفيذ') THEN
    INSERT INTO task_statuses (name_ar, name_en, description_ar, description_en, color, order_index, is_active, is_final, allows_editing)
    VALUES ('قيد التنفيذ', 'In Progress', 'جاري العمل على المهمة', 'Task is being worked on', '#3B82F6', 2, true, false, true);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM task_statuses WHERE name_ar = 'معلقة') THEN
    INSERT INTO task_statuses (name_ar, name_en, description_ar, description_en, color, order_index, is_active, is_final, allows_editing)
    VALUES ('معلقة', 'On Hold', 'المهمة معلقة مؤقتاً', 'Task is temporarily on hold', '#F59E0B', 3, true, false, true);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM task_statuses WHERE name_ar = 'قيد المراجعة') THEN
    INSERT INTO task_statuses (name_ar, name_en, description_ar, description_en, color, order_index, is_active, is_final, allows_editing)
    VALUES ('قيد المراجعة', 'Under Review', 'المهمة قيد المراجعة', 'Task is under review', '#8B5CF6', 4, true, false, true);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM task_statuses WHERE name_ar = 'مكتملة') THEN
    INSERT INTO task_statuses (name_ar, name_en, description_ar, description_en, color, order_index, is_active, is_final, allows_editing)
    VALUES ('مكتملة', 'Completed', 'تم إنجاز المهمة بنجاح', 'Task completed successfully', '#10B981', 5, true, true, false);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM task_statuses WHERE name_ar = 'ملغاة') THEN
    INSERT INTO task_statuses (name_ar, name_en, description_ar, description_en, color, order_index, is_active, is_final, allows_editing)
    VALUES ('ملغاة', 'Cancelled', 'تم إلغاء المهمة', 'Task has been cancelled', '#EF4444', 6, true, true, false);
  END IF;
END $$;

-- =====================================================
-- 4. أنواع المهام
-- =====================================================
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM task_types WHERE name_ar = 'مهمة إدارية') THEN
    INSERT INTO task_types (name, name_ar, description, description_ar, color, icon, category, category_ar, is_active, order_index)
    VALUES ('Administrative Task', 'مهمة إدارية', 'General administrative tasks', 'مهام إدارية عامة', '#3B82F6', 'briefcase', 'administrative', 'إدارية', true, 1);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM task_types WHERE name_ar = 'زيارة ميدانية') THEN
    INSERT INTO task_types (name, name_ar, description, description_ar, color, icon, category, category_ar, is_active, order_index)
    VALUES ('Field Visit', 'زيارة ميدانية', 'Field visits to sites and mosques', 'زيارات ميدانية للمواقع والمساجد', '#10B981', 'map-pin', 'field', 'ميدانية', true, 2);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM task_types WHERE name_ar = 'اجتماع') THEN
    INSERT INTO task_types (name, name_ar, description, description_ar, color, icon, category, category_ar, is_active, order_index)
    VALUES ('Meeting', 'اجتماع', 'Official meetings', 'اجتماعات رسمية', '#8B5CF6', 'users', 'meeting', 'اجتماعات', true, 3);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM task_types WHERE name_ar = 'مراجعة مستندات') THEN
    INSERT INTO task_types (name, name_ar, description, description_ar, color, icon, category, category_ar, is_active, order_index)
    VALUES ('Document Review', 'مراجعة مستندات', 'Review and audit documents', 'مراجعة وتدقيق المستندات', '#F59E0B', 'file-text', 'review', 'مراجعة', true, 4);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM task_types WHERE name_ar = 'متابعة قضية') THEN
    INSERT INTO task_types (name, name_ar, description, description_ar, color, icon, category, category_ar, is_active, order_index)
    VALUES ('Case Follow-up', 'متابعة قضية', 'Follow-up on legal cases', 'متابعة القضايا القانونية', '#EF4444', 'folder', 'legal', 'قانونية', true, 5);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM task_types WHERE name_ar = 'تفتيش') THEN
    INSERT INTO task_types (name, name_ar, description, description_ar, color, icon, category, category_ar, is_active, order_index)
    VALUES ('Inspection', 'تفتيش', 'Inspection of facilities and endowments', 'تفتيش المرافق والأوقاف', '#06B6D4', 'search', 'inspection', 'تفتيش', true, 6);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM task_types WHERE name_ar = 'دراسة مشروع') THEN
    INSERT INTO task_types (name, name_ar, description, description_ar, color, icon, category, category_ar, is_active, order_index)
    VALUES ('Project Study', 'دراسة مشروع', 'Study and evaluate projects', 'دراسة وتقييم المشاريع', '#EC4899', 'clipboard', 'project', 'مشاريع', true, 7);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM task_types WHERE name_ar = 'إعداد تقرير') THEN
    INSERT INTO task_types (name, name_ar, description, description_ar, color, icon, category, category_ar, is_active, order_index)
    VALUES ('Report Preparation', 'إعداد تقرير', 'Prepare periodic reports', 'إعداد التقارير الدورية', '#6366F1', 'file-bar-chart', 'report', 'تقارير', true, 8);
  END IF;
END $$;