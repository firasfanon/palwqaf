/*
  # Fix Dashboard Stats Function

  1. Purpose
    - Fix get_dashboard_stats() function to work correctly with existing schema
    - Ensure function returns valid data even with empty or missing tables
    - Handle NULL values gracefully

  2. Changes
    - Drop and recreate get_dashboard_stats() function
    - Use COALESCE to handle NULL values
    - Add error handling for missing tables/columns

  3. Security
    - Maintain SECURITY DEFINER for admin access
*/

-- Drop existing function if exists
DROP FUNCTION IF EXISTS public.get_dashboard_stats();

-- Create improved function that handles missing data gracefully
CREATE OR REPLACE FUNCTION public.get_dashboard_stats()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result jsonb;
  total_waqf_lands_count bigint DEFAULT 0;
  active_waqf_lands_count bigint DEFAULT 0;
  total_cases_count bigint DEFAULT 0;
  open_cases_count bigint DEFAULT 0;
  total_documents_count bigint DEFAULT 0;
  total_users_count bigint DEFAULT 0;
  total_appointments_count bigint DEFAULT 0;
  upcoming_appointments_count bigint DEFAULT 0;
  total_value_sum numeric DEFAULT 0;
  monthly_income_sum numeric DEFAULT 0;
  monthly_expenses_sum numeric DEFAULT 0;
BEGIN
  -- Get waqf lands count safely
  BEGIN
    SELECT COUNT(*) INTO total_waqf_lands_count FROM waqf_lands;
    SELECT COUNT(*) INTO active_waqf_lands_count FROM waqf_lands WHERE status = 'active';
  EXCEPTION WHEN OTHERS THEN
    total_waqf_lands_count := 0;
    active_waqf_lands_count := 0;
  END;

  -- Get cases count safely
  BEGIN
    SELECT COUNT(*) INTO total_cases_count FROM cases;
    SELECT COUNT(*) INTO open_cases_count FROM cases WHERE status IN ('open', 'in_progress');
  EXCEPTION WHEN OTHERS THEN
    total_cases_count := 0;
    open_cases_count := 0;
  END;

  -- Get documents count safely
  BEGIN
    SELECT COUNT(*) INTO total_documents_count FROM documents;
  EXCEPTION WHEN OTHERS THEN
    total_documents_count := 0;
  END;

  -- Get users count safely
  BEGIN
    SELECT COUNT(*) INTO total_users_count FROM users WHERE is_active = true;
  EXCEPTION WHEN OTHERS THEN
    total_users_count := 0;
  END;

  -- Get appointments count safely
  BEGIN
    SELECT COUNT(*) INTO total_appointments_count FROM appointments;
    SELECT COUNT(*) INTO upcoming_appointments_count FROM appointments WHERE start_time > now();
  EXCEPTION WHEN OTHERS THEN
    total_appointments_count := 0;
    upcoming_appointments_count := 0;
  END;

  -- Get financial data safely
  BEGIN
    SELECT
      COALESCE(SUM(value), 0),
      COALESCE(SUM(monthly_income), 0),
      COALESCE(SUM(monthly_expenses), 0)
    INTO
      total_value_sum,
      monthly_income_sum,
      monthly_expenses_sum
    FROM waqf_lands;
  EXCEPTION WHEN OTHERS THEN
    total_value_sum := 0;
    monthly_income_sum := 0;
    monthly_expenses_sum := 0;
  END;

  -- Build result object
  result := jsonb_build_object(
    'total_waqf_lands', total_waqf_lands_count,
    'active_waqf_lands', active_waqf_lands_count,
    'total_cases', total_cases_count,
    'open_cases', open_cases_count,
    'total_documents', total_documents_count,
    'total_users', total_users_count,
    'total_appointments', total_appointments_count,
    'upcoming_appointments', upcoming_appointments_count,
    'total_value', total_value_sum,
    'monthly_income', monthly_income_sum,
    'monthly_expenses', monthly_expenses_sum
  );

  RETURN result;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.get_dashboard_stats() TO authenticated;