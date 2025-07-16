-- Create t3d-renders storage bucket for 3D model files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('t3d-renders', 't3d-renders', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for t3d-renders bucket
-- Allow public read access to 3D model files
CREATE POLICY "Public can view 3D renders" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 't3d-renders');

-- Allow authenticated users to upload their own 3D renders
CREATE POLICY "Authenticated users can upload 3D renders" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 't3d-renders' AND auth.role() = 'authenticated');

-- Allow service role to upload 3D renders (for edge function)
CREATE POLICY "Service role can upload 3D renders" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 't3d-renders');

-- Allow service role to update 3D renders
CREATE POLICY "Service role can update 3D renders" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 't3d-renders');

-- Allow users to delete their own 3D renders
CREATE POLICY "Users can delete their own 3D renders" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 't3d-renders' AND auth.role() = 'authenticated');