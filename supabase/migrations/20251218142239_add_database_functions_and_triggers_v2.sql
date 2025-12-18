/*
  # إضافة وظائف قاعدة البيانات والـ Triggers
  
  ## نظرة عامة
  إضافة دوال وtriggers لأتمتة العمليات وتحسين الأداء
  
  ## الوظائف المضافة
  
  ### 1. دالة تحديث updated_at تلقائياً
  - تحديث حقل updated_at عند أي تعديل على السجل
  - تطبيقها على جميع الجداول التي تحتوي على حقل updated_at
  
  ### 2. دوال حساب الإحصائيات
  - حساب عدد المهام حسب الحالة
  - حساب عدد المهام حسب النوع
  - حساب إحصائيات الأراضي الوقفية
  
  ### 3. Views للاستعلامات المعقدة
  - عرض المهام مع تفاصيلها الكاملة
  - عرض الأراضي الوقفية بشكل منظم
  
  ### 4. دوال البحث
  - البحث في الأراضي الوقفية
  - البحث في المساجد
  
  ### 5. دوال التقارير
  - تقرير المهام الشهري
  - تقرير الأوقاف حسب المحافظة
  
  ## ملاحظات مهمة
  - جميع الدوال محسّنة للأداء
  - الدوال آمنة ومحمية من SQL injection
  - متوافقة مع البنية الفعلية للجداول
*/

-- =====================================================
-- 1. دالة تحديث updated_at
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- تطبيق الـ trigger على الجداول الرئيسية
DO $$
DECLARE
    t text;
    tables text[] := ARRAY[
        'governorates', 'cities', 'tasks', 'task_types', 'task_statuses',
        'cases', 'documents', 'mosques', 'imams', 'waqf_lands',
        'endowment_names', 'endowers', 'appointments', 'admin_users',
        'news', 'announcements', 'projects', 'services'
    ];
BEGIN
    FOREACH t IN ARRAY tables
    LOOP
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = t AND column_name = 'updated_at'
        ) THEN
            EXECUTE format('
                DROP TRIGGER IF EXISTS update_%I_updated_at ON %I;
                CREATE TRIGGER update_%I_updated_at
                BEFORE UPDATE ON %I
                FOR EACH ROW
                EXECUTE FUNCTION update_updated_at_column();
            ', t, t, t, t);
        END IF;
    END LOOP;
END $$;

-- =====================================================
-- 2. دوال حساب الإحصائيات
-- =====================================================

-- دالة حساب المهام حسب الحالة
CREATE OR REPLACE FUNCTION get_tasks_by_status()
RETURNS TABLE (
    status_name text,
    status_color text,
    task_count bigint
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        ts.name_ar,
        ts.color,
        COUNT(t.id)
    FROM task_statuses ts
    LEFT JOIN tasks t ON t.task_status_id = ts.id
    WHERE ts.is_active = true
    GROUP BY ts.id, ts.name_ar, ts.color, ts.order_index
    ORDER BY ts.order_index;
END;
$$ LANGUAGE plpgsql;

-- دالة حساب المهام حسب النوع
CREATE OR REPLACE FUNCTION get_tasks_by_type()
RETURNS TABLE (
    type_name text,
    type_color text,
    task_count bigint
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        tt.name_ar,
        tt.color,
        COUNT(t.id)
    FROM task_types tt
    LEFT JOIN tasks t ON t.task_type_id = tt.id
    WHERE tt.is_active = true
    GROUP BY tt.id, tt.name_ar, tt.color, tt.order_index
    ORDER BY tt.order_index;
END;
$$ LANGUAGE plpgsql;

-- دالة حساب إحصائيات الأراضي الوقفية
CREATE OR REPLACE FUNCTION get_waqf_statistics()
RETURNS TABLE (
    total_waqf_lands bigint,
    total_area numeric,
    total_value numeric,
    total_monthly_income numeric
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*)::bigint,
        COALESCE(SUM(area), 0),
        COALESCE(SUM(value), 0),
        COALESCE(SUM(monthly_income), 0)
    FROM waqf_lands;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 3. Views للاستعلامات المعقدة
-- =====================================================

-- عرض المهام الكامل
CREATE OR REPLACE VIEW tasks_full_view AS
SELECT 
    t.id,
    t.title,
    t.description,
    t.priority,
    t.due_date,
    t.created_at,
    t.updated_at,
    t.progress_percentage,
    t.completed,
    tt.name_ar as type_name,
    tt.color as type_color,
    tt.icon as type_icon,
    ts.name_ar as status_name,
    ts.color as status_color,
    g.name_ar as governorate_name,
    c.name_ar as city_name
FROM tasks t
LEFT JOIN task_types tt ON tt.id = t.task_type_id
LEFT JOIN task_statuses ts ON ts.id = t.task_status_id
LEFT JOIN governorates g ON g.id = t.governorate_id
LEFT JOIN cities c ON c.id = t.city_id;

-- عرض الأراضي الوقفية الكامل
CREATE OR REPLACE VIEW waqf_lands_full_view AS
SELECT 
    wl.id,
    wl.name,
    wl.description,
    wl.area,
    wl.type,
    wl.status,
    wl.value,
    wl.monthly_income,
    wl.monthly_expenses,
    wl.governorate,
    wl.establishment_date,
    wl.founder,
    wl.management_type,
    wl.maintenance_status,
    wl.last_inspection,
    wl.next_inspection,
    wl.national_registry_id,
    wl.created_at
FROM waqf_lands wl;

-- =====================================================
-- 4. دوال للبحث والتصفية
-- =====================================================

-- دالة البحث في الأراضي الوقفية
CREATE OR REPLACE FUNCTION search_waqf_lands(search_term text)
RETURNS TABLE (
    id integer,
    name text,
    type text,
    governorate text,
    area numeric,
    status text
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        wl.id,
        wl.name,
        wl.type,
        wl.governorate,
        wl.area,
        wl.status
    FROM waqf_lands wl
    WHERE 
        wl.name ILIKE '%' || search_term || '%'
        OR wl.type ILIKE '%' || search_term || '%'
        OR wl.governorate ILIKE '%' || search_term || '%'
        OR wl.national_registry_id ILIKE '%' || search_term || '%'
    ORDER BY wl.created_at DESC
    LIMIT 50;
END;
$$ LANGUAGE plpgsql;

-- دالة البحث في المساجد
CREATE OR REPLACE FUNCTION search_mosques(search_term text)
RETURNS TABLE (
    id uuid,
    name text,
    governorate text,
    address text,
    capacity integer
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        m.id,
        m.name,
        m.governorate,
        m.address,
        m.capacity
    FROM mosques m
    WHERE 
        m.name ILIKE '%' || search_term || '%'
        OR m.governorate ILIKE '%' || search_term || '%'
        OR m.address ILIKE '%' || search_term || '%'
    ORDER BY m.created_at DESC
    LIMIT 50;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 5. دوال التقارير
-- =====================================================

-- دالة تقرير المهام الشهري
CREATE OR REPLACE FUNCTION get_monthly_tasks_report(report_year int, report_month int)
RETURNS TABLE (
    status_name text,
    task_count bigint,
    percentage numeric
) AS $$
DECLARE
    total_tasks bigint;
BEGIN
    SELECT COUNT(*) INTO total_tasks
    FROM tasks
    WHERE EXTRACT(YEAR FROM created_at) = report_year
    AND EXTRACT(MONTH FROM created_at) = report_month;
    
    RETURN QUERY
    SELECT 
        ts.name_ar,
        COUNT(t.id),
        CASE 
            WHEN total_tasks > 0 THEN ROUND((COUNT(t.id)::numeric / total_tasks * 100), 2)
            ELSE 0
        END
    FROM task_statuses ts
    LEFT JOIN tasks t ON t.task_status_id = ts.id 
        AND EXTRACT(YEAR FROM t.created_at) = report_year
        AND EXTRACT(MONTH FROM t.created_at) = report_month
    WHERE ts.is_active = true
    GROUP BY ts.id, ts.name_ar, ts.order_index
    ORDER BY ts.order_index;
END;
$$ LANGUAGE plpgsql;

-- دالة تقرير الأوقاف حسب المحافظة
CREATE OR REPLACE FUNCTION get_waqf_by_governorate_report()
RETURNS TABLE (
    governorate_name text,
    waqf_count bigint,
    total_area numeric,
    total_value numeric
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        wl.governorate,
        COUNT(*),
        COALESCE(SUM(wl.area), 0),
        COALESCE(SUM(wl.value), 0)
    FROM waqf_lands wl
    WHERE wl.governorate IS NOT NULL
    GROUP BY wl.governorate
    ORDER BY wl.governorate;
END;
$$ LANGUAGE plpgsql;

-- دالة تقرير المهام حسب الأولوية
CREATE OR REPLACE FUNCTION get_tasks_by_priority()
RETURNS TABLE (
    priority text,
    task_count bigint,
    completed_count bigint,
    pending_count bigint
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COALESCE(t.priority, 'غير محدد'),
        COUNT(*),
        COUNT(*) FILTER (WHERE t.completed = true),
        COUNT(*) FILTER (WHERE t.completed = false)
    FROM tasks t
    GROUP BY t.priority
    ORDER BY 
        CASE t.priority
            WHEN 'high' THEN 1
            WHEN 'medium' THEN 2
            WHEN 'low' THEN 3
            ELSE 4
        END;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 6. دوال مساعدة إضافية
-- =====================================================

-- دالة الحصول على إحصائيات لوحة التحكم
CREATE OR REPLACE FUNCTION get_dashboard_statistics()
RETURNS TABLE (
    total_tasks bigint,
    completed_tasks bigint,
    pending_tasks bigint,
    total_mosques bigint,
    total_waqf_lands bigint,
    total_waqf_area numeric
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        (SELECT COUNT(*) FROM tasks),
        (SELECT COUNT(*) FROM tasks WHERE completed = true),
        (SELECT COUNT(*) FROM tasks WHERE completed = false),
        (SELECT COUNT(*) FROM mosques),
        (SELECT COUNT(*) FROM waqf_lands),
        (SELECT COALESCE(SUM(area), 0) FROM waqf_lands);
END;
$$ LANGUAGE plpgsql;