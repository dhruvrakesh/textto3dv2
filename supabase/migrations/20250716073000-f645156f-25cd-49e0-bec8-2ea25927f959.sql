-- Add missing error_message column to t3d.jobs table
ALTER TABLE t3d.jobs ADD COLUMN IF NOT EXISTS error_message TEXT;

-- Fix RLS policies for t3d schema to allow service role operations
-- Drop existing restrictive policies and create service-role friendly ones

-- For t3d.prompts table
DROP POLICY IF EXISTS "Users can manage their own prompts" ON t3d.prompts;
CREATE POLICY "Users can manage their own prompts" ON t3d.prompts
FOR ALL USING (
  auth.uid() = user_id OR 
  auth.jwt() ->> 'role' = 'service_role'
);

-- For t3d.jobs table  
DROP POLICY IF EXISTS "Users can manage their own jobs" ON t3d.jobs;
CREATE POLICY "Users can manage their own jobs" ON t3d.jobs
FOR ALL USING (
  auth.uid() = user_id OR 
  auth.jwt() ->> 'role' = 'service_role'
);

-- Alternative approach: Create service definer functions for edge function operations
CREATE OR REPLACE FUNCTION t3d.create_prompt_and_job(
  p_user_id UUID,
  p_prompt_data JSONB,
  p_job_type TEXT DEFAULT '3d_model_generation'
)
RETURNS TABLE(prompt_id UUID, job_id UUID)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_prompt_id UUID;
  v_job_id UUID;
BEGIN
  -- Insert prompt
  INSERT INTO t3d.prompts (user_id, json, version)
  VALUES (p_user_id, p_prompt_data, 1)
  RETURNING id INTO v_prompt_id;
  
  -- Insert job
  INSERT INTO t3d.jobs (prompt_id, user_id, job_type, status, progress)
  VALUES (v_prompt_id, p_user_id, p_job_type, 'queued', 0)
  RETURNING id INTO v_job_id;
  
  RETURN QUERY SELECT v_prompt_id, v_job_id;
END;
$$;

CREATE OR REPLACE FUNCTION t3d.update_job_status(
  p_job_id UUID,
  p_status TEXT,
  p_progress INTEGER DEFAULT NULL,
  p_result_url TEXT DEFAULT NULL,
  p_error_message TEXT DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE t3d.jobs
  SET 
    status = p_status,
    progress = COALESCE(p_progress, progress),
    result_url = COALESCE(p_result_url, result_url),
    error_message = COALESCE(p_error_message, error_message),
    updated_at = NOW()
  WHERE id = p_job_id;
END;
$$;