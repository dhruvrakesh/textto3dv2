
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders, handleCorsOptions, createCorsResponse, createCorsErrorResponse } from '../_shared/cors.ts'

// Helper function to decode JWT and extract user_id
function decodeJWT(token: string): { userId: string } {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT format');
    }
    
    const payload = JSON.parse(atob(parts[1]));
    return { userId: payload.sub };
  } catch (error) {
    throw new Error('Failed to decode JWT token');
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return handleCorsOptions();
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return createCorsErrorResponse('Authorization header missing or invalid', 401);
    }
    
    const token = authHeader.replace('Bearer ', '');
    const { userId } = decodeJWT(token);
    
    const { jobId } = await req.json();
    console.log('Retrying job:', jobId, 'for user:', userId);

    if (!jobId) {
      return createCorsErrorResponse('Job ID is required', 400);
    }

    // First, verify the job exists and belongs to the user using RPC function
    const { data: existingJob, error: fetchError } = await supabaseClient
      .rpc('get_t3d_job_by_id', {
        p_job_id: jobId
      })
      .single();

    // Check if job belongs to user (RPC doesn't enforce user filtering for security)
    if (existingJob && existingJob.user_id !== userId) {
      return createCorsErrorResponse('Job not found or access denied', 404);
    }

    if (fetchError || !existingJob) {
      console.error('Job not found or access denied:', fetchError);
      return createCorsErrorResponse('Job not found or access denied', 404);
    }

    // Only allow retry for failed jobs
    if (existingJob.status !== 'error' && existingJob.status !== 'failed') {
      return createCorsErrorResponse('Job can only be retried if it has failed', 400);
    }

    // Reset the job status using RPC function
    const { error: resetError } = await supabaseClient
      .rpc('update_t3d_job', {
        p_job_id: jobId,
        p_status: 'queued',
        p_progress: 0,
        p_error_message: null,
        p_result_url: null
      });

    if (resetError) {
      console.error('Failed to reset job:', resetError);
      return createCorsErrorResponse(`Failed to reset job: ${resetError.message}`, 500);
    }

    // Get the associated prompt using RPC function
    const { data: prompt, error: promptError } = await supabaseClient
      .rpc('get_t3d_prompt_by_id', {
        p_prompt_id: existingJob.prompt_id
      })
      .single();

    if (promptError || !prompt) {
      console.error('Failed to fetch prompt data:', promptError);
      return createCorsErrorResponse('Failed to fetch prompt data for retry', 500);
    }

    // Start the 3D generation process again
    try {
        const { error: generateError } = await supabaseClient.functions.invoke('generate-3d-model', {
        body: { 
          jobId: jobId,
          enhancedPrompt: prompt.json?.description || 'Generate a 3D model'
        }
      });

      if (generateError) {
        console.error('Failed to restart generation:', generateError);
        
        // Update job back to error status using RPC function
        await supabaseClient
          .rpc('update_t3d_job', {
            p_job_id: jobId,
            p_status: 'error',
            p_error_message: `Retry failed: ${generateError.message}`
          });

        return createCorsErrorResponse(`Failed to restart generation: ${generateError.message}`, 500);
      }

      console.log('Job retry initiated successfully:', jobId);

      return createCorsResponse({ 
        success: true,
        message: 'Job retry initiated successfully',
        jobId: jobId
      });

    } catch (error) {
      console.error('Error calling generate-3d-model:', error);
      
      // Update job back to error status using RPC function
      await supabaseClient
        .rpc('update_t3d_job', {
          p_job_id: jobId,
          p_status: 'error',
          p_error_message: `Retry failed: ${error.message}`
        });

      return createCorsErrorResponse(`Retry failed: ${error.message}`, 500);
    }

  } catch (error) {
    console.error('Error in retry-job function:', error);
    return createCorsErrorResponse(error.message || 'Internal server error', 500);
  }
});
