
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

    // Get the authenticated user from the request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return createCorsErrorResponse('Missing authorization header', 401);
    }

    // Create a client for getting user info from the JWT
    const userClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: {
            Authorization: authHeader,
          },
        },
      }
    );

    // Get the user from the JWT
    const { data: { user }, error: userError } = await userClient.auth.getUser();
    
    if (userError || !user) {
      console.error('Authentication error:', userError);
      return createCorsErrorResponse('Invalid authentication', 401);
    }

    const userId = user.id;
    console.log('Processing prompt for user:', userId);

    const { promptData } = await req.json();
    console.log('Processing prompt data:', promptData);

    if (!promptData || typeof promptData !== 'object') {
      return createCorsErrorResponse('Invalid prompt data provided', 400);
    }

    // Create prompt in prompts table
    const { data: prompt, error: promptError } = await supabaseClient
      .schema('t3d')
      .from('prompts')
      .insert({
        user_id: userId,
        version: 1,
        json: {
          space_type: promptData.space_type || 'room',
          style: promptData.style || 'modern',
          description: promptData.description || '',
          ...promptData
        }
      })
      .select()
      .single();

    if (promptError) {
      console.error('Error creating prompt:', promptError);
      return createCorsErrorResponse(`Failed to create prompt: ${promptError.message}`, 500);
    }

    console.log('Created prompt:', prompt.id);

    // Create job in jobs table
    const { data: job, error: jobError } = await supabaseClient
      .schema('t3d')
      .from('jobs')
      .insert({
        prompt_id: prompt.id,
        user_id: userId,
        status: 'queued',
        progress: 0,
        job_type: 'text-to-3d'
      })
      .select()
      .single();

    if (jobError) {
      console.error('Error creating job:', jobError);
      return createCorsErrorResponse(`Failed to create job: ${jobError.message}`, 500);
    }

    console.log('Created job:', job.id);

    // Call the enhance-prompt function
    let enhancedPrompt = promptData.description;
    try {
      const { data: enhanceData, error: enhanceError } = await supabaseClient.functions.invoke('enhance-prompt', {
        body: { 
          prompt: promptData.description,
          spaceType: promptData.space_type,
          style: promptData.style
        }
      });

      if (enhanceError) {
        console.error('Error enhancing prompt:', enhanceError);
        // Continue with original prompt if enhancement fails
      } else if (enhanceData?.enhancedPrompt) {
        enhancedPrompt = enhanceData.enhancedPrompt;
        console.log('Enhanced prompt successfully');
      }
    } catch (error) {
      console.error('Enhance prompt function failed:', error);
      // Continue with original prompt
    }

    // Call the generate-3d-model function
    try {
      const { error: generateError } = await supabaseClient.functions.invoke('generate-3d-model', {
        body: { 
          jobId: job.id,
          enhancedPrompt
        }
      });

      if (generateError) {
        console.error('Error starting 3D generation:', generateError);
        
        // Update job status to error
        await supabaseClient
          .schema('t3d')
          .from('jobs')
          .update({
            status: 'error',
            error_message: generateError.message || 'Failed to start 3D generation'
          })
          .eq('id', job.id);

        return createCorsErrorResponse(`Failed to start 3D generation: ${generateError.message}`, 500);
      }

      console.log('3D generation started for job:', job.id);
    } catch (error) {
      console.error('Generate 3D model function failed:', error);
      
      // Update job status to error
      await supabaseClient
        .schema('t3d')
        .from('jobs')
        .update({
          status: 'error',
          error_message: error.message || 'Failed to start 3D generation'
        })
        .eq('id', job.id);

      return createCorsErrorResponse(`Failed to start 3D generation: ${error.message}`, 500);
    }

    return createCorsResponse({
      success: true,
      promptId: prompt.id,
      jobId: job.id,
      message: '3D generation started successfully'
    });

  } catch (error) {
    console.error('Error in process-prompt function:', error);
    return createCorsErrorResponse(error.message || 'Internal server error', 500);
  }
});
