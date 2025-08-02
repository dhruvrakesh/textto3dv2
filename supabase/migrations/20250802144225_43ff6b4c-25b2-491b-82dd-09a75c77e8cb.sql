-- Fix the public.update_t3d_job wrapper function to properly map parameters
-- This addresses the missing p_job_type parameter issue causing edge function failures

-- Drop the existing broken wrapper function
DROP FUNCTION IF EXISTS public.update_t3d_job(uuid, text, numeric, text, text, text);

-- Create the corrected wrapper function with proper parameter mapping
CREATE OR REPLACE FUNCTION public.update_t3d_job(
  p_job_id uuid,
  p_status text,
  p_progress numeric DEFAULT NULL,
  p_result_url text DEFAULT NULL,
  p_error_message text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Call t3d.update_job_status with all required parameters including p_job_type
  PERFORM t3d.update_job_status(
    p_job_id,           -- job_id (uuid)
    p_status,           -- status (text)
    p_progress,         -- progress (numeric)
    p_result_url,       -- result_url (text)
    p_error_message,    -- error_message (text)
    '3d_model_generation' -- p_job_type (text) - default for all jobs
  );
END;
$$;