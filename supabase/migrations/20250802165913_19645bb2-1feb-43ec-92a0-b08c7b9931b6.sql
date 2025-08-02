-- Create public wrapper function for get_t3d_jobs that calls t3d.get_user_jobs
CREATE OR REPLACE FUNCTION public.get_t3d_jobs(p_user_id uuid)
RETURNS TABLE(
  id uuid,
  user_id uuid,
  prompt_id uuid,
  status text,
  progress integer,
  result_url text,
  error_message text,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  job_id text,
  service_name text,
  model_name text,
  parameters jsonb
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Call the t3d schema function
  RETURN QUERY SELECT * FROM t3d.get_user_jobs(p_user_id);
END;
$$;