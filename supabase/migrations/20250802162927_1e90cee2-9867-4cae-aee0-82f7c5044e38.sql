-- Drop the existing get_t3d_jobs function first
DROP FUNCTION IF EXISTS public.get_t3d_jobs(uuid);

-- Now recreate it with the correct signature
CREATE OR REPLACE FUNCTION public.get_t3d_jobs(p_user_id UUID)
RETURNS TABLE(
  id UUID,
  prompt_id UUID,
  user_id UUID,
  status TEXT,
  progress INTEGER,
  result_url TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  selected_model TEXT,
  selected_service TEXT,
  quality_level TEXT,
  job_type TEXT,
  prompt_text TEXT,
  prompt_data JSONB
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM t3d.get_user_jobs(p_user_id);
END;
$$;