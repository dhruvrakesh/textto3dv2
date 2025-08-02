-- Fix critical database schema issues for t3d system

-- Step 1: Fix the core data type issue (progress column)
ALTER TABLE t3d.jobs ALTER COLUMN progress TYPE integer USING ROUND(progress);

-- Step 2: Clean up all duplicate functions in public schema
DROP FUNCTION IF EXISTS public.create_t3d_job(uuid, uuid, text, text, text, text);
DROP FUNCTION IF EXISTS public.create_t3d_job(uuid, uuid, text, text, text);
DROP FUNCTION IF EXISTS public.create_t3d_job(uuid, uuid, text, text);
DROP FUNCTION IF EXISTS public.create_t3d_job(uuid, uuid, text);
DROP FUNCTION IF EXISTS public.update_t3d_job(uuid, text, integer, text, text);
DROP FUNCTION IF EXISTS public.update_t3d_job(uuid, text, integer, text);
DROP FUNCTION IF EXISTS public.update_t3d_job(uuid, text, integer);

-- Step 3: Create clean, single-instance RPC wrapper functions
CREATE OR REPLACE FUNCTION public.create_t3d_job(
  p_prompt_id uuid,
  p_user_id uuid,
  p_job_type text DEFAULT 'text_to_3d',
  p_selected_model text DEFAULT 'auto',
  p_selected_service text DEFAULT 'auto',
  p_quality_level text DEFAULT 'standard'
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, t3d
AS $$
BEGIN
  RETURN t3d.create_t3d_job(p_prompt_id, p_user_id, p_job_type, p_selected_model, p_selected_service, p_quality_level);
END;
$$;

CREATE OR REPLACE FUNCTION public.update_t3d_job(
  p_job_id uuid,
  p_status text,
  p_progress integer DEFAULT NULL,
  p_result_url text DEFAULT NULL,
  p_error_message text DEFAULT NULL
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, t3d
AS $$
BEGIN
  RETURN t3d.update_t3d_job(p_job_id, p_status, p_progress, p_result_url, p_error_message);
END;
$$;

-- Step 4: Update get_t3d_jobs function to return integer for progress
CREATE OR REPLACE FUNCTION public.get_t3d_jobs(p_user_id uuid)
RETURNS TABLE(
  id uuid, 
  prompt_id uuid, 
  user_id uuid, 
  status text, 
  progress integer, 
  result_url text, 
  job_type text, 
  error_message text, 
  created_at timestamp with time zone, 
  updated_at timestamp with time zone, 
  replicate_prediction_id text, 
  selected_model text, 
  selected_service text, 
  quality_level text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public', 't3d'
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    j.id,
    j.prompt_id,
    j.user_id,
    j.status,
    j.progress, -- Now correctly returns integer
    j.result_url,
    j.job_type,
    j.error_message,
    j.created_at,
    j.updated_at,
    j.replicate_prediction_id,
    j.selected_model,
    j.selected_service,
    j.quality_level
  FROM t3d.jobs j
  WHERE j.user_id = p_user_id
  ORDER BY j.created_at DESC;
END;
$$;

-- Step 5: Fix get_t3d_prompts function to use correct column name
CREATE OR REPLACE FUNCTION public.get_t3d_prompts(p_user_id uuid)
RETURNS TABLE(
  id uuid,
  user_id uuid,
  space text,
  style text,
  space_type text,
  description text,
  color_scheme text[],
  dimensions_mm jsonb,
  mood_keywords text[],
  uploaded_refs text[],
  prompt_json jsonb, -- Use prompt_json instead of json (reserved keyword)
  created_at timestamp with time zone,
  updated_at timestamp with time zone
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public', 't3d'
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.user_id,
    p.space,
    p.style,
    p.space_type,
    p.description,
    p.color_scheme,
    p.dimensions_mm,
    p.mood_keywords,
    p.uploaded_refs,
    p.json, -- Return the actual column
    p.created_at,
    p.updated_at
  FROM t3d.prompts p
  WHERE p.user_id = p_user_id
  ORDER BY p.created_at DESC;
END;
$$;

-- Step 6: Fix get_t3d_prompt_by_id function
CREATE OR REPLACE FUNCTION public.get_t3d_prompt_by_id(p_prompt_id uuid)
RETURNS TABLE(
  id uuid,
  user_id uuid,
  space text,
  style text,
  space_type text,
  description text,
  color_scheme text[],
  dimensions_mm jsonb,
  mood_keywords text[],
  uploaded_refs text[],
  prompt_json jsonb, -- Use prompt_json instead of json (reserved keyword)
  created_at timestamp with time zone,
  updated_at timestamp with time zone
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public', 't3d'
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.user_id,
    p.space,
    p.style,
    p.space_type,
    p.description,
    p.color_scheme,
    p.dimensions_mm,
    p.mood_keywords,
    p.uploaded_refs,
    p.json, -- Return the actual column
    p.created_at,
    p.updated_at
  FROM t3d.prompts p
  WHERE p.id = p_prompt_id;
END;
$$;