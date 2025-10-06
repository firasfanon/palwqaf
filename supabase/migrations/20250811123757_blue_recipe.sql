/*
  # إنشاء الدوال المساعدة لقاعدة البيانات

  1. الدوال الجديدة
    - `increment_news_views` - زيادة عدد مشاهدات الأخبار
    - `increment_document_views` - زيادة عدد مشاهدات الوثائق
    - `increment_document_downloads` - زيادة عدد تحميلات الوثائق
    - `search_all_content` - البحث الشامل في جميع المحتويات
    - `get_dashboard_stats` - إحصائيات لوحة التحكم
    - `get_financial_summary` - الملخص المالي
    - `update_updated_at` - تحديث timestamp تلقائياً

  2. المحفزات (Triggers)
    - تحديث `updated_at` تلقائياً عند التعديل
*/

-- دالة تحديث updated_at تلقائياً
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- دالة زيادة عدد مشاهدات الأخبار
CREATE OR REPLACE FUNCTION increment_news_views(news_id integer)
RETURNS void AS $$
BEGIN
  UPDATE news 
  SET view_count = view_count + 1 
  WHERE id = news_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- دالة زيادة عدد مشاهدات الوثائق
CREATE OR REPLACE FUNCTION increment_document_views(document_id integer)
RETURNS void AS $$
BEGIN
  UPDATE documents 
  SET view_count = view_count + 1 
  WHERE id = document_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- دالة زيادة عدد تحميلات الوثائق
CREATE OR REPLACE FUNCTION increment_document_downloads(document_id integer)
RETURNS void AS $$
BEGIN
  UPDATE documents 
  SET download_count = download_count + 1 
  WHERE id = document_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- دالة البحث الشامل
CREATE OR REPLACE FUNCTION search_all_content(search_query text)
RETURNS TABLE(
  id integer,
  title text,
  content text,
  type text,
  relevance real
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    n.id,
    n.title,
    COALESCE(n.excerpt, '') as content,
    'news'::text as type,
    ts_rank(to_tsvector('arabic', n.title || ' ' || COALESCE(n.excerpt, '')), plainto_tsquery('arabic', search_query)) as relevance
  FROM news n
  WHERE to_tsvector('arabic', n.title || ' ' || COALESCE(n.excerpt, '')) @@ plainto_tsquery('arabic', search_query)
    AND n.status = 'published'
  
  UNION ALL
  
  SELECT 
    w.id,
    w.name as title,
    COALESCE(w.description, '') as content,
    'waqf_land'::text as type,
    ts_rank(to_tsvector('arabic', w.name || ' ' || COALESCE(w.description, '')), plainto_tsquery('arabic', search_query)) as relevance
  FROM waqf_lands w
  WHERE to_tsvector('arabic', w.name || ' ' || COALESCE(w.description, '')) @@ plainto_tsquery('arabic', search_query)
  
  UNION ALL
  
  SELECT 
    c.id,
    c.title,
    COALESCE(c.description, '') as content,
    'case'::text as type,
    ts_rank(to_tsvector('arabic', c.title || ' ' || COALESCE(c.description, '')), plainto_tsquery('arabic', search_query)) as relevance
  FROM cases c
  WHERE to_tsvector('arabic', c.title || ' ' || COALESCE(c.description, '')) @@ plainto_tsquery('arabic', search_query)
  
  ORDER BY relevance DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- دالة إحصائيات لوحة التحكم
CREATE OR REPLACE FUNCTION get_dashboard_stats()
RETURNS jsonb AS $$
DECLARE
  result jsonb;
BEGIN
  SELECT jsonb_build_object(
    'total_waqf_lands', (SELECT COUNT(*) FROM waqf_lands),
    'active_waqf_lands', (SELECT COUNT(*) FROM waqf_lands WHERE status = 'active'),
    'total_cases', (SELECT COUNT(*) FROM cases),
    'open_cases', (SELECT COUNT(*) FROM cases WHERE status IN ('open', 'in_progress')),
    'total_documents', (SELECT COUNT(*) FROM documents),
    'total_users', (SELECT COUNT(*) FROM users WHERE is_active = true),
    'total_appointments', (SELECT COUNT(*) FROM appointments),
    'upcoming_appointments', (SELECT COUNT(*) FROM appointments WHERE start_time > now()),
    'total_value', (SELECT COALESCE(SUM(value), 0) FROM waqf_lands),
    'monthly_income', (SELECT COALESCE(SUM(monthly_income), 0) FROM waqf_lands),
    'monthly_expenses', (SELECT COALESCE(SUM(monthly_expenses), 0) FROM waqf_lands)
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- دالة الملخص المالي
CREATE OR REPLACE FUNCTION get_financial_summary(start_date date DEFAULT NULL, end_date date DEFAULT NULL)
RETURNS jsonb AS $$
DECLARE
  result jsonb;
BEGIN
  SELECT jsonb_build_object(
    'total_income', (SELECT COALESCE(SUM(monthly_income), 0) FROM waqf_lands WHERE status = 'active'),
    'total_expenses', (SELECT COALESCE(SUM(monthly_expenses), 0) FROM waqf_lands WHERE status = 'active'),
    'net_income', (SELECT COALESCE(SUM(monthly_income - monthly_expenses), 0) FROM waqf_lands WHERE status = 'active'),
    'by_governorate', (
      SELECT jsonb_object_agg(
        g.name_ar,
        jsonb_build_object(
          'income', COALESCE(SUM(w.monthly_income), 0),
          'expenses', COALESCE(SUM(w.monthly_expenses), 0),
          'count', COUNT(w.id)
        )
      )
      FROM governorates g
      LEFT JOIN waqf_lands w ON g.code = w.governorate AND w.status = 'active'
      GROUP BY g.name_ar
    ),
    'by_type', (
      SELECT jsonb_object_agg(
        type,
        jsonb_build_object(
          'income', COALESCE(SUM(monthly_income), 0),
          'expenses', COALESCE(SUM(monthly_expenses), 0),
          'count', COUNT(*)
        )
      )
      FROM waqf_lands
      WHERE status = 'active'
      GROUP BY type
    )
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- إنشاء المحفزات لتحديث updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_waqf_lands_updated_at
  BEFORE UPDATE ON waqf_lands
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_cases_updated_at
  BEFORE UPDATE ON cases
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_news_updated_at
  BEFORE UPDATE ON news
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_announcements_updated_at
  BEFORE UPDATE ON announcements
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_activities_updated_at
  BEFORE UPDATE ON activities
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_user_permissions_updated_at
  BEFORE UPDATE ON user_permissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();