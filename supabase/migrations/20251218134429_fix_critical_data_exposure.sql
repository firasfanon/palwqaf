/*
  # إصلاح تسريب البيانات الحساسة
  
  ## المشكلة الحرجة
  
  بعض الجداول الحساسة لها سياسات قراءة مفتوحة بالكامل:
  
  ### 1. cases (القضايا)
  - حالياً: أي مستخدم مسجل يمكنه قراءة جميع القضايا
  - المطلوب: فقط المسؤولين والمخصص لهم والمنشئ
  
  ### 2. waqf_lands (أراضي الوقف)
  - حالياً: أي مستخدم مسجل يمكنه قراءة جميع الأراضي
  - المطلوب: حماية بناءً على المحافظة والصلاحيات
  
  ## البيانات العامة (مقبولة)
  
  التالي يمكن أن يظل عاماً:
  - activities, governorates, imams, mosques
  - former_ministers, friday_sermons, media_gallery
  - organizational_structure, projects
  - service_details, service_settings
  
  هذه معلومات عامة يجب أن تكون متاحة للموقع العام.
*/

-- ============================================================================
-- إصلاح cases (حرج جداً!)
-- ============================================================================

DROP POLICY IF EXISTS "Users can read cases" ON cases;

-- فقط المسؤولين أو المعنيين بالقضية
CREATE POLICY "Users can read authorized cases only"
  ON cases
  FOR SELECT
  TO authenticated
  USING (
    created_by::text = auth.uid()::text
    OR assigned_to::text = auth.uid()::text
    OR EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = auth.uid()::text
      AND users.role IN ('admin', 'super_admin', 'manager')
    )
  );

-- ============================================================================
-- إصلاح waqf_lands (حرج جداً!)
-- ============================================================================

DROP POLICY IF EXISTS "Users can read waqf lands" ON waqf_lands;

-- حماية بناءً على المحافظة والصلاحيات
CREATE POLICY "Users can read authorized waqf lands"
  ON waqf_lands
  FOR SELECT
  TO authenticated
  USING (
    manager_id::text = auth.uid()::text
    OR EXISTS (
      SELECT 1 FROM users u
      LEFT JOIN user_permissions up ON u.id = up.user_id
      WHERE u.id::text = auth.uid()::text
      AND (
        -- مسؤول كامل
        u.role IN ('admin', 'super_admin')
        -- أو مدير مع صلاحية على waqf_lands
        OR (
          u.role IN ('manager', 'employee')
          AND (
            up.module = 'waqf_lands'
            AND (
              NOT COALESCE(up.governorate_restricted, false)
              OR waqf_lands.governorate = ANY(COALESCE(up.allowed_governorates, ARRAY[]::text[]))
            )
          )
        )
      )
    )
  );

-- ============================================================================
-- تحسينات أمنية إضافية
-- ============================================================================

-- التأكد من أن المواعيد محمية بشكل صحيح
DROP POLICY IF EXISTS "Users can create appointments" ON appointments;

CREATE POLICY "Authorized users can create appointments"
  ON appointments
  FOR INSERT
  TO authenticated
  WITH CHECK (
    created_by::text = auth.uid()::text
    AND EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = auth.uid()::text
      AND users.role IN ('admin', 'super_admin', 'manager', 'employee')
      AND users.is_active = true
    )
  );

-- التأكد من أن التحديثات محمية
DROP POLICY IF EXISTS "Users can update their appointments" ON appointments;

CREATE POLICY "Users can update authorized appointments"
  ON appointments
  FOR UPDATE
  TO authenticated
  USING (
    created_by::text = auth.uid()::text
    OR EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = auth.uid()::text
      AND users.role IN ('admin', 'super_admin', 'manager')
    )
  )
  WITH CHECK (
    created_by::text = auth.uid()::text
    OR EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = auth.uid()::text
      AND users.role IN ('admin', 'super_admin', 'manager')
    )
  );

-- حماية إضافة مواعيد الحذف
CREATE POLICY "Only admins can delete appointments"
  ON appointments
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = auth.uid()::text
      AND users.role IN ('admin', 'super_admin')
    )
  );
