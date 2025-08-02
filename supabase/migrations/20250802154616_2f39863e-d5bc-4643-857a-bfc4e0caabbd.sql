-- Create the t3d schema for 3D-related functionality
CREATE SCHEMA IF NOT EXISTS t3d;

-- Create the jobs table in the t3d schema
CREATE TABLE IF NOT EXISTS t3d.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id UUID NOT NULL,
  user_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'queued',
  progress INTEGER DEFAULT 0,
  result_url TEXT,
  job_type TEXT NOT NULL DEFAULT '3d_model_generation',
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  replicate_prediction_id TEXT,
  selected_model TEXT DEFAULT 'auto',
  selected_service TEXT DEFAULT 'auto',
  quality_level TEXT DEFAULT 'standard'
);

-- Create the prompts table in the t3d schema
CREATE TABLE IF NOT EXISTS t3d.prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  version INTEGER DEFAULT 1,
  prompt_json JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE t3d.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE t3d.prompts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for jobs
CREATE POLICY "Users can view their own jobs" ON t3d.jobs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own jobs" ON t3d.jobs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own jobs" ON t3d.jobs
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for prompts
CREATE POLICY "Users can view their own prompts" ON t3d.prompts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own prompts" ON t3d.prompts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RPC function to create a prompt
CREATE OR REPLACE FUNCTION t3d.create_t3d_prompt(
  p_user_id UUID,
  p_version INTEGER,
  p_json JSONB
)
RETURNS t3d.prompts
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_prompt t3d.prompts;
BEGIN
  INSERT INTO t3d.prompts (user_id, version, prompt_json)
  VALUES (p_user_id, p_version, p_json)
  RETURNING * INTO new_prompt;
  
  RETURN new_prompt;
END;
$$;

-- Create RPC function to create a job
CREATE OR REPLACE FUNCTION t3d.create_t3d_job(
  p_prompt_id UUID,
  p_user_id UUID,
  p_status TEXT,
  p_progress INTEGER,
  p_job_type TEXT,
  p_selected_model TEXT DEFAULT 'auto',
  p_selected_service TEXT DEFAULT 'auto',
  p_quality_level TEXT DEFAULT 'standard'
)
RETURNS t3d.jobs
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_job t3d.jobs;
BEGIN
  INSERT INTO t3d.jobs (
    prompt_id, 
    user_id, 
    status, 
    progress, 
    job_type,
    selected_model,
    selected_service,
    quality_level
  )
  VALUES (
    p_prompt_id, 
    p_user_id, 
    p_status, 
    p_progress, 
    p_job_type,
    p_selected_model,
    p_selected_service,
    p_quality_level
  )
  RETURNING * INTO new_job;
  
  RETURN new_job;
END;
$$;

-- Create RPC function to update a job
CREATE OR REPLACE FUNCTION t3d.update_t3d_job(
  p_job_id UUID,
  p_status TEXT DEFAULT NULL,
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
    status = COALESCE(p_status, status),
    progress = COALESCE(p_progress, progress),
    result_url = COALESCE(p_result_url, result_url),
    error_message = COALESCE(p_error_message, error_message),
    updated_at = now()
  WHERE id = p_job_id;
END;
$$;

-- Create RPC function to retry a job
CREATE OR REPLACE FUNCTION t3d.retry_job(
  p_job_id UUID,
  p_user_id UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE t3d.jobs 
  SET 
    status = 'queued',
    progress = 0,
    error_message = NULL,
    updated_at = now()
  WHERE id = p_job_id AND user_id = p_user_id;
  
  RETURN FOUND;
END;
$$;

-- Create RPC function to process queued jobs
CREATE OR REPLACE FUNCTION t3d.process_queued_jobs()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- This function can be expanded to handle job processing logic
  -- For now, it's a placeholder that can be called by the process-jobs function
  RAISE LOG 'Processing queued jobs...';
END;
$$;

-- Create public wrapper functions that the edge functions can call
CREATE OR REPLACE FUNCTION public.create_t3d_prompt(
  p_user_id UUID,
  p_version INTEGER,
  p_json JSONB
)
RETURNS t3d.prompts
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN t3d.create_t3d_prompt(p_user_id, p_version, p_json);
END;
$$;

CREATE OR REPLACE FUNCTION public.create_t3d_job(
  p_prompt_id UUID,
  p_user_id UUID,
  p_status TEXT,
  p_progress INTEGER,
  p_job_type TEXT,
  p_selected_model TEXT DEFAULT 'auto',
  p_selected_service TEXT DEFAULT 'auto',
  p_quality_level TEXT DEFAULT 'standard'
)
RETURNS t3d.jobs
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN t3d.create_t3d_job(
    p_prompt_id, 
    p_user_id, 
    p_status, 
    p_progress, 
    p_job_type,
    p_selected_model,
    p_selected_service,
    p_quality_level
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.update_t3d_job(
  p_job_id UUID,
  p_status TEXT DEFAULT NULL,
  p_progress INTEGER DEFAULT NULL,
  p_result_url TEXT DEFAULT NULL,
  p_error_message TEXT DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  PERFORM t3d.update_t3d_job(p_job_id, p_status, p_progress, p_result_url, p_error_message);
END;
$$;