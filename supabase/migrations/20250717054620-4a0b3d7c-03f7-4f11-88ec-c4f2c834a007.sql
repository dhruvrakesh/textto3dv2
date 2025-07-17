-- Create the user_jobs table for 3D model generation
CREATE TABLE IF NOT EXISTS public.user_jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  enhanced_prompt TEXT,
  status TEXT NOT NULL DEFAULT 'queued',
  progress INTEGER DEFAULT 0,
  model_url TEXT,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on user_jobs
ALTER TABLE public.user_jobs ENABLE ROW LEVEL SECURITY;

-- Create policies for user_jobs
CREATE POLICY "Users can view their own jobs" 
ON public.user_jobs 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own jobs" 
ON public.user_jobs 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own jobs" 
ON public.user_jobs 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own jobs" 
ON public.user_jobs 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_user_jobs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_user_jobs_updated_at
BEFORE UPDATE ON public.user_jobs
FOR EACH ROW
EXECUTE FUNCTION public.update_user_jobs_updated_at();

-- Insert a demo job with working model URL
INSERT INTO public.user_jobs (user_id, prompt, enhanced_prompt, status, progress, model_url)
SELECT 
  auth.uid() AS user_id,
  'Modern kitchen with Scandinavian design' AS prompt,
  'A beautiful modern kitchen with clean Scandinavian design elements' AS enhanced_prompt,
  'completed' AS status,
  100 AS progress,
  'https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf' AS model_url
WHERE auth.uid() IS NOT NULL;