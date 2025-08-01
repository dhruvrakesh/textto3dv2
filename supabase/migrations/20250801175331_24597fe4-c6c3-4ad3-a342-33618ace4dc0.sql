-- FINAL CLEANUP: Remove persistent 5-parameter create_t3d_job function
-- This function has been surviving previous DROP attempts due to incorrect signature targeting

-- Drop the persistent 5-parameter function with exact signature
DROP FUNCTION IF EXISTS public.create_t3d_job(uuid, uuid, text, integer, text);

-- Verify our correct 8-parameter wrapper function exists and works properly
-- This should now be the ONLY create_t3d_job function in the public schema
SELECT 
    p.proname as function_name,
    pg_get_function_arguments(p.oid) as arguments,
    p.pronargs as argument_count
FROM pg_proc p 
JOIN pg_namespace n ON p.pronamespace = n.oid 
WHERE n.nspname = 'public' 
    AND p.proname = 'create_t3d_job'
ORDER BY p.pronargs;