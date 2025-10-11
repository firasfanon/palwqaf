/*
  # Fix dashboard stats function overloading

  1. Changes
    - Drop the ambiguous get_dashboard_stats functions
    - Create a single clear get_dashboard_stats function
    - Add get_dashboard_stats_by_governorate for governorate-specific stats

  2. Security
    - Maintain proper RLS and permissions
    - Ensure functions are accessible to authenticated users
*/

-- Drop existing functions to resolve overloading
DROP FUNCTION IF EXISTS public.get_dashboard_stats();
DROP FUNCTION IF EXISTS public.get_dashboard_stats(user_governorate text);

-- Create main dashboard stats function
CREATE OR REPLACE FUNCTION public.get_dashboard_stats()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result json;
BEGIN
  SELECT json_build_object(
    'total_lands', (SELECT COUNT(*) FROM waqf_lands),
    'total_cases', (SELECT COUNT(*) FROM cases),
    'open_cases', (SELECT COUNT(*) FROM cases WHERE status = 'open'),
    'total_documents', (SELECT COUNT(*) FROM documents),
    'total_appointments', (SELECT COUNT(*) FROM appointments WHERE start_time >= CURRENT_DATE),
    'total_users', (SELECT COUNT(*) FROM users WHERE is_active = true),
    'total_value', (SELECT COALESCE(SUM(value), 0) FROM waqf_lands),
    'monthly_income', (SELECT COALESCE(SUM(monthly_income), 0) FROM waqf_lands),
    'monthly_expenses', (SELECT COALESCE(SUM(monthly_expenses), 0) FROM waqf_lands),
    'lands_by_type', (
      SELECT json_object_agg(type, count)
      FROM (
        SELECT type, COUNT(*) as count
        FROM waqf_lands
        GROUP BY type
      ) t
    ),
    'cases_by_status', (
      SELECT json_object_agg(status, count)
      FROM (
        SELECT status, COUNT(*) as count
        FROM cases
        GROUP BY status
      ) t
    ),
    'lands_by_governorate', (
      SELECT json_object_agg(governorate, count)
      FROM (
        SELECT governorate, COUNT(*) as count
        FROM waqf_lands
        WHERE governorate IS NOT NULL
        GROUP BY governorate
      ) t
    )
  ) INTO result;
  
  RETURN result;
END;
$$;

-- Create governorate-specific stats function
CREATE OR REPLACE FUNCTION public.get_dashboard_stats_by_governorate(user_governorate text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result json;
BEGIN
  SELECT json_build_object(
    'total_lands', (SELECT COUNT(*) FROM waqf_lands WHERE governorate = user_governorate),
    'total_cases', (SELECT COUNT(*) FROM cases c JOIN waqf_lands w ON c.waqf_land_id = w.id WHERE w.governorate = user_governorate),
    'open_cases', (SELECT COUNT(*) FROM cases c JOIN waqf_lands w ON c.waqf_land_id = w.id WHERE c.status = 'open' AND w.governorate = user_governorate),
    'total_documents', (SELECT COUNT(*) FROM documents),
    'total_appointments', (SELECT COUNT(*) FROM appointments WHERE start_time >= CURRENT_DATE),
    'total_users', (SELECT COUNT(*) FROM users WHERE governorate = user_governorate AND is_active = true),
    'total_value', (SELECT COALESCE(SUM(value), 0) FROM waqf_lands WHERE governorate = user_governorate),
    'monthly_income', (SELECT COALESCE(SUM(monthly_income), 0) FROM waqf_lands WHERE governorate = user_governorate),
    'monthly_expenses', (SELECT COALESCE(SUM(monthly_expenses), 0) FROM waqf_lands WHERE governorate = user_governorate),
    'lands_by_type', (
      SELECT json_object_agg(type, count)
      FROM (
        SELECT type, COUNT(*) as count
        FROM waqf_lands
        WHERE governorate = user_governorate
        GROUP BY type
      ) t
    ),
    'cases_by_status', (
      SELECT json_object_agg(status, count)
      FROM (
        SELECT c.status, COUNT(*) as count
        FROM cases c
        JOIN waqf_lands w ON c.waqf_land_id = w.id
        WHERE w.governorate = user_governorate
        GROUP BY c.status
      ) t
    )
  ) INTO result;
  
  RETURN result;
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.get_dashboard_stats() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_dashboard_stats_by_governorate(text) TO authenticated;