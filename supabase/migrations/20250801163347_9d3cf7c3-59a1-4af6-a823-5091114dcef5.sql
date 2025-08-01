-- Create RPC function to create t3d prompt
CREATE OR REPLACE FUNCTION public.create_t3d_prompt(
  p_user_id uuid,
  p_version integer,
  p_json jsonb
)
RETURNS TABLE (
  id uuid,
  user_id uuid,
  version integer,
  json jsonb,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  INSERT INTO t3d.prompts (user_id, version, json)
  VALUES (p_user_id, p_version, p_json)
  RETURNING id, user_id, version, json, created_at, updated_at;
$$;

-- Create RPC function to create t3d job
CREATE OR REPLACE FUNCTION public.create_t3d_job(
  p_prompt_id uuid,
  p_user_id uuid,
  p_status text,
  p_progress integer,
  p_job_type text
)
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
  INSERT INTO t3d.jobs (prompt_id, user_id, status, progress, job_type)
  VALUES (p_prompt_id, p_user_id, p_status, p_progress, p_job_type)
  RETURNING id, prompt_id, user_id, status, progress, result_url, job_type, error_message, created_at, updated_at;
$$;

-- Create RPC function to update t3d job
CREATE OR REPLACE FUNCTION public.update_t3d_job(
  p_job_id uuid,
  p_status text DEFAULT NULL,
  p_progress integer DEFAULT NULL,
  p_result_url text DEFAULT NULL,
  p_error_message text DEFAULT NULL,
  p_replicate_prediction_id text DEFAULT NULL
)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  UPDATE t3d.jobs 
  SET 
    status = COALESCE(p_status, status),
    progress = COALESCE(p_progress, progress),
    result_url = COALESCE(p_result_url, result_url),
    error_message = COALESCE(p_error_message, error_message),
    replicate_prediction_id = COALESCE(p_replicate_prediction_id, replicate_prediction_id),
    updated_at = now()
  WHERE id = p_job_id;
  
  SELECT true;
$$;

-- Create RPC function to find job by replicate prediction ID
CREATE OR REPLACE FUNCTION public.find_t3d_job_by_prediction(p_prediction_id text)
RETURNS TABLE (
  id uuid,
  status text,
  user_id uuid
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT id, status, user_id
  FROM t3d.jobs
  WHERE replicate_prediction_id = p_prediction_id
  LIMIT 1;
$$;

-- Create RPC function to get t3d job by id
CREATE OR REPLACE FUNCTION public.get_t3d_job_by_id(p_job_id uuid)
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
  WHERE id = p_job_id;
$$;

-- Create RPC function to get t3d prompt by id
CREATE OR REPLACE FUNCTION public.get_t3d_prompt_by_id(p_prompt_id uuid)
RETURNS TABLE (
  id uuid,
  user_id uuid,
  version integer,
  json jsonb,
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
    json,
    created_at,
    updated_at
  FROM t3d.prompts
  WHERE id = p_prompt_id;
$$;