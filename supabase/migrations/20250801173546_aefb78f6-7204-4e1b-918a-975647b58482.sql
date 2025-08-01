-- Fix the database function parameter order mismatch
-- The error shows that t3d.create_t3d_job doesn't exist with the expected signature

-- First, let's check what the actual t3d.create_t3d_job function signature is
-- and fix the public wrapper to match what the edge function is calling

-- Drop the incorrect wrapper
DROP FUNCTION IF EXISTS public.create_t3d_job(text, integer, uuid, text, text, text, text, uuid);

-- Create the correct wrapper that matches the edge function call pattern
-- Based on the error logs, the edge function is calling with specific parameters
CREATE OR REPLACE FUNCTION public.create_t3d_job(
  p_job_type text,
  p_progress integer,
  p_prompt_id uuid,
  p_quality_level text,
  p_selected_model text,
  p_selected_service text,
  p_status text,
  p_user_id uuid
) RETURNS TABLE(
  id uuid,
  prompt_id uuid,
  user_id uuid,
  status text,
  progress integer,
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
  -- Call the t3d schema function and return the full job object
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