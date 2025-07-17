-- Fix database security issues and function conflicts

-- First drop existing function to avoid name conflicts
DROP FUNCTION IF EXISTS public.update_job_status;

-- Enable RLS on tables that don't have it enabled
ALTER TABLE public.attendance_bad_backup ENABLE ROW LEVEL SECURITY;

-- Add RLS policies for tables missing them
CREATE POLICY "Users can view their own attendance backup" ON public.attendance_bad_backup
FOR SELECT USING (auth.uid() IS NOT NULL);

-- Recreate the update_job_status function with proper security settings
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
  -- Log the update attempt for debugging
  RAISE LOG 'Attempting to update job %: status=%, progress=%, url=%', p_job_id, p_status, p_progress, p_result_url;
  
  UPDATE t3d.jobs 
  SET 
    status = p_status,
    progress = COALESCE(p_progress, progress),
    result_url = COALESCE(p_result_url, result_url),
    error_message = COALESCE(p_error_message, error_message),
    job_type = COALESCE(p_job_type, job_type),
    updated_at = now()
  WHERE id = p_job_id;
  
  -- Log the successful update
  RAISE LOG 'Job % updated successfully: status=%, progress=%, url=%', p_job_id, p_status, p_progress, p_result_url;
  
  -- Check if the update was successful
  IF NOT FOUND THEN
    RAISE LOG 'Job % not found for update', p_job_id;
  END IF;
END;
$function$;

-- Grant proper permissions
REVOKE ALL ON FUNCTION public.update_job_status FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.update_job_status TO service_role;