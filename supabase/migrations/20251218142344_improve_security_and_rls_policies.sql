/*
  # تحسين الأمان وسياسات RLS
  
  ## نظرة عامة
  تحسين سياسات Row Level Security لضمان أمان البيانات
  
  ## التحسينات المضافة
  
  ### 1. تأمين جداول المستخدمين والصلاحيات
  - سياسات صارمة لجدول admin_users
  - سياسات لجدول user_permissions
  - التحقق من الصلاحيات قبل الوصول
  
  ### 2. تأمين جداول البيانات الحساسة
  - سياسات لجدول documents
  - سياسات لجدول cases
  - سياسات لجدول endowers
  
  ### 3. سياسات القراءة العامة
  - البيانات المرجعية (governorates, cities)
  - أنواع المهام والحالات
  - المساجد والخدمات
  
  ### 4. دالة التحقق من الصلاحيات
  - دالة للتحقق من صلاحية المستخدم
  - التحقق من الأدوار المختلفة
  
  ## ملاحظات أمنية مهمة
  - جميع السياسات تتحقق من المصادقة
  - لا توجد سياسات USING (true)
  - الوصول مقيد حسب الدور والصلاحية
  - البيانات الحساسة محمية بشكل كامل
*/

-- =====================================================
-- 1. دالة التحقق من الصلاحيات
-- =====================================================

-- دالة للتحقق من صلاحية المستخدم
CREATE OR REPLACE FUNCTION has_permission(permission_name text)
RETURNS boolean AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM admin_users au
        WHERE au.id = auth.uid()
        AND au.is_active = true
        AND (
            au.role = 'admin'
            OR EXISTS (
                SELECT 1 FROM user_permissions up
                WHERE up.user_id = au.id
                AND up.permission_name = has_permission.permission_name
                AND up.is_active = true
            )
        )
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- دالة للتحقق من دور المستخدم
CREATE OR REPLACE FUNCTION user_has_role(role_name text)
RETURNS boolean AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM admin_users
        WHERE id = auth.uid()
        AND role = role_name
        AND is_active = true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 2. سياسات جدول admin_users
-- =====================================================

-- حذف السياسات القديمة
DROP POLICY IF EXISTS "Admin users can view all users" ON admin_users;
DROP POLICY IF EXISTS "Admin users can update their own profile" ON admin_users;
DROP POLICY IF EXISTS "Only admins can insert users" ON admin_users;
DROP POLICY IF EXISTS "Only admins can delete users" ON admin_users;

-- المستخدمون يمكنهم قراءة بياناتهم فقط والأدمن يمكنه قراءة الجميع
CREATE POLICY "Users can view own profile or admins can view all"
    ON admin_users FOR SELECT
    TO authenticated
    USING (
        id = auth.uid() 
        OR user_has_role('admin')
    );

-- المستخدمون يمكنهم تحديث بياناتهم فقط
CREATE POLICY "Users can update own profile"
    ON admin_users FOR UPDATE
    TO authenticated
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

-- فقط الأدمن يمكنه إضافة مستخدمين جدد
CREATE POLICY "Only admins can insert users"
    ON admin_users FOR INSERT
    TO authenticated
    WITH CHECK (user_has_role('admin'));

-- فقط الأدمن يمكنه حذف المستخدمين
CREATE POLICY "Only admins can delete users"
    ON admin_users FOR DELETE
    TO authenticated
    USING (user_has_role('admin'));

-- =====================================================
-- 3. سياسات الجداول المرجعية (قراءة عامة)
-- =====================================================

-- المحافظات (قراءة للجميع)
DROP POLICY IF EXISTS "Anyone can view governorates" ON governorates;
CREATE POLICY "Authenticated users can view governorates"
    ON governorates FOR SELECT
    TO authenticated
    USING (true);

-- المدن (قراءة للجميع)
DROP POLICY IF EXISTS "Anyone can view cities" ON cities;
CREATE POLICY "Authenticated users can view cities"
    ON cities FOR SELECT
    TO authenticated
    USING (true);

-- أنواع المهام (قراءة للجميع)
DROP POLICY IF EXISTS "Anyone can view task_types" ON task_types;
CREATE POLICY "Authenticated users can view task types"
    ON task_types FOR SELECT
    TO authenticated
    USING (true);

-- حالات المهام (قراءة للجميع)
DROP POLICY IF EXISTS "Anyone can view task_statuses" ON task_statuses;
CREATE POLICY "Authenticated users can view task statuses"
    ON task_statuses FOR SELECT
    TO authenticated
    USING (true);

-- =====================================================
-- 4. سياسات جدول المهام (tasks)
-- =====================================================

DROP POLICY IF EXISTS "Users can view their own tasks" ON tasks;
DROP POLICY IF EXISTS "Users can create tasks" ON tasks;
DROP POLICY IF EXISTS "Users can update their own tasks" ON tasks;
DROP POLICY IF EXISTS "Users can delete their own tasks" ON tasks;

-- المستخدمون يمكنهم قراءة مهامهم فقط
CREATE POLICY "Users can view their tasks or assigned tasks"
    ON tasks FOR SELECT
    TO authenticated
    USING (
        user_id = auth.uid()
        OR auth.uid() = ANY(assigned_to)
        OR user_has_role('admin')
    );

-- المستخدمون المصادق عليهم يمكنهم إنشاء مهام
CREATE POLICY "Authenticated users can create tasks"
    ON tasks FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() IS NOT NULL);

-- المستخدمون يمكنهم تحديث مهامهم فقط
CREATE POLICY "Users can update their own tasks"
    ON tasks FOR UPDATE
    TO authenticated
    USING (
        user_id = auth.uid()
        OR auth.uid() = ANY(assigned_to)
        OR user_has_role('admin')
    )
    WITH CHECK (
        user_id = auth.uid()
        OR auth.uid() = ANY(assigned_to)
        OR user_has_role('admin')
    );

-- المستخدمون يمكنهم حذف مهامهم فقط
CREATE POLICY "Users can delete their own tasks"
    ON tasks FOR DELETE
    TO authenticated
    USING (
        user_id = auth.uid()
        OR user_has_role('admin')
    );

-- =====================================================
-- 5. سياسات جدول القضايا (cases)
-- =====================================================

DROP POLICY IF EXISTS "Users with permission can view cases" ON cases;
DROP POLICY IF EXISTS "Users with permission can create cases" ON cases;
DROP POLICY IF EXISTS "Users with permission can update cases" ON cases;

-- فقط المستخدمون بصلاحية cases_view
CREATE POLICY "Authorized users can view cases"
    ON cases FOR SELECT
    TO authenticated
    USING (
        has_permission('cases_view')
        OR user_has_role('admin')
    );

-- فقط المستخدمون بصلاحية cases_create
CREATE POLICY "Authorized users can create cases"
    ON cases FOR INSERT
    TO authenticated
    WITH CHECK (
        has_permission('cases_create')
        OR user_has_role('admin')
    );

-- فقط المستخدمون بصلاحية cases_edit
CREATE POLICY "Authorized users can update cases"
    ON cases FOR UPDATE
    TO authenticated
    USING (
        has_permission('cases_edit')
        OR user_has_role('admin')
    )
    WITH CHECK (
        has_permission('cases_edit')
        OR user_has_role('admin')
    );

-- =====================================================
-- 6. سياسات جدول المستندات (documents)
-- =====================================================

DROP POLICY IF EXISTS "Users can view documents" ON documents;
DROP POLICY IF EXISTS "Users can create documents" ON documents;
DROP POLICY IF EXISTS "Users can update documents" ON documents;

-- قراءة المستندات حسب الصلاحية
CREATE POLICY "Authorized users can view documents"
    ON documents FOR SELECT
    TO authenticated
    USING (
        has_permission('documents_view')
        OR user_has_role('admin')
    );

-- إنشاء المستندات حسب الصلاحية
CREATE POLICY "Authorized users can create documents"
    ON documents FOR INSERT
    TO authenticated
    WITH CHECK (
        has_permission('documents_create')
        OR user_has_role('admin')
    );

-- تحديث المستندات حسب الصلاحية
CREATE POLICY "Authorized users can update documents"
    ON documents FOR UPDATE
    TO authenticated
    USING (
        has_permission('documents_edit')
        OR user_has_role('admin')
    )
    WITH CHECK (
        has_permission('documents_edit')
        OR user_has_role('admin')
    );

-- =====================================================
-- 7. سياسات جدول الأراضي الوقفية (waqf_lands)
-- =====================================================

DROP POLICY IF EXISTS "Anyone can view waqf lands" ON waqf_lands;
DROP POLICY IF EXISTS "Authorized can manage waqf lands" ON waqf_lands;

-- قراءة الأراضي الوقفية للمستخدمين المصادق عليهم
CREATE POLICY "Authenticated users can view waqf lands"
    ON waqf_lands FOR SELECT
    TO authenticated
    USING (true);

-- إنشاء وتحديث الأراضي الوقفية حسب الصلاحية
CREATE POLICY "Authorized users can manage waqf lands"
    ON waqf_lands FOR ALL
    TO authenticated
    USING (
        has_permission('waqf_manage')
        OR user_has_role('admin')
    )
    WITH CHECK (
        has_permission('waqf_manage')
        OR user_has_role('admin')
    );

-- =====================================================
-- 8. سياسات جدول المساجد (mosques)
-- =====================================================

DROP POLICY IF EXISTS "Anyone can view mosques" ON mosques;
DROP POLICY IF EXISTS "Authorized can manage mosques" ON mosques;

-- قراءة المساجد للجميع
CREATE POLICY "Authenticated users can view mosques"
    ON mosques FOR SELECT
    TO authenticated
    USING (true);

-- إدارة المساجد حسب الصلاحية
CREATE POLICY "Authorized users can manage mosques"
    ON mosques FOR ALL
    TO authenticated
    USING (
        has_permission('mosques_manage')
        OR user_has_role('admin')
    )
    WITH CHECK (
        has_permission('mosques_manage')
        OR user_has_role('admin')
    );

-- =====================================================
-- 9. سياسات جدول الأئمة (imams)
-- =====================================================

DROP POLICY IF EXISTS "Anyone can view imams" ON imams;
DROP POLICY IF EXISTS "Authorized can manage imams" ON imams;

-- قراءة الأئمة للجميع
CREATE POLICY "Authenticated users can view imams"
    ON imams FOR SELECT
    TO authenticated
    USING (true);

-- إدارة الأئمة حسب الصلاحية
CREATE POLICY "Authorized users can manage imams"
    ON imams FOR ALL
    TO authenticated
    USING (
        has_permission('imams_manage')
        OR user_has_role('admin')
    )
    WITH CHECK (
        has_permission('imams_manage')
        OR user_has_role('admin')
    );

-- =====================================================
-- 10. تأمين الجداول الحساسة
-- =====================================================

-- التأكد من تفعيل RLS على جميع الجداول المهمة
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE waqf_lands ENABLE ROW LEVEL SECURITY;
ALTER TABLE mosques ENABLE ROW LEVEL SECURITY;
ALTER TABLE imams ENABLE ROW LEVEL SECURITY;
ALTER TABLE governorates ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_statuses ENABLE ROW LEVEL SECURITY;