-- Create t3d schema for text-to-3D renderer
CREATE SCHEMA IF NOT EXISTS t3d;

-- Set search path to include both schemas
SET search_path = t3d, public;

-- Create storage buckets for file uploads and renders
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('t3d-uploads', 't3d-uploads', false),
  ('t3d-renders', 't3d-renders', true)
ON CONFLICT (id) DO NOTHING;

-- Create profiles table for additional user metadata
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

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
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE t3d.prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE t3d.assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE t3d.jobs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for t3d tables
CREATE POLICY "prompt_owner_crud" ON t3d.prompts
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "asset_owner_crud" ON t3d.assets
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "job_owner_crud" ON t3d.jobs
  FOR ALL USING (
    auth.uid() = (SELECT p.user_id FROM t3d.prompts p WHERE p.id = prompt_id)
  );

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

-- Trigger function for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at columns
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_prompts_updated_at
  BEFORE UPDATE ON t3d.prompts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON t3d.jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();