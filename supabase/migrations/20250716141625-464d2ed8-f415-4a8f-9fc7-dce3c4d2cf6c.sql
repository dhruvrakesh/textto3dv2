-- Create storage bucket for 3D models
INSERT INTO storage.buckets (id, name, public) 
VALUES ('t3d-renders', 't3d-renders', true);

-- Create storage policies for t3d-renders bucket
CREATE POLICY "Anyone can view 3D renders" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 't3d-renders');

CREATE POLICY "Authenticated users can upload 3D renders" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 't3d-renders' AND auth.role() = 'authenticated');

CREATE POLICY "Service role can manage 3D renders" 
ON storage.objects 
FOR ALL 
USING (bucket_id = 't3d-renders');