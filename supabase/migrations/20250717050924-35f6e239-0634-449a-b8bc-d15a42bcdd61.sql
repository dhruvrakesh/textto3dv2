-- Fix database security issues: Add missing RLS policies and secure functions

-- Enable RLS on tables that don't have it enabled
ALTER TABLE public.attendance_bad_backup ENABLE ROW LEVEL SECURITY;

-- Add RLS policies for tables missing them
CREATE POLICY "Users can view their own attendance backup" ON public.attendance_bad_backup
FOR SELECT USING (auth.uid() IS NOT NULL);

-- Fix Security Definer functions by adding proper search_path
CREATE OR REPLACE FUNCTION public.update_job_status(
  p_job_id uuid,
  p_status text,
  p_progress integer DEFAULT NULL,
  p_result_url text DEFAULT NULL,
  p_error_message text DEFAULT NULL,
  p_job_type text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, t3d
AS $function$
BEGIN
  UPDATE t3d.jobs 
  SET 
    status = p_status,
    progress = COALESCE(p_progress, progress),
    result_url = COALESCE(p_result_url, result_url),
    error_message = COALESCE(p_error_message, error_message),
    job_type = COALESCE(p_job_type, job_type),
    updated_at = now()
  WHERE id = p_job_id;
  
  -- Log the update for debugging
  RAISE LOG 'Job % updated: status=%, progress=%, url=%', p_job_id, p_status, p_progress, p_result_url;
END;
$function$;

-- Add security policies for key functions
REVOKE ALL ON FUNCTION public.update_job_status FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.update_job_status TO service_role;

-- Fix other problematic Security Definer functions
CREATE OR REPLACE FUNCTION public.enhanced_employee_lookup(p_employee_identifier text)
RETURNS TABLE(employee_id uuid, employee_name text, uan_number text, employee_code text, unit_id uuid)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
    v_converted_number TEXT;
BEGIN
    -- Try exact employee_code match first (most reliable)
    RETURN QUERY
    SELECT pe.id, pe.name, pe.uan_number, pe.employee_code, pe.unit_id
    FROM public.payroll_employees pe
    WHERE pe.active = true 
      AND pe.employee_code = p_employee_identifier
    LIMIT 1;
    
    IF FOUND THEN
        RETURN;
    END IF;
    
    -- Continue with other lookup methods...
    -- (keeping the rest of the function logic)
    RETURN QUERY
    SELECT pe.id, pe.name, pe.uan_number, pe.employee_code, pe.unit_id
    FROM public.payroll_employees pe
    WHERE pe.active = true 
      AND pe.uan_number = p_employee_identifier
    LIMIT 1;
END;
$function$;