-- Fix get_user_jobs_safe function to match actual t3d.jobs schema
DROP FUNCTION IF EXISTS public.get_user_jobs_safe(uuid);

CREATE OR REPLACE FUNCTION public.get_user_jobs_safe(p_user_id uuid)
RETURNS TABLE(
  id uuid,
  prompt_id uuid, 
  user_id uuid,
  status text,
  progress numeric,
  result_url text,
  job_type text,
  error_message text,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  prompt_data jsonb
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
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
    j.updated_at,
    row_to_json(p.*)::jsonb as prompt_data
  FROM t3d.jobs j
  LEFT JOIN t3d.prompts p ON j.prompt_id = p.id
  WHERE j.user_id = p_user_id
  ORDER BY j.created_at DESC;
END;
$$;