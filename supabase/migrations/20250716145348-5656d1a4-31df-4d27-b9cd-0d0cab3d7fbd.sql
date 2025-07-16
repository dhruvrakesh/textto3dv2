-- Fix job type constraint to allow '3d_model_generation'
-- Drop the existing constraint
ALTER TABLE t3d.jobs DROP CONSTRAINT jobs_job_type_check;

-- Add updated constraint with '3d_model_generation' included
ALTER TABLE t3d.jobs ADD CONSTRAINT jobs_job_type_check 
CHECK (job_type = ANY (ARRAY['render'::text, 'mesh'::text, 'texture'::text, '3d_model_generation'::text]));