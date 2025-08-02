-- PHASE 1: Complete Database Function Cleanup
-- Drop ALL duplicate functions from public schema

-- Drop all create_t3d_job variants from public schema
DROP FUNCTION IF EXISTS public.create_t3d_job(text, text, text, text, text, text);
DROP FUNCTION IF EXISTS public.create_t3d_job(text, text, text, text, text);
DROP FUNCTION IF EXISTS public.create_t3d_job(text, text, text, text);

-- Drop all update_t3d_job variants from public schema  
DROP FUNCTION IF EXISTS public.update_t3d_job(uuid, text, integer, text, text);
DROP FUNCTION IF EXISTS public.update_t3d_job(uuid, text, integer, text);
DROP FUNCTION IF EXISTS public.update_t3d_job(uuid, text, integer);

-- Drop duplicate get_t3d_prompts functions, keep only correct one
DROP FUNCTION IF EXISTS public.get_t3d_prompts(uuid, text, text, text, text, text);

-- PHASE 2: Fix t3d Schema Function Alignment
-- Rename update_job_status to update_t3d_job for consistency
ALTER FUNCTION t3d.update_job_status(uuid, text, integer, text, text) RENAME TO update_t3d_job;

-- Fix t3d.create_t3d_job to return progress as integer
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
  progress integer,  -- Changed from numeric to integer
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
    j.progress,
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
-- Create public.create_t3d_job wrapper
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

-- Ensure public.get_t3d_jobs wrapper exists and is correct
CREATE OR REPLACE FUNCTION public.get_t3d_jobs(p_user_id uuid)
RETURNS TABLE(
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
  job_type text,
  prompt_text text,
  prompt_data jsonb
) LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM t3d.get_user_jobs(p_user_id);
END;
$$;