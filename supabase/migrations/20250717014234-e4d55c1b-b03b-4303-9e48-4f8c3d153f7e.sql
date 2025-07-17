-- Phase 1: Job Deletion and Management Functions (Fixed)

-- 1. Create function to safely delete jobs
CREATE OR REPLACE FUNCTION t3d.delete_job(p_job_id uuid, p_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  job_record RECORD;
BEGIN
  -- First check if job exists and belongs to user
  SELECT * INTO job_record 
  FROM t3d.jobs 
  WHERE id = p_job_id AND user_id = p_user_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Job not found or unauthorized';
  END IF;
  
  -- Only allow deletion of jobs that are not actively processing
  IF job_record.status = 'processing' THEN
    RAISE EXCEPTION 'Cannot delete job that is currently processing';
  END IF;
  
  -- Delete the job (cascade will handle related records)
  DELETE FROM t3d.jobs WHERE id = p_job_id AND user_id = p_user_id;
  
  -- Log the deletion
  RAISE LOG 'Job % deleted by user %', p_job_id, p_user_id;
  
  RETURN TRUE;
END;
$$;

-- 2. Create function to cleanup stuck jobs (jobs stuck in queued/processing for too long)
CREATE OR REPLACE FUNCTION t3d.cleanup_stuck_jobs()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  queued_count integer;
  processing_count integer;
  total_count integer;
BEGIN
  -- Mark jobs as failed if they've been in queued status for more than 30 minutes
  UPDATE t3d.jobs 
  SET 
    status = 'failed',
    error_message = 'Job timed out - stuck in queued status for more than 30 minutes',
    updated_at = now()
  WHERE 
    status = 'queued' 
    AND created_at < (now() - interval '30 minutes');
  
  -- Get count of queued jobs updated
  SELECT count(*) INTO queued_count
  FROM t3d.jobs 
  WHERE status = 'failed' 
    AND error_message = 'Job timed out - stuck in queued status for more than 30 minutes'
    AND updated_at > (now() - interval '1 minute');
  
  -- Mark jobs as failed if they've been in processing status for more than 60 minutes
  UPDATE t3d.jobs 
  SET 
    status = 'failed',
    error_message = 'Job timed out - stuck in processing status for more than 60 minutes',
    updated_at = now()
  WHERE 
    status = 'processing' 
    AND updated_at < (now() - interval '60 minutes');
  
  -- Get count of processing jobs updated
  SELECT count(*) INTO processing_count
  FROM t3d.jobs 
  WHERE status = 'failed' 
    AND error_message = 'Job timed out - stuck in processing status for more than 60 minutes'
    AND updated_at > (now() - interval '1 minute');
  
  total_count := COALESCE(queued_count, 0) + COALESCE(processing_count, 0);
  
  RAISE LOG 'Cleaned up % stuck jobs (% queued, % processing)', total_count, COALESCE(queued_count, 0), COALESCE(processing_count, 0);
  
  RETURN total_count;
END;
$$;

-- 3. Create function to retry failed jobs
CREATE OR REPLACE FUNCTION t3d.retry_job(p_job_id uuid, p_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  job_record RECORD;
BEGIN
  -- Check if job exists and belongs to user
  SELECT * INTO job_record 
  FROM t3d.jobs 
  WHERE id = p_job_id AND user_id = p_user_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Job not found or unauthorized';
  END IF;
  
  -- Only allow retry of failed jobs
  IF job_record.status != 'failed' THEN
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
  
  RAISE LOG 'Job % reset for retry by user %', p_job_id, p_user_id;
  
  RETURN TRUE;
END;
$$;

-- 4. Create function to bulk delete jobs
CREATE OR REPLACE FUNCTION t3d.bulk_delete_jobs(p_job_ids uuid[], p_user_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  deleted_count integer := 0;
  job_id uuid;
BEGIN
  -- Loop through each job ID and delete if allowed
  FOREACH job_id IN ARRAY p_job_ids LOOP
    BEGIN
      -- Use the existing delete function for safety checks
      IF t3d.delete_job(job_id, p_user_id) THEN
        deleted_count := deleted_count + 1;
      END IF;
    EXCEPTION WHEN OTHERS THEN
      -- Log but continue with other jobs
      RAISE LOG 'Failed to delete job %: %', job_id, SQLERRM;
    END;
  END LOOP;
  
  RETURN deleted_count;
END;
$$;

-- 5. Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION t3d.delete_job(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION t3d.cleanup_stuck_jobs() TO authenticated;
GRANT EXECUTE ON FUNCTION t3d.retry_job(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION t3d.bulk_delete_jobs(uuid[], uuid) TO authenticated;