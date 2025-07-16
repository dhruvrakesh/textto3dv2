-- Fix t3d schema issues and add missing columns

-- Add user_id column to t3d.jobs table
ALTER TABLE t3d.jobs ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- Rename result_uri to result_url for consistency
ALTER TABLE t3d.jobs RENAME COLUMN result_uri TO result_url;

-- Create function to safely query t3d jobs with user authentication
CREATE OR REPLACE FUNCTION public.get_user_jobs_safe(p_user_id UUID)
RETURNS TABLE(
  id UUID,
  prompt_id UUID,
  user_id UUID,
  status TEXT,
  progress INTEGER,
  result_url TEXT,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  prompt_data JSONB
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
    j.error_message,
    j.created_at,
    j.updated_at,
    row_to_json(p.*)::JSONB as prompt_data
  FROM t3d.jobs j
  LEFT JOIN t3d.prompts p ON j.prompt_id = p.id
  WHERE j.user_id = p_user_id
  ORDER BY j.created_at DESC;
END;
$$;

-- Update existing jobs to have user_id from prompts table
UPDATE t3d.jobs 
SET user_id = (
  SELECT user_id 
  FROM t3d.prompts 
  WHERE t3d.prompts.id = t3d.jobs.prompt_id
)
WHERE user_id IS NULL;

-- Create RLS policies for t3d.jobs
ALTER TABLE t3d.jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own jobs" ON t3d.jobs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own jobs" ON t3d.jobs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own jobs" ON t3d.jobs
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for t3d.prompts
ALTER TABLE t3d.prompts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own prompts" ON t3d.prompts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own prompts" ON t3d.prompts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own prompts" ON t3d.prompts
  FOR UPDATE USING (auth.uid() = user_id);