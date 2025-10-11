/*
  # إنشاء دوال قاعدة البيانات المساعدة

  1. دوال زيادة العدادات
  2. دوال البحث المتقدم
  3. دوال الإحصائيات
  4. دوال التقارير
*/

-- دالة زيادة عداد مشاهدات الأخبار
CREATE OR REPLACE FUNCTION increment_news_views(news_id BIGINT)
RETURNS VOID AS $$
BEGIN
  UPDATE news 
  SET view_count = view_count + 1 
  WHERE id = news_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- دالة زيادة عداد مشاهدات الوثائق
CREATE OR REPLACE FUNCTION increment_document_views(document_id BIGINT)
RETURNS VOID AS $$
BEGIN
  UPDATE documents 
  SET view_count = view_count + 1 
  WHERE id = document_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- دالة زيادة عداد تحميلات الوثائق
CREATE OR REPLACE FUNCTION increment_document_downloads(document_id BIGINT)
RETURNS VOID AS $$
BEGIN
  UPDATE documents 
  SET download_count = download_count + 1 
  WHERE id = document_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- دالة البحث المتقدم في جميع الجداول
CREATE OR REPLACE FUNCTION advanced_search(
  search_term TEXT,
  search_tables TEXT[] DEFAULT ARRAY['waqf_lands', 'cases', 'documents', 'news'],
  limit_results INTEGER DEFAULT 50
)
RETURNS TABLE (
  table_name TEXT,
  record_id BIGINT,
  title TEXT,
  description TEXT,
  relevance REAL,
  created_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  (
    SELECT 
      'waqf_lands'::TEXT as table_name,
      w.id as record_id,
      w.name as title,
      w.description as description,
      ts_rank(to_tsvector('arabic', w.name || ' ' || COALESCE(w.description, '')), plainto_tsquery('arabic', search_term)) as relevance,
      w.created_at
    FROM waqf_lands w
    WHERE 'waqf_lands' = ANY(search_tables)
    AND (
      w.name ILIKE '%' || search_term || '%' OR
      w.description ILIKE '%' || search_term || '%' OR
      to_tsvector('arabic', w.name || ' ' || COALESCE(w.description, '')) @@ plainto_tsquery('arabic', search_term)
    )
  )
  UNION ALL
  (
    SELECT 
      'cases'::TEXT as table_name,
      c.id as record_id,
      c.title as title,
      c.description as description,
      ts_rank(to_tsvector('arabic', c.title || ' ' || COALESCE(c.description, '')), plainto_tsquery('arabic', search_term)) as relevance,
      c.created_at
    FROM cases c
    WHERE 'cases' = ANY(search_tables)
    AND (
      c.title ILIKE '%' || search_term || '%' OR
      c.description ILIKE '%' || search_term || '%' OR
      to_tsvector('arabic', c.title || ' ' || COALESCE(c.description, '')) @@ plainto_tsquery('arabic', search_term)
    )
  )
  UNION ALL
  (
    SELECT 
      'documents'::TEXT as table_name,
      d.id as record_id,
      d.name as title,
      d.content as description,
      ts_rank(to_tsvector('arabic', d.name || ' ' || COALESCE(d.content, '')), plainto_tsquery('arabic', search_term)) as relevance,
      d.uploaded_at as created_at
    FROM documents d
    WHERE 'documents' = ANY(search_tables)
    AND (
      d.name ILIKE '%' || search_term || '%' OR
      d.content ILIKE '%' || search_term || '%' OR
      search_term = ANY(d.tags) OR
      to_tsvector('arabic', d.name || ' ' || COALESCE(d.content, '')) @@ plainto_tsquery('arabic', search_term)
    )
  )
  UNION ALL
  (
    SELECT 
      'news'::TEXT as table_name,
      n.id as record_id,
      n.title as title,
      n.excerpt as description,
      ts_rank(to_tsvector('arabic', n.title || ' ' || COALESCE(n.excerpt, '') || ' ' || COALESCE(n.content, '')), plainto_tsquery('arabic', search_term)) as relevance,
      n.created_at
    FROM news n
    WHERE 'news' = ANY(search_tables)
    AND (
      n.title ILIKE '%' || search_term || '%' OR
      n.excerpt ILIKE '%' || search_term || '%' OR
      n.content ILIKE '%' || search_term || '%' OR
      to_tsvector('arabic', n.title || ' ' || COALESCE(n.excerpt, '') || ' ' || COALESCE(n.content, '')) @@ plainto_tsquery('arabic', search_term)
    )
  )
  ORDER BY relevance DESC, created_at DESC
  LIMIT limit_results;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- دالة إحصائيات الأراضي الوقفية حسب المحافظة
CREATE OR REPLACE FUNCTION get_waqf_stats_by_governorate()
RETURNS TABLE (
  governorate TEXT,
  governorate_name TEXT,
  total_lands BIGINT,
  total_area DECIMAL,
  total_value DECIMAL,
  monthly_income DECIMAL,
  monthly_expenses DECIMAL,
  active_lands BIGINT,
  disputed_lands BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    w.governorate,
    g.name_ar as governorate_name,
    COUNT(w.id) as total_lands,
    SUM(w.area) as total_area,
    SUM(w.value) as total_value,
    SUM(w.monthly_income) as monthly_income,
    SUM(w.monthly_expenses) as monthly_expenses,
    COUNT(w.id) FILTER (WHERE w.status = 'active') as active_lands,
    COUNT(w.id) FILTER (WHERE w.status = 'disputed') as disputed_lands
  FROM waqf_lands w
  LEFT JOIN governorates g ON w.governorate = g.id
  GROUP BY w.governorate, g.name_ar
  ORDER BY total_value DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- دالة إحصائيات القضايا حسب النوع والحالة
CREATE OR REPLACE FUNCTION get_cases_statistics()
RETURNS TABLE (
  total_cases BIGINT,
  open_cases BIGINT,
  in_progress_cases BIGINT,
  resolved_cases BIGINT,
  urgent_cases BIGINT,
  cases_by_type JSONB,
  cases_by_governorate JSONB,
  average_resolution_days DECIMAL
) AS $$
DECLARE
  cases_by_type_result JSONB;
  cases_by_gov_result JSONB;
BEGIN
  -- إحصائيات أنواع القضايا
  SELECT jsonb_object_agg(type, count)
  INTO cases_by_type_result
  FROM (
    SELECT type, COUNT(*) as count
    FROM cases
    GROUP BY type
  ) t;

  -- إحصائيات القضايا حسب المحافظة
  SELECT jsonb_object_agg(governorate, count)
  INTO cases_by_gov_result
  FROM (
    SELECT w.governorate, COUNT(c.*) as count
    FROM cases c
    LEFT JOIN waqf_lands w ON c.waqf_land_id = w.id
    WHERE w.governorate IS NOT NULL
    GROUP BY w.governorate
  ) t;

  RETURN QUERY
  SELECT 
    (SELECT COUNT(*) FROM cases)::BIGINT as total_cases,
    (SELECT COUNT(*) FROM cases WHERE status = 'open')::BIGINT as open_cases,
    (SELECT COUNT(*) FROM cases WHERE status = 'in_progress')::BIGINT as in_progress_cases,
    (SELECT COUNT(*) FROM cases WHERE status = 'resolved')::BIGINT as resolved_cases,
    (SELECT COUNT(*) FROM cases WHERE priority = 'urgent')::BIGINT as urgent_cases,
    cases_by_type_result as cases_by_type,
    cases_by_gov_result as cases_by_governorate,
    (SELECT AVG(EXTRACT(DAY FROM resolved_date - created_at)) 
     FROM cases 
     WHERE resolved_date IS NOT NULL)::DECIMAL as average_resolution_days;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- دالة إحصائيات الوثائق
CREATE OR REPLACE FUNCTION get_documents_statistics()
RETURNS TABLE (
  total_documents BIGINT,
  total_size_gb DECIMAL,
  documents_by_category JSONB,
  documents_by_type JSONB,
  most_viewed_documents JSONB,
  recent_uploads BIGINT
) AS $$
DECLARE
  docs_by_category JSONB;
  docs_by_type JSONB;
  most_viewed JSONB;
BEGIN
  -- إحصائيات الوثائق حسب الفئة
  SELECT jsonb_object_agg(category, count)
  INTO docs_by_category
  FROM (
    SELECT category, COUNT(*) as count
    FROM documents
    GROUP BY category
  ) t;

  -- إحصائيات الوثائق حسب النوع
  SELECT jsonb_object_agg(type, count)
  INTO docs_by_type
  FROM (
    SELECT type, COUNT(*) as count
    FROM documents
    GROUP BY type
  ) t;

  -- أكثر الوثائق مشاهدة
  SELECT jsonb_agg(jsonb_build_object('name', name, 'views', view_count))
  INTO most_viewed
  FROM (
    SELECT name, view_count
    FROM documents
    ORDER BY view_count DESC
    LIMIT 5
  ) t;

  RETURN QUERY
  SELECT 
    (SELECT COUNT(*) FROM documents)::BIGINT as total_documents,
    (SELECT SUM(size_mb) / 1024 FROM documents)::DECIMAL as total_size_gb,
    docs_by_category as documents_by_category,
    docs_by_type as documents_by_type,
    most_viewed as most_viewed_documents,
    (SELECT COUNT(*) FROM documents WHERE uploaded_at > NOW() - INTERVAL '7 days')::BIGINT as recent_uploads;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- دالة تنظيف البيانات القديمة
CREATE OR REPLACE FUNCTION cleanup_old_data()
RETURNS VOID AS $$
BEGIN
  -- حذف الإشعارات القديمة (أكثر من 3 أشهر)
  DELETE FROM notifications 
  WHERE created_at < NOW() - INTERVAL '3 months' 
  AND is_read = true;

  -- أرشفة القضايا المحلولة القديمة (أكثر من سنة)
  UPDATE cases 
  SET status = 'archived' 
  WHERE status = 'resolved' 
  AND resolved_date < NOW() - INTERVAL '1 year';

  -- تحديث إحصائيات الوثائق
  UPDATE documents 
  SET last_modified = NOW() 
  WHERE last_modified < NOW() - INTERVAL '1 month'
  AND view_count = 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- دالة إنشاء تقرير شامل
CREATE OR REPLACE FUNCTION generate_comprehensive_report(
  start_date DATE DEFAULT NULL,
  end_date DATE DEFAULT NULL,
  governorate_filter TEXT DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
  result JSONB;
  waqf_stats JSONB;
  cases_stats JSONB;
  docs_stats JSONB;
  financial_stats JSONB;
BEGIN
  -- تحديد التواريخ الافتراضية
  IF start_date IS NULL THEN
    start_date := DATE_TRUNC('month', NOW())::DATE;
  END IF;
  
  IF end_date IS NULL THEN
    end_date := NOW()::DATE;
  END IF;

  -- إحصائيات الأراضي الوقفية
  SELECT jsonb_build_object(
    'total_lands', COUNT(*),
    'total_area', SUM(area),
    'total_value', SUM(value),
    'active_lands', COUNT(*) FILTER (WHERE status = 'active'),
    'disputed_lands', COUNT(*) FILTER (WHERE status = 'disputed')
  )
  INTO waqf_stats
  FROM waqf_lands w
  WHERE (governorate_filter IS NULL OR w.governorate = governorate_filter)
  AND w.created_at::DATE BETWEEN start_date AND end_date;

  -- إحصائيات القضايا
  SELECT jsonb_build_object(
    'total_cases', COUNT(*),
    'open_cases', COUNT(*) FILTER (WHERE status = 'open'),
    'resolved_cases', COUNT(*) FILTER (WHERE status = 'resolved'),
    'urgent_cases', COUNT(*) FILTER (WHERE priority = 'urgent')
  )
  INTO cases_stats
  FROM cases c
  LEFT JOIN waqf_lands w ON c.waqf_land_id = w.id
  WHERE (governorate_filter IS NULL OR w.governorate = governorate_filter)
  AND c.created_at::DATE BETWEEN start_date AND end_date;

  -- إحصائيات الوثائق
  SELECT jsonb_build_object(
    'total_documents', COUNT(*),
    'total_size_gb', SUM(size_mb) / 1024,
    'recent_uploads', COUNT(*) FILTER (WHERE uploaded_at::DATE BETWEEN start_date AND end_date)
  )
  INTO docs_stats
  FROM documents;

  -- الإحصائيات المالية
  SELECT jsonb_build_object(
    'total_income', SUM(monthly_income),
    'total_expenses', SUM(monthly_expenses),
    'net_income', SUM(monthly_income) - SUM(monthly_expenses),
    'profitable_lands', COUNT(*) FILTER (WHERE monthly_income > monthly_expenses)
  )
  INTO financial_stats
  FROM waqf_lands w
  WHERE (governorate_filter IS NULL OR w.governorate = governorate_filter);

  -- تجميع النتائج
  result := jsonb_build_object(
    'period', jsonb_build_object(
      'start_date', start_date,
      'end_date', end_date,
      'governorate', COALESCE(governorate_filter, 'all')
    ),
    'waqf_lands', waqf_stats,
    'cases', cases_stats,
    'documents', docs_stats,
    'financial', financial_stats,
    'generated_at', NOW()
  );

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- دالة إنشاء المفتاح الوطني للوقف
CREATE OR REPLACE FUNCTION generate_national_waqf_key(
  governorate_code TEXT,
  waqf_type TEXT,
  sequence_number INTEGER
)
RETURNS TEXT AS $$
DECLARE
  type_code TEXT;
  formatted_sequence TEXT;
BEGIN
  -- تحديد رمز النوع
  type_code := CASE waqf_type
    WHEN 'mosque' THEN 'MSQ'
    WHEN 'cemetery' THEN 'CEM'
    WHEN 'school' THEN 'SCH'
    WHEN 'commercial' THEN 'COM'
    WHEN 'residential' THEN 'RES'
    WHEN 'agricultural' THEN 'AGR'
    ELSE 'GEN'
  END;

  -- تنسيق رقم التسلسل
  formatted_sequence := LPAD(sequence_number::TEXT, 3, '0');

  -- إنشاء المفتاح الوطني
  RETURN 'PS-' || UPPER(governorate_code) || '-' || formatted_sequence || '-' || type_code || '-001';
END;
$$ LANGUAGE plpgsql;

-- دالة تحديث آخر تسجيل دخول للمستخدم
CREATE OR REPLACE FUNCTION update_user_last_login(user_email TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE users 
  SET last_login = NOW() 
  WHERE email = user_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- دالة إنشاء إشعار تلقائي
CREATE OR REPLACE FUNCTION create_auto_notification(
  notification_title TEXT,
  notification_message TEXT,
  notification_type TEXT,
  target_user_id BIGINT,
  related_type TEXT DEFAULT NULL,
  related_id BIGINT DEFAULT NULL
)
RETURNS BIGINT AS $$
DECLARE
  notification_id BIGINT;
BEGIN
  INSERT INTO notifications (title, message, type, user_id, related_to_type, related_to_id, sender)
  VALUES (notification_title, notification_message, notification_type, target_user_id, related_type, related_id, 'النظام')
  RETURNING id INTO notification_id;

  RETURN notification_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- دالة إحصائيات الأداء الشهري
CREATE OR REPLACE FUNCTION get_monthly_performance_stats(target_month DATE DEFAULT NULL)
RETURNS JSONB AS $$
DECLARE
  month_start DATE;
  month_end DATE;
  result JSONB;
BEGIN
  IF target_month IS NULL THEN
    month_start := DATE_TRUNC('month', NOW())::DATE;
  ELSE
    month_start := DATE_TRUNC('month', target_month)::DATE;
  END IF;
  
  month_end := (month_start + INTERVAL '1 month - 1 day')::DATE;

  SELECT jsonb_build_object(
    'period', jsonb_build_object(
      'start', month_start,
      'end', month_end
    ),
    'new_waqf_lands', (
      SELECT COUNT(*) FROM waqf_lands 
      WHERE created_at::DATE BETWEEN month_start AND month_end
    ),
    'new_cases', (
      SELECT COUNT(*) FROM cases 
      WHERE created_at::DATE BETWEEN month_start AND month_end
    ),
    'resolved_cases', (
      SELECT COUNT(*) FROM cases 
      WHERE resolved_date::DATE BETWEEN month_start AND month_end
    ),
    'uploaded_documents', (
      SELECT COUNT(*) FROM documents 
      WHERE uploaded_at::DATE BETWEEN month_start AND month_end
    ),
    'total_appointments', (
      SELECT COUNT(*) FROM appointments 
      WHERE start_time::DATE BETWEEN month_start AND month_end
    ),
    'news_published', (
      SELECT COUNT(*) FROM news 
      WHERE published_at::DATE BETWEEN month_start AND month_end
    )
  )
  INTO result;

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;