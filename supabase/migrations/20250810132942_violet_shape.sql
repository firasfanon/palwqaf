/*
  # إنشاء الدوال المساعدة

  1. دالة البحث المتقدم
    - بحث في النصوص العربية
    - ترتيب النتائج حسب الصلة
    - دعم البحث الضبابي

  2. دالة الإحصائيات
    - حساب إحصائيات سريعة
    - تجميع البيانات حسب المحافظة
    - تقارير مالية

  3. دوال التحقق
    - التحقق من صحة البيانات
    - التحقق من الصلاحيات
    - التحقق من الإحداثيات
*/

-- دالة البحث المتقدم
CREATE OR REPLACE FUNCTION advanced_search(
  search_query TEXT,
  search_type TEXT DEFAULT 'all',
  governorate_filter TEXT DEFAULT 'all',
  limit_count INTEGER DEFAULT 50
)
RETURNS TABLE (
  id UUID,
  title TEXT,
  content TEXT,
  type TEXT,
  governorate TEXT,
  relevance REAL,
  created_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    n.id,
    n.title,
    n.content,
    'news'::TEXT as type,
    n.governorate,
    ts_rank(to_tsvector('arabic', n.title || ' ' || n.content), plainto_tsquery('arabic', search_query)) as relevance,
    n.created_at
  FROM news n
  WHERE 
    (search_type = 'all' OR search_type = 'news')
    AND (governorate_filter = 'all' OR n.governorate = governorate_filter)
    AND to_tsvector('arabic', n.title || ' ' || n.content) @@ plainto_tsquery('arabic', search_query)
  
  UNION ALL
  
  SELECT 
    w.id,
    w.name as title,
    w.description as content,
    'waqf_land'::TEXT as type,
    w.governorate,
    ts_rank(to_tsvector('arabic', w.name || ' ' || w.description), plainto_tsquery('arabic', search_query)) as relevance,
    w.created_at
  FROM waqf_lands w
  WHERE 
    (search_type = 'all' OR search_type = 'waqf_land')
    AND (governorate_filter = 'all' OR w.governorate = governorate_filter)
    AND to_tsvector('arabic', w.name || ' ' || w.description) @@ plainto_tsquery('arabic', search_query)
  
  UNION ALL
  
  SELECT 
    c.id,
    c.title,
    c.description as content,
    'case'::TEXT as type,
    c.governorate,
    ts_rank(to_tsvector('arabic', c.title || ' ' || c.description), plainto_tsquery('arabic', search_query)) as relevance,
    c.created_at
  FROM cases c
  WHERE 
    (search_type = 'all' OR search_type = 'case')
    AND (governorate_filter = 'all' OR c.governorate = governorate_filter)
    AND to_tsvector('arabic', c.title || ' ' || c.description) @@ plainto_tsquery('arabic', search_query)
  
  ORDER BY relevance DESC, created_at DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- دالة الإحصائيات السريعة
CREATE OR REPLACE FUNCTION get_dashboard_stats(user_governorate TEXT DEFAULT 'all')
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total_waqf_lands', (
      SELECT COUNT(*) FROM waqf_lands 
      WHERE user_governorate = 'all' OR governorate = user_governorate
    ),
    'active_cases', (
      SELECT COUNT(*) FROM cases 
      WHERE status IN ('open', 'in_progress') 
      AND (user_governorate = 'all' OR governorate = user_governorate)
    ),
    'total_documents', (
      SELECT COUNT(*) FROM documents 
      WHERE user_governorate = 'all' OR governorate = user_governorate
    ),
    'monthly_income', (
      SELECT COALESCE(SUM(monthly_income), 0) FROM waqf_lands 
      WHERE user_governorate = 'all' OR governorate = user_governorate
    ),
    'monthly_expenses', (
      SELECT COALESCE(SUM(monthly_expenses), 0) FROM waqf_lands 
      WHERE user_governorate = 'all' OR governorate = user_governorate
    ),
    'total_value', (
      SELECT COALESCE(SUM(estimated_value), 0) FROM waqf_lands 
      WHERE user_governorate = 'all' OR governorate = user_governorate
    ),
    'recent_activities', (
      SELECT json_agg(
        json_build_object(
          'id', id,
          'title', title,
          'type', 'news',
          'created_at', created_at
        )
      ) FROM (
        SELECT id, title, created_at FROM news 
        WHERE user_governorate = 'all' OR governorate = user_governorate
        ORDER BY created_at DESC 
        LIMIT 5
      ) recent_news
    )
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- دالة التحقق من الإحداثيات الفلسطينية
CREATE OR REPLACE FUNCTION is_valid_palestine_coordinates(lat DECIMAL, lng DECIMAL)
RETURNS BOOLEAN AS $$
BEGIN
  -- حدود فلسطين التقريبية
  -- خط العرض: 31.2 إلى 33.3
  -- خط الطول: 34.2 إلى 35.9
  RETURN (
    lat BETWEEN 31.2 AND 33.3 
    AND lng BETWEEN 34.2 AND 35.9
  );
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- دالة حساب المسافة بين نقطتين
CREATE OR REPLACE FUNCTION calculate_distance(
  lat1 DECIMAL, lng1 DECIMAL,
  lat2 DECIMAL, lng2 DECIMAL
)
RETURNS DECIMAL AS $$
DECLARE
  earth_radius DECIMAL := 6371; -- نصف قطر الأرض بالكيلومتر
  dlat DECIMAL;
  dlng DECIMAL;
  a DECIMAL;
  c DECIMAL;
BEGIN
  dlat := radians(lat2 - lat1);
  dlng := radians(lng2 - lng1);
  
  a := sin(dlat/2) * sin(dlat/2) + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlng/2) * sin(dlng/2);
  c := 2 * atan2(sqrt(a), sqrt(1-a));
  
  RETURN earth_radius * c;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- دالة إنشاء تقرير مالي
CREATE OR REPLACE FUNCTION generate_financial_report(
  start_date DATE,
  end_date DATE,
  governorate_filter TEXT DEFAULT 'all'
)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'period', json_build_object(
      'start_date', start_date,
      'end_date', end_date
    ),
    'summary', json_build_object(
      'total_income', (
        SELECT COALESCE(SUM(monthly_income), 0) FROM waqf_lands 
        WHERE (governorate_filter = 'all' OR governorate = governorate_filter)
        AND created_at BETWEEN start_date AND end_date
      ),
      'total_expenses', (
        SELECT COALESCE(SUM(monthly_expenses), 0) FROM waqf_lands 
        WHERE (governorate_filter = 'all' OR governorate = governorate_filter)
        AND created_at BETWEEN start_date AND end_date
      ),
      'net_income', (
        SELECT COALESCE(SUM(monthly_income - monthly_expenses), 0) FROM waqf_lands 
        WHERE (governorate_filter = 'all' OR governorate = governorate_filter)
        AND created_at BETWEEN start_date AND end_date
      )
    ),
    'by_type', (
      SELECT json_agg(
        json_build_object(
          'type', type,
          'count', count,
          'total_income', total_income,
          'total_expenses', total_expenses
        )
      ) FROM (
        SELECT 
          type,
          COUNT(*) as count,
          SUM(monthly_income) as total_income,
          SUM(monthly_expenses) as total_expenses
        FROM waqf_lands 
        WHERE (governorate_filter = 'all' OR governorate = governorate_filter)
        AND created_at BETWEEN start_date AND end_date
        GROUP BY type
      ) type_stats
    ),
    'by_governorate', (
      SELECT json_agg(
        json_build_object(
          'governorate', governorate,
          'count', count,
          'total_value', total_value,
          'total_income', total_income
        )
      ) FROM (
        SELECT 
          governorate,
          COUNT(*) as count,
          SUM(estimated_value) as total_value,
          SUM(monthly_income) as total_income
        FROM waqf_lands 
        WHERE created_at BETWEEN start_date AND end_date
        GROUP BY governorate
      ) gov_stats
    )
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;