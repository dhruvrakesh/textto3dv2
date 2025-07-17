-- Update delete_job function to only require job_id and use auth.uid() internally
CREATE OR REPLACE FUNCTION t3d.delete_job(p_job_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id uuid;
  v_job_record RECORD;
BEGIN
  -- Get the authenticated user ID
  v_user_id := auth.uid();
  
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  -- Check if job exists and belongs to user
  SELECT * INTO v_job_record 
  FROM t3d.jobs 
  WHERE id = p_job_id AND user_id = v_user_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Job not found or unauthorized';
  END IF;
  
  -- Don't allow deletion of processing jobs
  IF v_job_record.status = 'processing' THEN
    RAISE EXCEPTION 'Cannot delete job that is currently processing';
  END IF;
  
  -- Delete the job
  DELETE FROM t3d.jobs 
  WHERE id = p_job_id AND user_id = v_user_id;
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Failed to delete job: %', SQLERRM;
END;
$$;

-- Update retry_job function to only require job_id and use auth.uid() internally
CREATE OR REPLACE FUNCTION t3d.retry_job(p_job_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id uuid;
  v_job_record RECORD;
BEGIN
  -- Get the authenticated user ID
  v_user_id := auth.uid();
  
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  -- Check if job exists and belongs to user
  SELECT * INTO v_job_record 
  FROM t3d.jobs 
  WHERE id = p_job_id AND user_id = v_user_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Job not found or unauthorized';
  END IF;
  
  -- Only allow retry of failed jobs
  IF v_job_record.status != 'failed' THEN
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
  WHERE id = p_job_id AND user_id = v_user_id;
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Failed to retry job: %', SQLERRM;
END;
$$;

-- Update bulk_delete_jobs function to work with single parameter delete function
CREATE OR REPLACE FUNCTION t3d.bulk_delete_jobs(p_job_ids uuid[])
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id uuid;
  v_job_id uuid;
  v_deleted_count integer := 0;
BEGIN
  -- Get the authenticated user ID
  v_user_id := auth.uid();
  
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  -- Delete each job using the delete_job function
  FOREACH v_job_id IN ARRAY p_job_ids LOOP
    BEGIN
      IF t3d.delete_job(v_job_id) THEN
        v_deleted_count := v_deleted_count + 1;
      END IF;
    EXCEPTION
      WHEN OTHERS THEN
        -- Log error but continue with next job
        RAISE WARNING 'Failed to delete job %: %', v_job_id, SQLERRM;
    END;
  END LOOP;
  
  RETURN v_deleted_count;
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION t3d.delete_job(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION t3d.retry_job(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION t3d.bulk_delete_jobs(uuid[]) TO authenticated;