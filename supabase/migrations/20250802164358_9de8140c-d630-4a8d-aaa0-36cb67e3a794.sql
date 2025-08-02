-- CORRECTED MIGRATION: Complete Database Function Cleanup and Fixes
-- ERROR: Function t3d.update_job_status doesn't exist, need to create the missing t3d functions first

-- PHASE 1: Complete Database Function Cleanup  
-- Drop ALL duplicate functions from public schema
DROP FUNCTION IF EXISTS public.create_t3d_job(text, text, text, text, text, text);
DROP FUNCTION IF EXISTS public.create_t3d_job(text, text, text, text, text);
DROP FUNCTION IF EXISTS public.create_t3d_job(text, text, text, text);
DROP FUNCTION IF EXISTS public.update_t3d_job(uuid, text, integer, text, text);
DROP FUNCTION IF EXISTS public.update_t3d_job(uuid, text, integer, text);
DROP FUNCTION IF EXISTS public.update_t3d_job(uuid, text, integer);
DROP FUNCTION IF EXISTS public.get_t3d_prompts(uuid, text, text, text, text, text);

-- PHASE 2: Create Missing t3d Schema Functions
-- Create t3d.update_t3d_job function (this was missing)
CREATE OR REPLACE FUNCTION t3d.update_t3d_job(
  p_job_id uuid,
  p_status text,
  p_progress integer,
  p_result_url text DEFAULT NULL,
  p_job_type text DEFAULT 'text_to_3d'
) RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  UPDATE t3d.jobs 
  SET 
    status = p_status,
    progress = p_progress,
    result_url = COALESCE(p_result_url, result_url),
    job_type = COALESCE(p_job_type, job_type),
    updated_at = now()
  WHERE id = p_job_id;
  
  RETURN FOUND;
END;
$$;

-- Ensure t3d.create_t3d_job returns progress as integer (not numeric)
CREATE OR REPLACE FUNCTION t3d.create_t3d_job(
  p_prompt_id uuid,
  p_user_id uuid,
  p_selected_model text,
  p_selected_service text,
  p_quality_level text,
  p_job_type text
) RETURNS TABLE(
  id uuid,
  prompt_id uuid,
  user_id uuid,
  status text,
  progress integer,  -- Integer not numeric
  result_url text,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  selected_model text,
  selected_service text,
  quality_level text,
  job_type text
) LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  new_job_id uuid;
BEGIN
  INSERT INTO t3d.jobs (
    prompt_id,
    user_id,
    status,
    progress,
    selected_model,
    selected_service,
    quality_level,
    job_type
  ) VALUES (
    p_prompt_id,
    p_user_id,
    'queued',
    0,  -- Integer value
    p_selected_model,
    p_selected_service,
    p_quality_level,
    p_job_type
  ) RETURNING jobs.id INTO new_job_id;

  RETURN QUERY
  SELECT 
    j.id,
    j.prompt_id,
    j.user_id,
    j.status,
    j.progress::integer,  -- Cast to integer
    j.result_url,
    j.created_at,
    j.updated_at,
    j.selected_model,
    j.selected_service,
    j.quality_level,
    j.job_type
  FROM t3d.jobs j
  WHERE j.id = new_job_id;
END;
$$;

-- PHASE 3: Create Clean Public Schema Wrappers
-- Create public.create_t3d_job wrapper with proper security
CREATE OR REPLACE FUNCTION public.create_t3d_job(
  p_prompt_id uuid,
  p_user_id uuid,
  p_selected_model text,
  p_selected_service text,
  p_quality_level text,
  p_job_type text
) RETURNS TABLE(
  id uuid,
  prompt_id uuid,
  user_id uuid,
  status text,
  progress integer,
  result_url text,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  selected_model text,
  selected_service text,
  quality_level text,
  job_type text
) LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  -- Verify user authentication and ownership
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;
  
  IF auth.uid() != p_user_id THEN
    RAISE EXCEPTION 'Insufficient permissions';
  END IF;

  RETURN QUERY
  SELECT * FROM t3d.create_t3d_job(
    p_prompt_id,
    p_user_id,
    p_selected_model,
    p_selected_service,
    p_quality_level,
    p_job_type
  );
END;
$$;

-- Create public.update_t3d_job wrapper
CREATE OR REPLACE FUNCTION public.update_t3d_job(
  p_job_id uuid,
  p_status text,
  p_progress integer,
  p_result_url text DEFAULT NULL,
  p_job_type text DEFAULT 'text_to_3d'
) RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  RETURN t3d.update_t3d_job(p_job_id, p_status, p_progress, p_result_url, p_job_type);
END;
$$;