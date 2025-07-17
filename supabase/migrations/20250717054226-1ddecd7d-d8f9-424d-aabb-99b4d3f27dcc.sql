-- Update the completed job with a working CORS-friendly demo model URL
UPDATE user_jobs 
SET model_url = 'https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf',
    updated_at = now()
WHERE status = 'completed'
AND (model_url IS NULL OR model_url LIKE '%github%');

-- Also ensure we have a working demo model for any future fallbacks
UPDATE user_jobs 
SET model_url = 'https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf'
WHERE model_url = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF/DamagedHelmet.gltf';