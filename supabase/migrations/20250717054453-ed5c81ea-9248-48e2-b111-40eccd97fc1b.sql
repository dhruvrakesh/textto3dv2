-- Update any existing jobs with working demo model URL
UPDATE jobs 
SET model_url = 'https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf',
    updated_at = now()
WHERE status = 'completed'
AND (model_url IS NULL OR model_url LIKE '%github%');