
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders, handleCorsOptions, createCorsResponse, createCorsErrorResponse } from '../_shared/cors.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return handleCorsOptions();
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { p_user_id } = await req.json();

    if (!p_user_id) {
      return createCorsErrorResponse('User ID is required', 400);
    }

    console.log('Fetching jobs for user:', p_user_id);

    // Query jobs from the t3d schema with prompts data
    const { data: jobs, error } = await supabaseClient
      .from('t3d.jobs')
      .select(`
        id,
        prompt_id,
        user_id,
        status,
        progress,
        result_url,
        job_type,
        error_message,
        created_at,
        updated_at,
        prompts:t3d.prompts(
          id,
          space_type,
          style,
          description,
          json
        )
      `)
      .eq('user_id', p_user_id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      throw new Error(`Failed to fetch jobs: ${error.message}`);
    }

    console.log(`Found ${jobs?.length || 0} jobs for user ${p_user_id}`);

    return createCorsResponse(jobs || []);

  } catch (error) {
    console.error('Error in get-user-jobs function:', error);
    return createCorsErrorResponse(error.message || 'Internal server error');
  }
});
