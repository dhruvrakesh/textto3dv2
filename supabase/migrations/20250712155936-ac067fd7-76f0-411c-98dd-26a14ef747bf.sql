-- Create t3d schema for text-to-3D renderer
CREATE SCHEMA IF NOT EXISTS t3d;

-- Create storage buckets for file uploads and renders
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('t3d-uploads', 't3d-uploads', false),
  ('t3d-renders', 't3d-renders', true)
ON CONFLICT (id) DO NOTHING;

-- Core tables for t3d schema
-- Holds the single source-of-truth JSON prompt
CREATE TABLE IF NOT EXISTS t3d.prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  version INTEGER NOT NULL DEFAULT 1,
  json JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Optional attachments (ref photos, sketches, etc.)
CREATE TABLE IF NOT EXISTS t3d.assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  asset_type TEXT CHECK (asset_type IN ('photo','sketch','mesh','material')),
  bucket TEXT,
  path TEXT,
  meta_json JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Async render / mesh / optimization jobs
CREATE TABLE IF NOT EXISTS t3d.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id UUID NOT NULL REFERENCES t3d.prompts(id) ON DELETE CASCADE,
  job_type TEXT NOT NULL CHECK (job_type IN ('render','mesh','texture')),
  status TEXT NOT NULL DEFAULT 'queued' CHECK (status IN ('queued','running','done','error')),
  progress NUMERIC DEFAULT 0,
  result_uri TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE t3d.prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE t3d.assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE t3d.jobs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "prompt_owner_crud" ON t3d.prompts;
DROP POLICY IF EXISTS "asset_owner_crud" ON t3d.assets;
DROP POLICY IF EXISTS "job_owner_crud" ON t3d.jobs;

-- RLS Policies for t3d tables
CREATE POLICY "prompt_owner_crud" ON t3d.prompts
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "asset_owner_crud" ON t3d.assets
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "job_owner_crud" ON t3d.jobs
  FOR ALL USING (
    auth.uid() = (SELECT p.user_id FROM t3d.prompts p WHERE p.id = prompt_id)
  );

-- Drop existing storage policies if they exist
DROP POLICY IF EXISTS "Users can upload their own files" ON storage.objects;
DROP POLICY IF EXISTS "Users can view their own uploads" ON storage.objects;
DROP POLICY IF EXISTS "Public can view renders" ON storage.objects;
DROP POLICY IF EXISTS "System can upload renders" ON storage.objects;

-- Storage policies for t3d buckets
CREATE POLICY "Users can upload their own files" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 't3d-uploads' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view their own uploads" ON storage.objects
  FOR SELECT USING (
    bucket_id = 't3d-uploads' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Public can view renders" ON storage.objects
  FOR SELECT USING (bucket_id = 't3d-renders');

CREATE POLICY "System can upload renders" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 't3d-renders');

-- Add triggers for updated_at columns (drop first to avoid duplicates)
DROP TRIGGER IF EXISTS update_prompts_updated_at ON t3d.prompts;
DROP TRIGGER IF EXISTS update_jobs_updated_at ON t3d.jobs;

CREATE TRIGGER update_prompts_updated_at
  BEFORE UPDATE ON t3d.prompts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON t3d.jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();