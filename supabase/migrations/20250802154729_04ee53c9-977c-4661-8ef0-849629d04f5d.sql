-- Drop and recreate the RPC functions to ensure they work correctly
DROP FUNCTION IF EXISTS public.create_t3d_prompt(UUID, INTEGER, JSONB);
DROP FUNCTION IF EXISTS public.create_t3d_job(UUID, UUID, TEXT, INTEGER, TEXT, TEXT, TEXT, TEXT);
DROP FUNCTION IF EXISTS public.update_t3d_job(UUID, TEXT, INTEGER, TEXT, TEXT);

-- Create RPC function to create a prompt
CREATE OR REPLACE FUNCTION public.create_t3d_prompt(
  p_user_id UUID,
  p_version INTEGER,
  p_json JSONB
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_prompt_id UUID;
BEGIN
  INSERT INTO t3d.prompts (user_id, version, prompt_json)
  VALUES (p_user_id, p_version, p_json)
  RETURNING id INTO new_prompt_id;
  
  RETURN jsonb_build_object('id', new_prompt_id);
END;
$$;

-- Create RPC function to create a job
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
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_job_id UUID;
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
  RETURNING id INTO new_job_id;
  
  RETURN jsonb_build_object('id', new_job_id);
END;
$$;

-- Create RPC function to update a job
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