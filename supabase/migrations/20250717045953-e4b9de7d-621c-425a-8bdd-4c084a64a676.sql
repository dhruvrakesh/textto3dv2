-- Phase 1: Fix Model URL Issue - Create storage bucket for 3D models  
INSERT INTO storage.buckets (id, name, public) 
VALUES ('t3d-renders', 't3d-renders', true)
ON CONFLICT (id) DO NOTHING;

-- Enable public access for model files
DROP POLICY IF EXISTS "Public access to 3D models" ON storage.objects;
CREATE POLICY "Public access to 3D models" ON storage.objects
FOR SELECT USING (bucket_id = 't3d-renders');

DROP POLICY IF EXISTS "Authenticated users can upload 3D models" ON storage.objects;
CREATE POLICY "Authenticated users can upload 3D models" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 't3d-renders' AND auth.role() = 'authenticated');

-- Phase 3: Fix database functions security - Update the function with proper security
DROP FUNCTION IF EXISTS t3d.update_job_status;
CREATE OR REPLACE FUNCTION t3d.update_job_status(
  p_job_id UUID,
  p_status TEXT,
  p_progress INTEGER DEFAULT NULL,
  p_result_url TEXT DEFAULT NULL,
  p_error_message TEXT DEFAULT NULL,
  p_job_type TEXT DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, t3d
AS $$
BEGIN
  UPDATE t3d.jobs
  SET 
    status = p_status,
    progress = COALESCE(p_progress, progress),
    result_url = COALESCE(p_result_url, result_url),
    error_message = COALESCE(p_error_message, error_message),
    job_type = COALESCE(p_job_type, job_type),
    updated_at = NOW()
  WHERE id = p_job_id;
  
  -- Log the update for debugging
  RAISE LOG 'Job % updated to status: %, progress: %, result_url: %', 
    p_job_id, p_status, p_progress, p_result_url;
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION t3d.update_job_status TO anon, authenticated, service_role;