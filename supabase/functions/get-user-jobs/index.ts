
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

    // First, get jobs from t3d.jobs table
    const { data: jobs, error: jobsError } = await supabaseClient
      .from('jobs')
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
        updated_at
      `)
      .eq('user_id', p_user_id)
      .order('created_at', { ascending: false });

    if (jobsError) {
      console.error('Database error fetching jobs:', jobsError);
      return createCorsErrorResponse(`Failed to fetch jobs: ${jobsError.message}`, 500);
    }

    if (!jobs || jobs.length === 0) {
      console.log(`No jobs found for user ${p_user_id}`);
      return createCorsResponse([]);
    }

    // Get unique prompt IDs
    const promptIds = [...new Set(jobs.map(job => job.prompt_id).filter(Boolean))];
    
    let prompts = [];
    if (promptIds.length > 0) {
      // Fetch corresponding prompts
      const { data: promptsData, error: promptsError } = await supabaseClient
        .from('prompts')
        .select(`
          id,
          space_type,
          style,
          description,
          json
        `)
        .in('id', promptIds);

      if (promptsError) {
        console.error('Database error fetching prompts:', promptsError);
        // Continue without prompts data rather than failing
        prompts = [];
      } else {
        prompts = promptsData || [];
      }
    }

    // Create a lookup map for prompts
    const promptsMap = new Map();
    prompts.forEach(prompt => {
      promptsMap.set(prompt.id, prompt);
    });

    // Combine jobs with their corresponding prompts
    const jobsWithPrompts = jobs.map(job => ({
      ...job,
      prompts: job.prompt_id ? promptsMap.get(job.prompt_id) || null : null
    }));

    console.log(`Found ${jobsWithPrompts.length} jobs for user ${p_user_id}`);

    return createCorsResponse(jobsWithPrompts);

  } catch (error) {
    console.error('Error in get-user-jobs function:', error);
    return createCorsErrorResponse(error.message || 'Internal server error', 500);
  }
});
