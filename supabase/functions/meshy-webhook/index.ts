import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders, handleCorsOptions, createCorsResponse, createCorsErrorResponse } from '../_shared/cors.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return handleCorsOptions();
  }

  try {
    console.log('Meshy webhook received');
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // Parse webhook payload
    const body = await req.json();
    console.log('Webhook payload:', JSON.stringify(body, null, 2));

    const { id: meshyTaskId, status, model_urls, thumbnail_url, error } = body;

    if (!meshyTaskId) {
      console.error('Missing task ID in webhook');
      return createCorsErrorResponse('Missing task ID', 400);
    }

    // Find the job with this Meshy task ID
    const { data: jobs, error: jobError } = await supabaseClient
      .from('t3d_jobs')
      .select('id')
      .eq('meshy_task_id', meshyTaskId)
      .limit(1);

    if (jobError) {
      console.error('Error finding job:', jobError);
      return createCorsErrorResponse(`Database error: ${jobError.message}`, 500);
    }

    if (!jobs || jobs.length === 0) {
      console.log('No job found for Meshy task ID:', meshyTaskId);
      return createCorsResponse({ message: 'Job not found', acknowledged: true });
    }

    const jobId = jobs[0].id;
    console.log('Found job:', jobId, 'for Meshy task:', meshyTaskId);

    // Update job based on status
    if (status === 'SUCCEEDED') {
      console.log('Meshy task succeeded, updating job');
      
      // Get the best available model URL
      const resultUrl = model_urls?.glb || model_urls?.obj || model_urls?.usd || thumbnail_url;
      
      if (!resultUrl) {
        console.error('No result URL found in successful Meshy response');
        await supabaseClient.rpc('update_t3d_job', {
          p_job_id: jobId,
          p_status: 'error',
          p_progress: 0,
          p_error_message: 'Meshy completed but no model URL provided'
        });
        return createCorsResponse({ message: 'No result URL', acknowledged: true });
      }

      // Complete the job
      const { error: updateError } = await supabaseClient.rpc('update_t3d_job', {
        p_job_id: jobId,
        p_status: 'done',
        p_progress: 100,
        p_result_url: resultUrl,
        p_error_message: null
      });

      if (updateError) {
        console.error('Error updating job to complete:', updateError);
        return createCorsErrorResponse(`Failed to update job: ${updateError.message}`, 500);
      }

      console.log('Job completed successfully via webhook');

    } else if (status === 'FAILED') {
      console.log('Meshy task failed, updating job');
      
      const errorMessage = error || 'Meshy generation failed';
      
      const { error: updateError } = await supabaseClient.rpc('update_t3d_job', {
        p_job_id: jobId,
        p_status: 'error',
        p_progress: 0,
        p_error_message: `Meshy error: ${errorMessage}`
      });

      if (updateError) {
        console.error('Error updating job to failed:', updateError);
        return createCorsErrorResponse(`Failed to update job: ${updateError.message}`, 500);
      }

      console.log('Job marked as failed via webhook');

    } else if (status === 'IN_PROGRESS') {
      console.log('Meshy task in progress, updating job progress');
      
      // Update progress - estimate based on time elapsed
      const { error: updateError } = await supabaseClient.rpc('update_t3d_job', {
        p_job_id: jobId,
        p_progress: 60 // Mid-progress for in-progress status
      });

      if (updateError) {
        console.error('Error updating job progress:', updateError);
      }

    } else {
      console.log('Unknown Meshy status:', status);
    }

    return createCorsResponse({
      success: true,
      message: 'Webhook processed successfully',
      jobId,
      meshyTaskId,
      status
    });

  } catch (error) {
    console.error('Error in meshy-webhook function:', error);
    return createCorsErrorResponse(error.message || 'Internal server error', 500);
  }
});