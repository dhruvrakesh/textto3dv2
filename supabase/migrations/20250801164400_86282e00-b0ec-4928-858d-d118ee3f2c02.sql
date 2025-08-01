-- Add foreign key constraints for data integrity
ALTER TABLE t3d.jobs 
ADD CONSTRAINT jobs_prompt_id_fkey 
FOREIGN KEY (prompt_id) REFERENCES t3d.prompts(id) ON DELETE CASCADE;

ALTER TABLE t3d.jobs 
ADD CONSTRAINT jobs_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE t3d.prompts 
ADD CONSTRAINT prompts_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add indexes for better performance on foreign key columns
CREATE INDEX IF NOT EXISTS idx_jobs_prompt_id ON t3d.jobs(prompt_id);
CREATE INDEX IF NOT EXISTS idx_jobs_user_id ON t3d.jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_prompts_user_id ON t3d.prompts(user_id);
CREATE INDEX IF NOT EXISTS idx_jobs_replicate_prediction_id ON t3d.jobs(replicate_prediction_id);

-- Update get_t3d_jobs function to use proper column names and return correct structure
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
  updated_at timestamptz,
  replicate_prediction_id text
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
    updated_at,
    replicate_prediction_id
  FROM t3d.jobs
  WHERE user_id = p_user_id
  ORDER BY created_at DESC;
$$;

-- Update get_t3d_prompts function for consistency
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