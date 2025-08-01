-- Fix database function parameter order mismatch
-- The process-prompt edge function calls create_t3d_job with specific parameter names
-- We need to match the exact parameter order expected by the edge function

-- Drop all existing versions of the public wrapper to avoid conflicts
DROP FUNCTION IF EXISTS public.create_t3d_job(text, integer, uuid, text, text, text, text, uuid);
DROP FUNCTION IF EXISTS public.create_t3d_job(uuid, uuid, text, integer, text, text, text, text);

-- Create the correct wrapper that matches the edge function call pattern
-- Edge function calls with: p_prompt_id, p_user_id, p_status, p_progress, p_job_type, p_selected_model, p_selected_service, p_quality_level
CREATE OR REPLACE FUNCTION public.create_t3d_job(
  p_prompt_id uuid,
  p_user_id uuid,
  p_status text,
  p_progress numeric,
  p_job_type text,
  p_selected_model text,
  p_selected_service text,
  p_quality_level text
) RETURNS TABLE(
  id uuid,
  prompt_id uuid,
  user_id uuid,
  status text,
  progress numeric,
  result_url text,
  job_type text,
  error_message text,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Call the t3d schema function with correct parameter mapping
  RETURN QUERY
  SELECT 
    j.id,
    j.prompt_id,
    j.user_id,
    j.status,
    j.progress,
    j.result_url,
    j.job_type,
    j.error_message,
    j.created_at,
    j.updated_at
  FROM t3d.create_t3d_job(
    p_job_type,
    p_progress,
    p_prompt_id,
    p_quality_level,
    p_selected_model,
    p_selected_service,
    p_status,
    p_user_id
  ) j;
END;
$$;