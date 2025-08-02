-- Fix the public.update_t3d_job function conflict by dropping all variations and creating one definitive version
-- This resolves the PGRST203 "Could not choose the best candidate function" error

-- Drop ALL existing public.update_t3d_job function variations to clear conflicts
DROP FUNCTION IF EXISTS public.update_t3d_job(uuid, text, numeric, text, text) CASCADE;
DROP FUNCTION IF EXISTS public.update_t3d_job(uuid, text, integer, text, text, text) CASCADE;
DROP FUNCTION IF EXISTS public.update_t3d_job(uuid, text, numeric, text, text, text) CASCADE;

-- Create ONE definitive public.update_t3d_job function with exact signature edge functions expect
CREATE OR REPLACE FUNCTION public.update_t3d_job(
  p_job_id uuid,
  p_status text DEFAULT NULL,
  p_progress numeric DEFAULT NULL,
  p_result_url text DEFAULT NULL,
  p_error_message text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Map correctly to t3d.update_job_status with proper type conversion and default job_type
  PERFORM t3d.update_job_status(
    p_job_id,                    -- job_id (uuid)
    p_status,                    -- status (text)
    p_progress::integer,         -- progress (convert numeric to integer)
    p_result_url,               -- result_url (text)
    p_error_message,            -- error_message (text)
    '3d_model_generation'       -- p_job_type (text) - required default
  );
END;
$$;