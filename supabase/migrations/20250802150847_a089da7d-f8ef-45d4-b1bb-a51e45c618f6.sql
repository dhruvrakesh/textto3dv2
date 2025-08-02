-- Remove demo logic from t3d.process_queued_jobs and reset fake completed jobs
-- This fixes the issue where jobs are auto-completed with fake example.com URLs

-- First, reset all existing jobs with fake URLs to failed status
UPDATE t3d.jobs 
SET 
  status = 'error',
  progress = 0,
  result_url = NULL,
  error_message = 'Reset from demo mode - please retry job',
  updated_at = now()
WHERE result_url LIKE 'https://example.com/result/%' 
  AND status = 'done';

-- Update the process_queued_jobs function to remove demo completion logic
CREATE OR REPLACE FUNCTION t3d.process_queued_jobs()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Move queued jobs to running after 1 minute delay
  UPDATE t3d.jobs 
  SET 
    status = 'running',
    progress = 5,
    updated_at = now()
  WHERE status = 'queued' 
    AND created_at < now() - INTERVAL '1 minute'
    AND job_type = '3d_model_generation';

  -- Note: Removed demo logic that auto-completed jobs with fake URLs
  -- Jobs will now only complete when actual generation services (Hugging Face, Meshy, etc.) complete them
  -- This allows real 3D generation to work properly
END;
$$;

-- Update public wrapper function
CREATE OR REPLACE FUNCTION public.process_queued_jobs()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  PERFORM t3d.process_queued_jobs();
END;
$$;