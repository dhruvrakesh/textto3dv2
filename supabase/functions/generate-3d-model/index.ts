
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

    const { jobId, enhancedPrompt } = await req.json();
    console.log('Generating 3D model for job:', jobId);

    if (!jobId) {
      return createCorsErrorResponse('Job ID is required', 400);
    }

    // Update job status to running
    const { error: updateError } = await supabaseClient
      .from('jobs')
      .update({
        status: 'running',
        progress: 10,
        updated_at: new Date().toISOString()
      })
      .eq('id', jobId);

    if (updateError) {
      console.error('Error updating job status:', updateError);
      return createCorsErrorResponse(`Failed to update job status: ${updateError.message}`, 500);
    }

    // For now, simulate the 3D model generation with a demo model
    // In a real implementation, this would call an actual 3D generation service
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update progress
      await supabaseClient
        .from('jobs')
        .update({
          progress: 50,
          updated_at: new Date().toISOString()
        })
        .eq('id', jobId);

      // Simulate more processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // For demo purposes, use a demo 3D model URL
      const demoModelUrl = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF/DamagedHelmet.gltf';

      // Complete the job
      const { error: completeError } = await supabaseClient
        .from('jobs')
        .update({
          status: 'done',
          progress: 100,
          result_url: demoModelUrl,
          error_message: 'Demo model - AI services are not currently available, showing sample 3D model instead',
          updated_at: new Date().toISOString()
        })
        .eq('id', jobId);

      if (completeError) {
        console.error('Error completing job:', completeError);
        return createCorsErrorResponse(`Failed to complete job: ${completeError.message}`, 500);
      }

      console.log('Job completed successfully:', jobId);

      return createCorsResponse({
        success: true,
        jobId,
        message: 'Demo 3D model generated successfully',
        demoMode: true
      });

    } catch (generationError) {
      console.error('3D generation failed:', generationError);

      // Update job with error status
      await supabaseClient
        .from('jobs')
        .update({
          status: 'error',
          progress: 0,
          error_message: generationError.message || '3D model generation failed',
          updated_at: new Date().toISOString()
        })
        .eq('id', jobId);

      return createCorsErrorResponse(`3D generation failed: ${generationError.message}`, 500);
    }

  } catch (error) {
    console.error('Error in generate-3d-model function:', error);
    return createCorsErrorResponse(error.message || 'Internal server error', 500);
  }
});
