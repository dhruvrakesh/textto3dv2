-- Drop and recreate the get_user_jobs_safe function with proper implementation
DROP FUNCTION IF EXISTS public.get_user_jobs_safe(uuid);

CREATE OR REPLACE FUNCTION public.get_user_jobs_safe(p_user_id uuid)
RETURNS TABLE(
  id uuid,
  prompt_id uuid, 
  user_id uuid,
  status text,
  progress integer,
  result_url text,
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
    j.created_at,
    j.updated_at,
    row_to_json(p.*)::jsonb as prompt_data
  FROM t3d.jobs j
  LEFT JOIN t3d.prompts p ON j.prompt_id = p.id
  WHERE j.user_id = p_user_id
  ORDER BY j.created_at DESC;
END;
$$;

-- Ensure RLS is properly configured for service role access
ALTER TABLE t3d.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE t3d.prompts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user access
DROP POLICY IF EXISTS "Users can manage their own jobs" ON t3d.jobs;
CREATE POLICY "Users can manage their own jobs" ON t3d.jobs
FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage their own prompts" ON t3d.prompts;  
CREATE POLICY "Users can manage their own prompts" ON t3d.prompts
FOR ALL USING (auth.uid() = user_id);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA t3d TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA t3d TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_user_jobs_safe(uuid) TO anon, authenticated, service_role;