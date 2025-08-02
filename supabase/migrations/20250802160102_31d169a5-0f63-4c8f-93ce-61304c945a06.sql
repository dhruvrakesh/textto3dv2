-- Fix the existing RPC functions and add missing database constraints

-- First, fix the get_t3d_prompts function to use correct column name
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
    p.json as prompt_json,  -- Use correct column name 'json'
    p.created_at,
    p.updated_at
  FROM t3d.prompts p
  WHERE p.id = ANY(prompt_ids);
END;
$$;

-- Drop any duplicate create_t3d_job functions in public schema
DROP FUNCTION IF EXISTS public.create_t3d_job(UUID, UUID, TEXT, TEXT, TEXT);
DROP FUNCTION IF EXISTS public.create_t3d_job(p_prompt_id UUID, p_user_id UUID, p_selected_model TEXT, p_selected_service TEXT, p_quality_level TEXT);

-- Create clean RPC wrapper for create_t3d_prompt
CREATE OR REPLACE FUNCTION public.create_t3d_prompt(p_user_id UUID, p_version INTEGER, p_json JSONB)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, t3d
AS $$
DECLARE
  new_prompt_id UUID;
BEGIN
  INSERT INTO t3d.prompts (user_id, version, json)  -- Use correct column name 'json'
  VALUES (p_user_id, p_version, p_json)
  RETURNING id INTO new_prompt_id;
  
  RETURN jsonb_build_object('id', new_prompt_id);
EXCEPTION WHEN OTHERS THEN
  RAISE LOG 'Error in create_t3d_prompt: %', SQLERRM;
  RAISE;
END;
$$;

-- Create clean RPC wrapper for create_t3d_job
CREATE OR REPLACE FUNCTION public.create_t3d_job(p_prompt_id UUID, p_user_id UUID, p_selected_model TEXT, p_selected_service TEXT, p_quality_level TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, t3d
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
    quality_level,
    created_at,
    updated_at
  ) VALUES (
    p_prompt_id,
    p_user_id,
    'queued',
    0,
    'text_to_3d',
    p_selected_model,
    p_selected_service,
    p_quality_level,
    NOW(),
    NOW()
  )
  RETURNING id INTO new_job_id;
  
  RETURN jsonb_build_object('id', new_job_id);
EXCEPTION WHEN OTHERS THEN
  RAISE LOG 'Error in create_t3d_job: %', SQLERRM;
  RAISE;
END;
$$;

-- Create update_t3d_job function
CREATE OR REPLACE FUNCTION public.update_t3d_job(p_job_id UUID, p_status TEXT, p_progress INTEGER DEFAULT NULL, p_error_message TEXT DEFAULT NULL, p_result_url TEXT DEFAULT NULL, p_replicate_prediction_id TEXT DEFAULT NULL)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, t3d
AS $$
BEGIN
  UPDATE t3d.jobs 
  SET 
    status = p_status,
    progress = COALESCE(p_progress, progress),
    error_message = COALESCE(p_error_message, error_message),
    result_url = COALESCE(p_result_url, result_url),
    replicate_prediction_id = COALESCE(p_replicate_prediction_id, replicate_prediction_id),
    updated_at = NOW()
  WHERE id = p_job_id;
  
  RETURN FOUND;
EXCEPTION WHEN OTHERS THEN
  RAISE LOG 'Error in update_t3d_job: %', SQLERRM;
  RAISE;
END;
$$;

-- Add missing foreign key constraints if they don't exist
DO $$ 
BEGIN
  -- Add foreign key from t3d.jobs.prompt_id to t3d.prompts.id
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'jobs_prompt_id_fkey' 
    AND table_schema = 't3d' 
    AND table_name = 'jobs'
  ) THEN
    ALTER TABLE t3d.jobs 
    ADD CONSTRAINT jobs_prompt_id_fkey 
    FOREIGN KEY (prompt_id) REFERENCES t3d.prompts(id) ON DELETE CASCADE;
  END IF;

  -- Add foreign key from t3d.jobs.user_id to auth.users.id
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'jobs_user_id_fkey' 
    AND table_schema = 't3d' 
    AND table_name = 'jobs'
  ) THEN
    ALTER TABLE t3d.jobs 
    ADD CONSTRAINT jobs_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;

  -- Add foreign key from t3d.prompts.user_id to auth.users.id
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'prompts_user_id_fkey' 
    AND table_schema = 't3d' 
    AND table_name = 'prompts'
  ) THEN
    ALTER TABLE t3d.prompts 
    ADD CONSTRAINT prompts_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;