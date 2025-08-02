-- Phase 1: Database Schema Cleanup - Remove ALL duplicate functions from public schema

-- Drop all create_t3d_job functions from public schema
DROP FUNCTION IF EXISTS public.create_t3d_job(uuid, uuid, text, text, text, text);
DROP FUNCTION IF EXISTS public.create_t3d_job(uuid, uuid, text, text, text, text, text);
DROP FUNCTION IF EXISTS public.create_t3d_job(uuid, uuid, text, text, text, text, text, text);
DROP FUNCTION IF EXISTS public.create_t3d_job(uuid, uuid, text, text, text, text, text, text, text);

-- Drop all update_t3d_job functions from public schema
DROP FUNCTION IF EXISTS public.update_t3d_job(uuid, text);
DROP FUNCTION IF EXISTS public.update_t3d_job(uuid, text, integer);
DROP FUNCTION IF EXISTS public.update_t3d_job(uuid, text, integer, text);

-- Drop duplicate get_t3d_prompts functions, keep only the correct one
DROP FUNCTION IF EXISTS public.get_t3d_prompts(uuid);

-- Phase 3: Create clean public schema wrapper functions for security
-- These will be the ONLY public functions that call the authoritative t3d schema functions

CREATE OR REPLACE FUNCTION public.create_t3d_job(
  p_prompt_id UUID,
  p_user_id UUID,
  p_selected_model TEXT,
  p_selected_service TEXT,
  p_quality_level TEXT,
  p_status TEXT DEFAULT 'queued',
  p_progress INTEGER DEFAULT 0,
  p_job_type TEXT DEFAULT '3d_model_generation'
) RETURNS TABLE(
  job_id UUID,
  status TEXT,
  progress INTEGER,
  created_at TIMESTAMPTZ
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Call the authoritative t3d schema function
  RETURN QUERY
  SELECT * FROM t3d.create_t3d_job(
    p_prompt_id,
    p_user_id,
    p_selected_model,
    p_selected_service,
    p_quality_level,
    p_status,
    p_progress,
    p_job_type
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.update_t3d_job(
  p_job_id UUID,
  p_status TEXT,
  p_progress INTEGER DEFAULT NULL,
  p_result_url TEXT DEFAULT NULL
) RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Call the authoritative t3d schema function
  RETURN t3d.update_job_status(p_job_id, p_status, p_progress, p_result_url);
END;
$$;

CREATE OR REPLACE FUNCTION public.get_t3d_jobs(p_user_id UUID)
RETURNS TABLE(
  id UUID,
  prompt_id UUID,
  user_id UUID,
  status TEXT,
  progress INTEGER,
  result_url TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  selected_model TEXT,
  selected_service TEXT,
  quality_level TEXT,
  job_type TEXT,
  prompt_text TEXT,
  prompt_data JSONB
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM t3d.get_user_jobs(p_user_id);
END;
$$;