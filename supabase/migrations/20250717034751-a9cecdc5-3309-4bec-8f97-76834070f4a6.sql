-- Create public wrapper function for t3d.delete_job
CREATE OR REPLACE FUNCTION public.delete_job(p_job_id uuid, p_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
  -- Call the t3d schema function
  PERFORM t3d.delete_job(p_job_id, p_user_id);
END;
$function$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.delete_job(uuid, uuid) TO authenticated;