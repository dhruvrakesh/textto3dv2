-- Phase 1: Fix the existing job record with a working demo model URL
UPDATE t3d.jobs 
SET result_url = 'https://threejs.org/examples/models/gltf/DamagedHelmet/glTF-Binary/DamagedHelmet.glb',
    job_type = 'demo'
WHERE result_url LIKE '%example.com%';

-- Phase 2: Fix critical security issues - Enable RLS on missing tables
ALTER TABLE public.attendance_bad_backup ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.csv_upload_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_stock_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_stock_summary ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deck_viscosity_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employee_code_sequences ENABLE ROW LEVEL SECURITY;

-- Fix the most critical security definer functions by adding proper search path
CREATE OR REPLACE FUNCTION public.enhanced_employee_lookup(p_employee_identifier text)
RETURNS TABLE(employee_id uuid, employee_name text, uan_number text, employee_code text, unit_id uuid)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
    
    -- Try exact UAN number match
    RETURN QUERY
    SELECT pe.id, pe.name, pe.uan_number, pe.employee_code, pe.unit_id
    FROM public.payroll_employees pe
    WHERE pe.active = true 
      AND pe.uan_number = p_employee_identifier
    LIMIT 1;
    
    IF FOUND THEN
        RETURN;
    END IF;
    
    -- Try UUID match
    IF p_employee_identifier ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' THEN
        RETURN QUERY
        SELECT pe.id, pe.name, pe.uan_number, pe.employee_code, pe.unit_id
        FROM public.payroll_employees pe
        WHERE pe.active = true 
          AND pe.id::text = p_employee_identifier
        LIMIT 1;
        
        IF FOUND THEN
            RETURN;
        END IF;
    END IF;
    
    -- Handle scientific notation conversion for Excel exports
    IF p_employee_identifier ~ '^[0-9]+\.?[0-9]*[Ee][+-]?[0-9]+$' THEN
        BEGIN
            -- Convert scientific notation to regular number
            v_converted_number := TRIM(TO_CHAR(p_employee_identifier::NUMERIC, 'FM999999999999999999'));
            
            -- Try exact match with converted number
            RETURN QUERY
            SELECT pe.id, pe.name, pe.uan_number, pe.employee_code, pe.unit_id
            FROM public.payroll_employees pe
            WHERE pe.active = true 
              AND pe.uan_number = v_converted_number
            LIMIT 1;
            
            IF FOUND THEN
                RETURN;
            END IF;
            
            -- Try partial match (in case of precision loss)
            RETURN QUERY
            SELECT pe.id, pe.name, pe.uan_number, pe.employee_code, pe.unit_id
            FROM public.payroll_employees pe
            WHERE pe.active = true 
              AND pe.uan_number LIKE v_converted_number || '%'
            LIMIT 1;
            
        EXCEPTION WHEN OTHERS THEN
            -- Continue to fuzzy matching if conversion fails
        END;
    END IF;
    
    -- Fuzzy matching as last resort (for partial UAN numbers)
    IF LENGTH(p_employee_identifier) >= 6 THEN
        RETURN QUERY
        SELECT pe.id, pe.name, pe.uan_number, pe.employee_code, pe.unit_id
        FROM public.payroll_employees pe
        WHERE pe.active = true 
          AND (pe.uan_number LIKE '%' || p_employee_identifier || '%'
               OR pe.uan_number LIKE p_employee_identifier || '%')
        ORDER BY 
            CASE 
                WHEN pe.uan_number = p_employee_identifier THEN 1
                WHEN pe.uan_number LIKE p_employee_identifier || '%' THEN 2
                ELSE 3
            END
        LIMIT 1;
    END IF;
END;
$$;

-- Fix update_job_status function with proper search path
CREATE OR REPLACE FUNCTION public.update_job_status(
  p_job_id uuid,
  p_status text DEFAULT NULL,
  p_progress numeric DEFAULT NULL,
  p_result_url text DEFAULT NULL,
  p_error_message text DEFAULT NULL,
  p_job_type text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, t3d
AS $$
BEGIN
  UPDATE t3d.jobs 
  SET 
    status = COALESCE(p_status, status),
    progress = COALESCE(p_progress, progress),
    result_url = COALESCE(p_result_url, result_url),
    error_message = COALESCE(p_error_message, error_message),
    job_type = COALESCE(p_job_type, job_type),
    updated_at = now()
  WHERE id = p_job_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Job with ID % not found', p_job_id;
  END IF;
END;
$$;