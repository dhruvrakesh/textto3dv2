-- Fix the t3d.process_queued_jobs function to use correct status values
CREATE OR REPLACE FUNCTION t3d.process_queued_jobs()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Move queued jobs to running after 1 minute delay (for demo purposes)
  UPDATE t3d.jobs 
  SET 
    status = 'running',
    progress = 5,
    updated_at = now()
  WHERE status = 'queued' 
    AND created_at < now() - INTERVAL '1 minute'
    AND job_type = '3d_model_generation';

  -- Simulate job progress for running jobs
  UPDATE t3d.jobs 
  SET 
    progress = LEAST(progress + 15, 90),
    updated_at = now()
  WHERE status = 'running' 
    AND progress < 90
    AND job_type = '3d_model_generation';

  -- Complete jobs that have reached 90% progress after some time
  UPDATE t3d.jobs 
  SET 
    status = 'done',
    progress = 100,
    result_url = 'https://example.com/result/' || id || '.glb',
    updated_at = now()
  WHERE status = 'running' 
    AND progress >= 90
    AND updated_at < now() - INTERVAL '30 seconds'
    AND job_type = '3d_model_generation';

  -- Occasionally fail some jobs for demo purposes (5% chance)
  UPDATE t3d.jobs 
  SET 
    status = 'error',
    error_message = 'Simulation error for demo purposes',
    updated_at = now()
  WHERE status = 'running' 
    AND progress > 30
    AND random() < 0.05
    AND job_type = '3d_model_generation';
END;
$$;

-- Fix the t3d.cleanup_stuck_jobs function to use correct status values  
CREATE OR REPLACE FUNCTION t3d.cleanup_stuck_jobs()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  stuck_count integer;
BEGIN
  -- Mark jobs as failed if they've been running for more than 10 minutes
  UPDATE t3d.jobs 
  SET 
    status = 'error',
    error_message = 'Job timed out after 10 minutes',
    updated_at = now()
  WHERE status = 'running' 
    AND updated_at < now() - INTERVAL '10 minutes';

  -- Mark jobs as failed if they've been queued for more than 1 hour
  UPDATE t3d.jobs 
  SET 
    status = 'error',
    error_message = 'Job timed out in queue after 1 hour',
    updated_at = now()
  WHERE status = 'queued' 
    AND created_at < now() - INTERVAL '1 hour';

  GET DIAGNOSTICS stuck_count = ROW_COUNT;
  RETURN stuck_count;
END;
$$;

-- Now create public wrapper functions that can be called via RPC
CREATE OR REPLACE FUNCTION public.process_queued_jobs()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  PERFORM t3d.process_queued_jobs();
END;
$$;

CREATE OR REPLACE FUNCTION public.cleanup_stuck_jobs()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN t3d.cleanup_stuck_jobs();
END;
$$;

-- Grant permissions
GRANT EXECUTE ON FUNCTION public.process_queued_jobs() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.cleanup_stuck_jobs() TO authenticated, service_role;