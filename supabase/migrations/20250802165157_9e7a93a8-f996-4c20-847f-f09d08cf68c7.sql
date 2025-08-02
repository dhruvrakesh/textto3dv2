-- FINAL CORRECTED MIGRATION: Complete Database Function Cleanup
-- Drop functions with their exact signatures first, then recreate

-- PHASE 1: Drop ALL functions with exact signatures
DROP FUNCTION IF EXISTS public.create_t3d_job(uuid, uuid, text, text, text, text);
DROP FUNCTION IF EXISTS public.update_t3d_job(uuid, text, integer, text, text);
DROP FUNCTION IF EXISTS public.update_t3d_job(uuid, text, integer, text);
DROP FUNCTION IF EXISTS public.update_t3d_job(uuid, text, integer);
DROP FUNCTION IF EXISTS public.get_t3d_jobs(uuid);
DROP FUNCTION IF EXISTS t3d.create_t3d_job(uuid, uuid, text, text, text, text);

-- PHASE 2: Create missing t3d.update_t3d_job function
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

-- Create missing t3d.get_user_jobs function (called by get-user-jobs edge function)
CREATE OR REPLACE FUNCTION t3d.get_user_jobs(p_user_id uuid)
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
    j.job_type,
    COALESCE(p.prompt_text, '') as prompt_text,
    COALESCE(p.prompt_data, '{}'::jsonb) as prompt_data
  FROM t3d.jobs j
  LEFT JOIN t3d.prompts p ON j.prompt_id = p.id
  WHERE j.user_id = p_user_id
  ORDER BY j.created_at DESC;
END;
$$;

-- Recreate t3d.create_t3d_job with integer progress
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
    0,
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

-- PHASE 3: Create clean public wrappers
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