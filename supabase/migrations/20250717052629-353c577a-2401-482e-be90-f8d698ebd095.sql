-- Phase 1: Fix job_type constraint to allow demo type
ALTER TABLE t3d.jobs DROP CONSTRAINT jobs_job_type_check;
ALTER TABLE t3d.jobs ADD CONSTRAINT jobs_job_type_check 
  CHECK (job_type = ANY (ARRAY['render'::text, 'mesh'::text, 'texture'::text, '3d_model_generation'::text, 'demo'::text, 'replicate'::text, 'huggingface'::text]));

-- Now fix the existing job record with working demo model URL
UPDATE t3d.jobs 
SET result_url = 'https://threejs.org/examples/models/gltf/DamagedHelmet/glTF-Binary/DamagedHelmet.glb',
    job_type = 'demo'
WHERE result_url LIKE '%example.com%';

-- Phase 2: Fix critical security issues - Enable RLS on missing tables
ALTER TABLE public.attendance_bad_backup ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.csv_upload_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_stock_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_stock_summary ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deck_viscosity_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employee_code_sequences ENABLE ROW LEVEL SECURITY;