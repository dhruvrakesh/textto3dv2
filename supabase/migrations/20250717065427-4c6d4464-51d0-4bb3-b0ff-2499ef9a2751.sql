-- Fix the retry_job function to check for 'error' status instead of 'failed'
CREATE OR REPLACE FUNCTION t3d.retry_job(p_job_id uuid, p_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_job_record RECORD;
BEGIN
  -- Check if job exists and belongs to user
  SELECT * INTO v_job_record 
  FROM t3d.jobs 
  WHERE id = p_job_id AND user_id = p_user_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Job not found or unauthorized';
  END IF;
  
  -- FIX: Check for 'error' status instead of 'failed' to match the table's check constraint
  IF v_job_record.status != 'error' THEN
    RAISE EXCEPTION 'Can only retry failed jobs';
  END IF;
  
  -- Reset job to queued status
  UPDATE t3d.jobs 
  SET 
    status = 'queued',
    progress = 0,
    error_message = NULL,
    result_url = NULL,
    updated_at = now()
  WHERE id = p_job_id AND user_id = p_user_id;
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Failed to retry job: %', SQLERRM;
END;
$$;