-- Fix parameter type mismatch in public.update_job_status wrapper function
-- Drop the existing function with incorrect parameter types
DROP FUNCTION IF EXISTS public.update_job_status(uuid, text, numeric, text, text);

-- Recreate the function with correct parameter types to match t3d.update_job_status
CREATE OR REPLACE FUNCTION public.update_job_status(
  p_job_id uuid,
  p_status text,
  p_progress integer DEFAULT NULL,  -- Changed from numeric to integer
  p_result_url text DEFAULT NULL,
  p_error_message text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  PERFORM t3d.update_job_status(p_job_id, p_status, p_progress, p_result_url, p_error_message);
END;
$$;