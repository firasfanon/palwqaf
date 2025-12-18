/*
  # إصلاح الثغرات الأمنية في Row Level Security
  
  ## المشكلة
  العديد من الجداول تستخدم سياسات ضعيفة مع `USING (true)` و `WITH CHECK (true)`
  مما يسمح بالوصول الكامل بدون قيود حقيقية.
  
  ## الإصلاحات
  
  ### 1. contact_messages
  - إزالة السياسات الضعيفة
  - السماح بالإنشاء للجميع (عام)
  - القراءة/التعديل/الحذف للمسؤولين فقط أو المخصص لهم
  
  ### 2. governorates
  - القراءة عامة (بيانات مرجعية)
  - الإدارة للمسؤولين فقط
  
  ### 3. appointments
  - القراءة محدودة: المواعيد الخاصة أو للمسؤولين
  - الإنشاء والتعديل محدود
  
  ### 4. case_timeline
  - القراءة محدودة: فقط للقضايا التي لديهم صلاحية
  
  ### 5. الجداول العامة (mosques, imams, etc)
  - القراءة عامة (محتوى عام)
  - الإدارة للمسؤولين المصرح لهم فقط
  
  ### 6. service_* tables
  - نفس النهج: قراءة عامة للمفعّل، إدارة للمسؤولين
  
  ## ملاحظات أمنية
  - جميع السياسات الآن تتحقق من الصلاحيات الفعلية
  - لا يوجد `USING (true)` بدون قيود حقيقية
  - الفصل الواضح بين الصلاحيات العامة والخاصة
*/

-- ============================================================================
-- 1. إصلاح contact_messages
-- ============================================================================

DROP POLICY IF EXISTS "رسائل التواصل: الإنشاء للجميع" ON contact_messages;
DROP POLICY IF EXISTS "رسائل التواصل: القراءة للمصرح لهم" ON contact_messages;
DROP POLICY IF EXISTS "رسائل التواصل: التعديل للمصرح لهم" ON contact_messages;
DROP POLICY IF EXISTS "رسائل التواصل: الحذف للمصرح لهم" ON contact_messages;

-- السماح للجميع بإنشاء رسائل تواصل (public form)
CREATE POLICY "Anyone can create contact messages"
  ON contact_messages
  FOR INSERT
  TO public
  WITH CHECK (true);

-- القراءة للمسؤولين فقط أو المخصص لهم
CREATE POLICY "Admins can read all contact messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = auth.uid()::text
      AND users.role IN ('admin', 'super_admin', 'manager')
    )
  );

-- التعديل للمسؤولين فقط أو المخصص لهم
CREATE POLICY "Admins and assigned users can update messages"
  ON contact_messages
  FOR UPDATE
  TO authenticated
  USING (
    assigned_to::text = auth.uid()::text
    OR EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = auth.uid()::text
      AND users.role IN ('admin', 'super_admin', 'manager')
    )
  )
  WITH CHECK (
    assigned_to::text = auth.uid()::text
    OR EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = auth.uid()::text
      AND users.role IN ('admin', 'super_admin', 'manager')
    )
  );

-- الحذف للمسؤولين فقط
CREATE POLICY "Only admins can delete contact messages"
  ON contact_messages
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = auth.uid()::text
      AND users.role IN ('admin', 'super_admin')
    )
  );

-- ============================================================================
-- 2. إصلاح governorates
-- ============================================================================

DROP POLICY IF EXISTS "Authenticated users can manage governorates" ON governorates;

CREATE POLICY "Only admins can manage governorates"
  ON governorates
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

-- ============================================================================
-- 3. إصلاح appointments
-- ============================================================================

DROP POLICY IF EXISTS "Users can read appointments" ON appointments;

CREATE POLICY "Users can read their related appointments"
  ON appointments
  FOR SELECT
  TO authenticated
  USING (
    created_by::text = auth.uid()::text
    OR EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = auth.uid()::text
      AND users.role IN ('admin', 'super_admin', 'manager')
    )
    OR (
      attendees IS NOT NULL 
      AND attendees::jsonb ? auth.uid()::text
    )
  );

-- ============================================================================
-- 4. إصلاح case_timeline
-- ============================================================================

DROP POLICY IF EXISTS "Users can read case timeline" ON case_timeline;

CREATE POLICY "Users can read timeline for accessible cases"
  ON case_timeline
  FOR SELECT
  TO authenticated
  USING (
    user_id::text = auth.uid()::text
    OR EXISTS (
      SELECT 1 FROM cases
      WHERE cases.id = case_timeline.case_id
      AND (
        cases.created_by::text = auth.uid()::text
        OR cases.assigned_to::text = auth.uid()::text
        OR EXISTS (
          SELECT 1 FROM users
          WHERE users.id::text = auth.uid()::text
          AND users.role IN ('admin', 'super_admin', 'manager')
        )
      )
    )
  );

-- ============================================================================
-- 5. إصلاح الجداول العامة (mosques, imams, etc)
-- ============================================================================

-- mosques
DROP POLICY IF EXISTS "المساجد: الإدارة للمصرح لهم" ON mosques;
CREATE POLICY "Only admins can manage mosques"
  ON mosques
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = auth.uid()::text
      AND users.role IN ('admin', 'super_admin', 'manager')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = auth.uid()::text
      AND users.role IN ('admin', 'super_admin', 'manager')
    )
  );

-- imams
DROP POLICY IF EXISTS "الأئمة: الإدارة للمصرح لهم" ON imams;
CREATE POLICY "Only admins can manage imams"
  ON imams
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = auth.uid()::text
      AND users.role IN ('admin', 'super_admin', 'manager')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = auth.uid()::text
      AND users.role IN ('admin', 'super_admin', 'manager')
    )
  );

-- former_ministers
DROP POLICY IF EXISTS "الوزراء السابقون: الإدارة للمصرح ل" ON former_ministers;
CREATE POLICY "Only admins can manage former ministers"
  ON former_ministers
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

-- friday_sermons
DROP POLICY IF EXISTS "خطب الجمعة: الإدارة للمصرح لهم" ON friday_sermons;
CREATE POLICY "Only admins can manage friday sermons"
  ON friday_sermons
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = auth.uid()::text
      AND users.role IN ('admin', 'super_admin', 'manager')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = auth.uid()::text
      AND users.role IN ('admin', 'super_admin', 'manager')
    )
  );

-- media_gallery
DROP POLICY IF EXISTS "المعرض الإعلامي: الإدارة للمصرح له" ON media_gallery;
CREATE POLICY "Only admins can manage media gallery"
  ON media_gallery
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = auth.uid()::text
      AND users.role IN ('admin', 'super_admin', 'manager')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = auth.uid()::text
      AND users.role IN ('admin', 'super_admin', 'manager')
    )
  );

-- organizational_structure
DROP POLICY IF EXISTS "الهيكل التنظيمي: الإدارة للمصرح له" ON organizational_structure;
CREATE POLICY "Only admins can manage organizational structure"
  ON organizational_structure
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

-- projects
DROP POLICY IF EXISTS "المشاريع: الإدارة للمصرح لهم" ON projects;
CREATE POLICY "Only admins can manage projects"
  ON projects
  FOR ALL
  TO authenticated
  USING (
    manager_id::text = auth.uid()::text
    OR EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = auth.uid()::text
      AND users.role IN ('admin', 'super_admin', 'manager')
    )
  )
  WITH CHECK (
    manager_id::text = auth.uid()::text
    OR EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = auth.uid()::text
      AND users.role IN ('admin', 'super_admin', 'manager')
    )
  );

-- social_services
DROP POLICY IF EXISTS "الخدمات الاجتماعية: الإدارة للمصر" ON social_services;
CREATE POLICY "Only admins can manage social services"
  ON social_services
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = auth.uid()::text
      AND users.role IN ('admin', 'super_admin', 'manager')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = auth.uid()::text
      AND users.role IN ('admin', 'super_admin', 'manager')
    )
  );

-- ============================================================================
-- 6. إصلاح service_* tables
-- ============================================================================

-- Remove duplicate/weak policies for service_categories
DROP POLICY IF EXISTS "Authenticated users can manage categories" ON service_categories;
DROP POLICY IF EXISTS "Service categories admin all" ON service_categories;
DROP POLICY IF EXISTS "المسؤولون يمكنهم إدارة الفئات" ON service_categories;

CREATE POLICY "Only admins can manage service categories"
  ON service_categories
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = auth.uid()::text
      AND users.role IN ('admin', 'super_admin', 'manager')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = auth.uid()::text
      AND users.role IN ('admin', 'super_admin', 'manager')
    )
  );

-- service_details
DROP POLICY IF EXISTS "Service details admin all" ON service_details;
CREATE POLICY "Only admins can manage service details"
  ON service_details
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = auth.uid()::text
      AND users.role IN ('admin', 'super_admin', 'manager')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = auth.uid()::text
      AND users.role IN ('admin', 'super_admin', 'manager')
    )
  );

-- service_settings
DROP POLICY IF EXISTS "Authenticated users can manage service settings" ON service_settings;
DROP POLICY IF EXISTS "المسؤولون يمكنهم إدارة الإعدادات" ON service_settings;

CREATE POLICY "Only admins can manage service settings"
  ON service_settings
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

-- services
DROP POLICY IF EXISTS "Authenticated users can manage services" ON services;
DROP POLICY IF EXISTS "Services admin all" ON services;
DROP POLICY IF EXISTS "المسؤولون يمكنهم إدارة الخدمات" ON services;

CREATE POLICY "Only admins can manage services"
  ON services
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = auth.uid()::text
      AND users.role IN ('admin', 'super_admin', 'manager')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = auth.uid()::text
      AND users.role IN ('admin', 'super_admin', 'manager')
    )
  );
