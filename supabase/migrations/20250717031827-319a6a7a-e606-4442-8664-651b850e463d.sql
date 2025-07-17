-- Clean up duplicate function definitions and implement job queue processing

-- First, drop any existing versions of these functions to avoid conflicts
DROP FUNCTION IF EXISTS t3d.delete_job(uuid);
DROP FUNCTION IF EXISTS t3d.retry_job(uuid);
DROP FUNCTION IF EXISTS t3d.bulk_delete_jobs(uuid[]);

-- Keep only the two-parameter versions that are already defined in the latest migration
-- The functions with (p_job_id uuid, p_user_id uuid) are already properly defined

-- Create job processing trigger function
CREATE OR REPLACE FUNCTION t3d.process_queued_jobs()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Update jobs that have been queued for more than 1 minute to processing
  UPDATE t3d.jobs 
  SET 
    status = 'processing',
    progress = 5,
    updated_at = now()
  WHERE status = 'queued' 
    AND created_at < now() - INTERVAL '1 minute'
    AND job_type = '3d_model_generation';
    
  -- Simulate processing for demo purposes (in production, this would trigger actual processing)
  -- For now, we'll just advance jobs through stages
  UPDATE t3d.jobs 
  SET 
    progress = CASE 
      WHEN progress < 25 THEN 25
      WHEN progress < 50 THEN 50
      WHEN progress < 75 THEN 75
      WHEN progress < 100 THEN 100
      ELSE progress
    END,
    status = CASE 
      WHEN progress >= 75 AND random() > 0.7 THEN 'completed'
      WHEN progress >= 50 AND random() > 0.9 THEN 'failed'
      ELSE 'processing'
    END,
    result_url = CASE 
      WHEN progress >= 75 AND random() > 0.7 THEN 'https://example.com/model_' || id::text || '.glb'
      ELSE result_url
    END,
    error_message = CASE 
      WHEN progress >= 50 AND random() > 0.9 THEN 'Simulated processing error for demo'
      ELSE error_message
    END,
    updated_at = now()
  WHERE status = 'processing' 
    AND updated_at < now() - INTERVAL '30 seconds';
END;
$$;

-- Create a function to handle stuck jobs cleanup
CREATE OR REPLACE FUNCTION t3d.cleanup_stuck_jobs()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  updated_count integer;
BEGIN
  -- Mark jobs as failed if they've been processing for more than 10 minutes
  UPDATE t3d.jobs 
  SET 
    status = 'failed',
    error_message = 'Job timed out after 10 minutes',
    updated_at = now()
  WHERE status = 'processing' 
    AND updated_at < now() - INTERVAL '10 minutes';
    
  GET DIAGNOSTICS updated_count = ROW_COUNT;
  
  -- Also handle very old queued jobs (over 1 hour)
  UPDATE t3d.jobs 
  SET 
    status = 'failed',
    error_message = 'Job abandoned - too long in queue',
    updated_at = now()
  WHERE status = 'queued' 
    AND created_at < now() - INTERVAL '1 hour';
    
  RETURN updated_count;
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION t3d.process_queued_jobs() TO authenticated;
GRANT EXECUTE ON FUNCTION t3d.cleanup_stuck_jobs() TO authenticated;