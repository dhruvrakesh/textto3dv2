-- Create public wrapper for create_prompt_and_job
CREATE OR REPLACE FUNCTION public.create_prompt_and_job(
  p_user_id uuid, 
  p_prompt_data jsonb, 
  p_job_type text DEFAULT '3d_model_generation'
)
RETURNS TABLE(prompt_id uuid, job_id uuid)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY SELECT * FROM t3d.create_prompt_and_job(p_user_id, p_prompt_data, p_job_type);
END;
$$;

-- Create public wrapper for update_job_status
CREATE OR REPLACE FUNCTION public.update_job_status(
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
  PERFORM t3d.update_job_status(p_job_id, p_status, p_progress, p_result_url, p_error_message);
END;
$$;