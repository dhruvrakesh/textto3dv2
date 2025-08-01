-- Remove the duplicate create_t3d_job function from public schema to avoid conflicts
DROP FUNCTION IF EXISTS public.create_t3d_job(p_job_type text, p_progress integer, p_prompt_id uuid, p_status text, p_user_id uuid);
DROP FUNCTION IF EXISTS public.create_t3d_job(p_job_type text, p_progress integer, p_prompt_id uuid, p_quality_level text, p_selected_model text, p_selected_service text, p_status text, p_user_id uuid);

-- Ensure the public wrapper function calls the correct t3d schema function
CREATE OR REPLACE FUNCTION public.create_t3d_job(
  p_job_type text,
  p_progress integer,
  p_prompt_id uuid,
  p_quality_level text,
  p_selected_model text,
  p_selected_service text,
  p_status text,
  p_user_id uuid
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Call the t3d schema function with proper parameters
  RETURN t3d.create_t3d_job(
    p_job_type,
    p_progress,
    p_prompt_id,
    p_quality_level,
    p_selected_model,
    p_selected_service,
    p_status,
    p_user_id
  );
END;
$$;