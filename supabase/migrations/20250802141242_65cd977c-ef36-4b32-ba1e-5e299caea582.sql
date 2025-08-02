-- Fix the column order mapping in public.create_t3d_job wrapper function
-- This addresses the column order mismatch between t3d.create_t3d_job and what the edge function expects

-- Drop the existing wrapper function
DROP FUNCTION IF EXISTS public.create_t3d_job(uuid, uuid, text, numeric, text, text, text, text);

-- Create the corrected wrapper function with proper column mapping
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
  -- Call t3d.create_t3d_job and explicitly map columns to correct order
  RETURN QUERY
  SELECT 
    j.id,                    -- id (position 1) ✓
    j.prompt_id,            -- prompt_id (position 2) ✓ 
    j.user_id,              -- user_id (position 3) - was at position 9 ✓
    j.status,               -- status (position 4) - was at position 4 ✓
    j.progress,             -- progress (position 5) - was at position 5 ✓
    j.job_type,             -- job_type (position 6) - was at position 3 ✓
    j.selected_model,       -- selected_model (position 7) - was at position 12 ✓
    j.selected_service,     -- selected_service (position 8) - was at position 13 ✓
    j.quality_level,        -- quality_level (position 9) - was at position 14 ✓
    j.created_at,           -- created_at (position 10) - was at position 7 ✓
    j.updated_at,           -- updated_at (position 11) - was at position 8 ✓
    NULL::timestamp with time zone, -- started_at (position 12) - missing, set to NULL ✓
    NULL::timestamp with time zone, -- completed_at (position 13) - missing, set to NULL ✓
    j.error_message,        -- error_message (position 14) - was at position 10 ✓
    j.result_url,           -- result_url (position 15) - was at position 6 ✓
    j.meshy_task_id         -- meshy_task_id (position 16) - was at position 15 ✓
  FROM t3d.create_t3d_job(
    p_prompt_id,        -- 1st param (uuid) ✓
    p_user_id,          -- 2nd param (uuid) ✓ 
    p_status,           -- 3rd param (text) ✓
    p_progress,         -- 4th param (numeric) ✓
    p_job_type,         -- 5th param (text) ✓
    p_selected_model,   -- 6th param (text) ✓
    p_selected_service, -- 7th param (text) ✓
    p_quality_level     -- 8th param (text) ✓
  ) j;
END;
$$;