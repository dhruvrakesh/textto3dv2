-- Create storage bucket for 3D model renders if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('t3d-renders', 't3d-renders', true, 52428800, ARRAY['model/gltf-binary', 'model/gltf+json', 'application/octet-stream'])
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for public access to 3D models
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Public Access for 3D Models'
    ) THEN
        CREATE POLICY "Public Access for 3D Models" ON storage.objects
            FOR SELECT USING (bucket_id = 't3d-renders');
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Authenticated users can upload models'
    ) THEN
        CREATE POLICY "Authenticated users can upload models" ON storage.objects
            FOR INSERT WITH CHECK (bucket_id = 't3d-renders' AND auth.role() = 'authenticated');
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Authenticated users can update their models'
    ) THEN
        CREATE POLICY "Authenticated users can update their models" ON storage.objects
            FOR UPDATE USING (bucket_id = 't3d-renders' AND auth.role() = 'authenticated');
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Authenticated users can delete their models'
    ) THEN
        CREATE POLICY "Authenticated users can delete their models" ON storage.objects
            FOR DELETE USING (bucket_id = 't3d-renders' AND auth.role() = 'authenticated');
    END IF;
END $$;