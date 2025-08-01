
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Replicate from "https://esm.sh/replicate@0.25.2"
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
      .schema('t3d')
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

    // Initialize Replicate client
    const replicate = new Replicate({
      auth: Deno.env.get('REPLICATE_API_TOKEN'),
    });

    try {
      console.log('Starting real 3D model generation with prompt:', enhancedPrompt);

      // Start the 3D generation prediction
      const prediction = await replicate.predictions.create({
        model: "tencent/hunyuan3d-2",
        input: {
          prompt: enhancedPrompt || "A detailed 3D model",
          seed: Math.floor(Math.random() * 1000000),
          steps: 50,
          guidance_scale: 7.5
        },
        webhook: `${Deno.env.get('SUPABASE_URL')}/functions/v1/replicate-webhook`,
        webhook_events_filter: ["start", "output", "logs", "completed"]
      });

      console.log('Replicate prediction created:', prediction.id);

      // Update job with prediction ID and progress
      await supabaseClient
        .schema('t3d')
        .from('jobs')
        .update({
          progress: 25,
          replicate_prediction_id: prediction.id,
          updated_at: new Date().toISOString()
        })
        .eq('id', jobId);

      // Poll for completion (with timeout)
      let completed = false;
      let attempts = 0;
      const maxAttempts = 60; // 5 minutes max
      
      while (!completed && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
        attempts++;

        const status = await replicate.predictions.get(prediction.id);
        console.log(`Prediction ${prediction.id} status:`, status.status);

        // Update progress based on status
        let progress = 25;
        if (status.status === 'processing') {
          progress = 25 + (attempts * 2); // Gradually increase progress
        } else if (status.status === 'succeeded') {
          progress = 100;
          completed = true;
        } else if (status.status === 'failed' || status.status === 'canceled') {
          throw new Error(`3D generation ${status.status}: ${status.error || 'Unknown error'}`);
        }

        // Update job progress
        await supabaseClient
          .schema('t3d')
          .from('jobs')
          .update({
            progress: Math.min(progress, 95),
            updated_at: new Date().toISOString()
          })
          .eq('id', jobId);

        if (completed && status.output) {
          // Extract the GLB file URL from the output
          const resultUrl = Array.isArray(status.output) ? status.output[0] : status.output;
          
          // Complete the job
          const { error: completeError } = await supabaseClient
            .schema('t3d')
            .from('jobs')
            .update({
              status: 'done',
              progress: 100,
              result_url: resultUrl,
              error_message: null,
              updated_at: new Date().toISOString()
            })
            .eq('id', jobId);

          if (completeError) {
            console.error('Error completing job:', completeError);
            return createCorsErrorResponse(`Failed to complete job: ${completeError.message}`, 500);
          }

          console.log('3D model generation completed successfully:', jobId);

          return createCorsResponse({
            success: true,
            jobId,
            message: '3D model generated successfully',
            predictionId: prediction.id,
            resultUrl
          });
        }
      }

      // If we reach here, it timed out
      throw new Error('3D generation timed out after 5 minutes');

    } catch (generationError) {
      console.error('3D generation failed:', generationError);

      // Update job with error status
      await supabaseClient
        .schema('t3d')
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
