-- Create RPC function to get user jobs from t3d schema
CREATE OR REPLACE FUNCTION public.get_t3d_jobs(p_user_id UUID)
RETURNS TABLE(
  id UUID,
  prompt_id UUID,
  user_id UUID,
  status TEXT,
  progress INTEGER,
  result_url TEXT,
  job_type TEXT,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  replicate_prediction_id TEXT,
  selected_model TEXT,
  selected_service TEXT,
  quality_level TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, t3d
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
    j.replicate_prediction_id,
    j.selected_model,
    j.selected_service,
    j.quality_level
  FROM t3d.jobs j
  WHERE j.user_id = p_user_id
  ORDER BY j.created_at DESC;
END;
$$;

-- Create RPC function to get prompts by IDs from t3d schema
CREATE OR REPLACE FUNCTION public.get_t3d_prompts(prompt_ids UUID[])
RETURNS TABLE(
  id UUID,
  user_id UUID,
  version INTEGER,
  prompt_json JSONB,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, t3d
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.user_id,
    p.version,
    p.prompt_json,
    p.created_at,
    p.updated_at
  FROM t3d.prompts p
  WHERE p.id = ANY(prompt_ids);
END;
$$;