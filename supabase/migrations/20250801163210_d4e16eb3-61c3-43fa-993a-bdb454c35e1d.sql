-- Create RPC function to get t3d jobs
CREATE OR REPLACE FUNCTION public.get_t3d_jobs(p_user_id uuid)
RETURNS TABLE (
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
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT 
    id,
    prompt_id,
    user_id,
    status,
    progress,
    result_url,
    job_type,
    error_message,
    created_at,
    updated_at
  FROM t3d.jobs
  WHERE user_id = p_user_id
  ORDER BY created_at DESC;
$$;

-- Create RPC function to get t3d prompts
CREATE OR REPLACE FUNCTION public.get_t3d_prompts(prompt_ids uuid[])
RETURNS TABLE (
  id uuid,
  user_id uuid,
  version integer,
  prompt_json jsonb,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT 
    id,
    user_id,
    version,
    json as prompt_json,
    created_at,
    updated_at
  FROM t3d.prompts
  WHERE id = ANY(prompt_ids);
$$;