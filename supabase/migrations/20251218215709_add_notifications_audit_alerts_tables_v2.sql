/*
  # إضافة جداول الإشعارات والتنبيهات وسجل النشاطات

  ## الجداول الجديدة
  
  ### 1. جداول الإشعارات
    - `user_notifications` - إشعارات المستخدمين
    - `notification_settings` - إعدادات الإشعارات
    
  ### 2. جداول سجل النشاطات
    - `audit_logs` - سجل النشاطات
    - `system_logs` - سجلات النظام

  ### 3. جداول إضافية
    - `system_alerts` - التنبيهات
    - `user_tasks` - المهام
    - `entity_comments` - التعليقات

  ## الأمان
    - تفعيل RLS على جميع الجداول
*/

-- =====================================================
-- 1. جداول الإشعارات
-- =====================================================

-- جدول الإشعارات
CREATE TABLE IF NOT EXISTS user_notifications (
  id serial PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title_ar text NOT NULL,
  title_en text,
  message_ar text NOT NULL,
  message_en text,
  notification_type text NOT NULL CHECK (notification_type IN ('info', 'warning', 'error', 'success', 'reminder', 'alert')),
  category text CHECK (category IN ('system', 'inspection', 'maintenance', 'contract', 'financial', 'document', 'task', 'other')),
  priority text DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  related_entity_type text,
  related_entity_id integer,
  action_url text,
  action_label text,
  is_read boolean DEFAULT false,
  read_at timestamptz,
  is_archived boolean DEFAULT false,
  archived_at timestamptz,
  expires_at timestamptz,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own notifications"
  ON user_notifications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notifications"
  ON user_notifications FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "System can create notifications"
  ON user_notifications FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- جدول إعدادات الإشعارات
CREATE TABLE IF NOT EXISTS notification_settings (
  id serial PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  notification_type text NOT NULL,
  channel text NOT NULL CHECK (channel IN ('in_app', 'email', 'sms', 'push')),
  is_enabled boolean DEFAULT true,
  preferences jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, notification_type, channel)
);

ALTER TABLE notification_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their notification settings"
  ON notification_settings FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- =====================================================
-- 2. جداول سجل النشاطات
-- =====================================================

-- جدول سجل النشاطات
CREATE TABLE IF NOT EXISTS audit_logs (
  id bigserial PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id),
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id text,
  entity_name text,
  old_values jsonb,
  new_values jsonb,
  changes jsonb,
  ip_address inet,
  user_agent text,
  session_id text,
  status text DEFAULT 'success' CHECK (status IN ('success', 'failure', 'pending')),
  error_message text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view audit logs"
  ON audit_logs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "System can create audit logs"
  ON audit_logs FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- جدول سجلات النظام
CREATE TABLE IF NOT EXISTS system_logs (
  id bigserial PRIMARY KEY,
  log_level text NOT NULL CHECK (log_level IN ('debug', 'info', 'warning', 'error', 'critical')),
  category text NOT NULL,
  message text NOT NULL,
  details jsonb DEFAULT '{}',
  source text,
  user_id uuid REFERENCES auth.users(id),
  ip_address inet,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE system_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view system logs"
  ON system_logs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "System can create system logs"
  ON system_logs FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- =====================================================
-- 3. جداول إضافية
-- =====================================================

-- جدول التنبيهات
CREATE TABLE IF NOT EXISTS system_alerts (
  id serial PRIMARY KEY,
  alert_type text NOT NULL CHECK (alert_type IN ('inspection_due', 'contract_expiry', 'payment_due', 'maintenance_required', 'document_expiry', 'custom')),
  title_ar text NOT NULL,
  title_en text,
  description text,
  severity text DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  related_entity_type text,
  related_entity_id integer,
  trigger_date date NOT NULL,
  due_date date,
  is_active boolean DEFAULT true,
  is_resolved boolean DEFAULT false,
  resolved_at timestamptz,
  resolved_by uuid REFERENCES auth.users(id),
  resolution_notes text,
  assigned_to uuid REFERENCES auth.users(id),
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE system_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view alerts"
  ON system_alerts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage alerts"
  ON system_alerts FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- جدول المهام
CREATE TABLE IF NOT EXISTS user_tasks (
  id serial PRIMARY KEY,
  title_ar text NOT NULL,
  title_en text,
  description text,
  task_type text CHECK (task_type IN ('inspection', 'maintenance', 'document', 'financial', 'administrative', 'other')),
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled', 'on_hold')),
  related_entity_type text,
  related_entity_id integer,
  assigned_to uuid REFERENCES auth.users(id),
  assigned_by uuid REFERENCES auth.users(id),
  due_date date,
  start_date date,
  completion_date date,
  estimated_hours numeric(6, 2),
  actual_hours numeric(6, 2),
  completion_percentage integer DEFAULT 0 CHECK (completion_percentage BETWEEN 0 AND 100),
  notes text,
  attachments jsonb DEFAULT '[]',
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

ALTER TABLE user_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view assigned tasks"
  ON user_tasks FOR SELECT
  TO authenticated
  USING (assigned_to = auth.uid() OR assigned_by = auth.uid() OR created_by = auth.uid());

CREATE POLICY "Users can manage their tasks"
  ON user_tasks FOR ALL
  TO authenticated
  USING (assigned_to = auth.uid() OR created_by = auth.uid())
  WITH CHECK (assigned_to = auth.uid() OR created_by = auth.uid());

-- جدول التعليقات
CREATE TABLE IF NOT EXISTS entity_comments (
  id serial PRIMARY KEY,
  entity_type text NOT NULL,
  entity_id integer NOT NULL,
  parent_comment_id integer REFERENCES entity_comments(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id),
  content text NOT NULL,
  is_edited boolean DEFAULT false,
  edited_at timestamptz,
  is_deleted boolean DEFAULT false,
  deleted_at timestamptz,
  attachments jsonb DEFAULT '[]',
  mentions jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE entity_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view comments"
  ON entity_comments FOR SELECT
  TO authenticated
  USING (NOT is_deleted);

CREATE POLICY "Users can manage their comments"
  ON entity_comments FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- =====================================================
-- 4. الفهارس
-- =====================================================

-- فهارس user_notifications
CREATE INDEX IF NOT EXISTS idx_user_notifications_user ON user_notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_user_notifications_read ON user_notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_user_notifications_type ON user_notifications(notification_type);
CREATE INDEX IF NOT EXISTS idx_user_notifications_priority ON user_notifications(priority);
CREATE INDEX IF NOT EXISTS idx_user_notifications_created ON user_notifications(created_at DESC);

-- فهارس audit_logs
CREATE INDEX IF NOT EXISTS idx_audit_user ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_logs(created_at DESC);

-- فهارس system_logs
CREATE INDEX IF NOT EXISTS idx_system_logs_level ON system_logs(log_level);
CREATE INDEX IF NOT EXISTS idx_system_logs_category ON system_logs(category);
CREATE INDEX IF NOT EXISTS idx_system_logs_created ON system_logs(created_at DESC);

-- فهارس system_alerts
CREATE INDEX IF NOT EXISTS idx_system_alerts_type ON system_alerts(alert_type);
CREATE INDEX IF NOT EXISTS idx_system_alerts_severity ON system_alerts(severity);
CREATE INDEX IF NOT EXISTS idx_system_alerts_active ON system_alerts(is_active);
CREATE INDEX IF NOT EXISTS idx_system_alerts_resolved ON system_alerts(is_resolved);
CREATE INDEX IF NOT EXISTS idx_system_alerts_due_date ON system_alerts(due_date);
CREATE INDEX IF NOT EXISTS idx_system_alerts_assigned ON system_alerts(assigned_to);

-- فهارس user_tasks
CREATE INDEX IF NOT EXISTS idx_user_tasks_assigned ON user_tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_user_tasks_status ON user_tasks(status);
CREATE INDEX IF NOT EXISTS idx_user_tasks_priority ON user_tasks(priority);
CREATE INDEX IF NOT EXISTS idx_user_tasks_due_date ON user_tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_user_tasks_type ON user_tasks(task_type);

-- فهارس entity_comments
CREATE INDEX IF NOT EXISTS idx_entity_comments_entity ON entity_comments(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_entity_comments_user ON entity_comments(user_id);
CREATE INDEX IF NOT EXISTS idx_entity_comments_parent ON entity_comments(parent_comment_id);
CREATE INDEX IF NOT EXISTS idx_entity_comments_created ON entity_comments(created_at DESC);
