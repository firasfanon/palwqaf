/*
  # إضافة جداول إدارة المهام

  ## الجداول الجديدة
  
  ### 1. نظام إدارة المهام الشامل
    - `task_types` - أنواع المهام (زيارات ميدانية، جلسات محاكم، إلخ)
    - `task_statuses` - حالات المهام (جديدة، قيد التنفيذ، مكتملة، إلخ)
    - `tasks` - المهام الرئيسية
    - `task_status_history` - سجل تغييرات حالات المهام
    - `task_statistics` - إحصائيات المهام

  ## المميزات
    - إدارة أنواع المهام المختلفة
    - تتبع حالات المهام
    - ربط المهام بالقضايا والأراضي الوقفية
    - تتبع المواقع الجغرافية للمهام
    - إدارة المهام الفرعية
    - إحصائيات شاملة للمهام

  ## الأمان
    - تفعيل RLS على جميع الجداول
    - سياسات أمان مناسبة لكل جدول
    - المستخدمون يمكنهم رؤية وإدارة مهامهم فقط
    - المدراء يمكنهم رؤية جميع المهام
*/

-- =====================================================
-- 1. جداول إدارة المهام
-- =====================================================

-- جدول أنواع المهام
CREATE TABLE IF NOT EXISTS task_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar NOT NULL,
  description text,
  color varchar,
  icon varchar,
  category varchar,
  is_active boolean DEFAULT true,
  requires_location boolean DEFAULT true,
  order_index integer DEFAULT 0,
  requires_approval boolean DEFAULT false,
  default_duration_minutes integer DEFAULT 60,
  template_description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  name_ar text NOT NULL,
  description_ar text,
  category_ar varchar
);

ALTER TABLE task_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Task types are viewable by authenticated users"
  ON task_types FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage task types"
  ON task_types FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- جدول حالات المهام
CREATE TABLE IF NOT EXISTS task_statuses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ar varchar NOT NULL,
  name_en varchar,
  order_index integer DEFAULT 0,
  color varchar,
  created_at timestamptz DEFAULT now(),
  is_final boolean DEFAULT false,
  allows_editing boolean DEFAULT true,
  next_statuses uuid[],
  is_active boolean DEFAULT true,
  icon varchar,
  description_ar text,
  description_en text,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE task_statuses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Task statuses are viewable by authenticated users"
  ON task_statuses FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage task statuses"
  ON task_statuses FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- جدول المهام الرئيسية
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  title varchar NOT NULL,
  description text,
  task_type varchar CHECK (task_type IN ('daily', 'weekly', 'monthly')),
  priority varchar CHECK (priority IN ('urgent', 'high', 'medium', 'low')),
  due_date date,
  due_time time,
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  subtasks jsonb DEFAULT '[]',
  tags text[] DEFAULT '{}',
  recurrence_pattern varchar,
  task_type_id uuid REFERENCES task_types(id),
  governorate_id uuid REFERENCES governorates(id),
  city_id uuid REFERENCES cities(id),
  location_details text,
  task_date date,
  task_description text,
  notes text,
  required_actions text,
  task_status varchar CHECK (task_status IN ('new', 'in_progress', 'under_action', 'completed')),
  status_date timestamptz,
  parent_task_id uuid REFERENCES tasks(id),
  case_id integer REFERENCES cases(id),
  waqf_land_id integer REFERENCES waqf_lands(id),
  case_reference_number varchar,
  waqf_land_registry_id varchar,
  related_entity_type varchar CHECK (related_entity_type IN ('case', 'waqf_land', 'both', 'none')),
  court_name varchar,
  judge_name varchar,
  court_hearing_date date,
  court_hearing_time time,
  site_inspection_type varchar CHECK (site_inspection_type IN ('initial', 'followup', 'routine', 'emergency')),
  boundary_verification_status varchar,
  encroachment_details text,
  task_status_id uuid REFERENCES task_statuses(id),
  court_name_ar varchar,
  judge_name_ar varchar,
  visit_purpose text,
  visit_purpose_ar text,
  encroachment_details_ar text,
  preservation_status varchar,
  duration_minutes integer DEFAULT 60,
  requires_approval boolean DEFAULT false,
  progress_percentage integer DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  assigned_to uuid[],
  estimated_hours numeric,
  actual_hours numeric,
  followup_required boolean DEFAULT false,
  followup_deadline date
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own tasks"
  ON tasks FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR auth.uid() = ANY(assigned_to));

CREATE POLICY "Users can create their own tasks"
  ON tasks FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tasks"
  ON tasks FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id OR auth.uid() = ANY(assigned_to))
  WITH CHECK (auth.uid() = user_id OR auth.uid() = ANY(assigned_to));

CREATE POLICY "Users can delete their own tasks"
  ON tasks FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all tasks"
  ON tasks FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'manager')
    )
  );

CREATE POLICY "Admins can manage all tasks"
  ON tasks FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid() AND role IN ('super_admin', 'admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid() AND role IN ('super_admin', 'admin')
    )
  );

-- جدول سجل تغييرات حالات المهام
CREATE TABLE IF NOT EXISTS task_status_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid NOT NULL REFERENCES tasks(id),
  old_status varchar,
  new_status varchar NOT NULL,
  changed_by uuid REFERENCES auth.users(id),
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE task_status_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view status history for their tasks"
  ON task_status_history FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM tasks
      WHERE tasks.id = task_status_history.task_id
      AND (tasks.user_id = auth.uid() OR auth.uid() = ANY(tasks.assigned_to))
    )
  );

CREATE POLICY "System can create status history"
  ON task_status_history FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view all status history"
  ON task_status_history FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'manager')
    )
  );

-- جدول إحصائيات المهام
CREATE TABLE IF NOT EXISTS task_statistics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES admin_users(id),
  governorate_id uuid REFERENCES governorates(id),
  period_type varchar CHECK (period_type IN ('daily', 'weekly', 'monthly', 'yearly')),
  period_date date NOT NULL,
  total_tasks integer DEFAULT 0,
  completed_tasks integer DEFAULT 0,
  in_progress_tasks integer DEFAULT 0,
  overdue_tasks integer DEFAULT 0,
  avg_completion_time_hours numeric,
  routine_tasks integer DEFAULT 0,
  construction_tasks integer DEFAULT 0,
  violation_tasks integer DEFAULT 0,
  urgent_tasks integer DEFAULT 0,
  high_priority_tasks integer DEFAULT 0,
  medium_priority_tasks integer DEFAULT 0,
  low_priority_tasks integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE task_statistics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own task statistics"
  ON task_statistics FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all task statistics"
  ON task_statistics FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'manager')
    )
  );

CREATE POLICY "System can manage task statistics"
  ON task_statistics FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- إنشاء الفهارس لتحسين الأداء
-- =====================================================

-- فهارس جدول المهام
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_task_type_id ON tasks(task_type_id);
CREATE INDEX IF NOT EXISTS idx_tasks_task_status_id ON tasks(task_status_id);
CREATE INDEX IF NOT EXISTS idx_tasks_governorate_id ON tasks(governorate_id);
CREATE INDEX IF NOT EXISTS idx_tasks_city_id ON tasks(city_id);
CREATE INDEX IF NOT EXISTS idx_tasks_case_id ON tasks(case_id);
CREATE INDEX IF NOT EXISTS idx_tasks_waqf_land_id ON tasks(waqf_land_id);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_tasks_task_date ON tasks(task_date);
CREATE INDEX IF NOT EXISTS idx_tasks_completed ON tasks(completed);
CREATE INDEX IF NOT EXISTS idx_tasks_parent_task_id ON tasks(parent_task_id);

-- فهارس جدول سجل الحالات
CREATE INDEX IF NOT EXISTS idx_task_status_history_task_id ON task_status_history(task_id);
CREATE INDEX IF NOT EXISTS idx_task_status_history_changed_by ON task_status_history(changed_by);
CREATE INDEX IF NOT EXISTS idx_task_status_history_created_at ON task_status_history(created_at);

-- فهارس جدول الإحصائيات
CREATE INDEX IF NOT EXISTS idx_task_statistics_user_id ON task_statistics(user_id);
CREATE INDEX IF NOT EXISTS idx_task_statistics_governorate_id ON task_statistics(governorate_id);
CREATE INDEX IF NOT EXISTS idx_task_statistics_period_date ON task_statistics(period_date);
CREATE INDEX IF NOT EXISTS idx_task_statistics_period_type ON task_statistics(period_type);
