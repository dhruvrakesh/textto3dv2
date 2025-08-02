-- Fix the parameter mapping in public.create_t3d_job wrapper function
-- This addresses the core issue where parameters were being passed in wrong order to t3d.create_t3d_job

-- Drop the existing broken wrapper function
DROP FUNCTION IF EXISTS public.create_t3d_job(uuid, uuid, text, numeric, text, text, text, text);

-- Create the corrected wrapper function with proper parameter mapping
CREATE OR REPLACE FUNCTION public.create_t3d_job(
  p_prompt_id uuid,
  p_user_id uuid, 
  p_status text,
  p_progress numeric,
  p_job_type text,
  p_selected_model text,
  p_selected_service text,
  p_quality_level text
)
RETURNS TABLE (
  id uuid,
  prompt_id uuid,
  user_id uuid,
  status text,
  progress numeric,
  job_type text,
  selected_model text,
  selected_service text,
  quality_level text,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  started_at timestamp with time zone,
  completed_at timestamp with time zone,
  error_message text,
  result_url text,
  meshy_task_id text
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Call t3d.create_t3d_job with parameters in CORRECT order
  RETURN QUERY
  SELECT * FROM t3d.create_t3d_job(
    p_prompt_id,        -- 1st param (uuid) ✓
    p_user_id,          -- 2nd param (uuid) ✓ 
    p_status,           -- 3rd param (text) ✓
    p_progress,         -- 4th param (numeric) ✓
    p_job_type,         -- 5th param (text) ✓
    p_selected_model,   -- 6th param (text) ✓
    p_selected_service, -- 7th param (text) ✓
    p_quality_level     -- 8th param (text) ✓
  );
END;
$$;