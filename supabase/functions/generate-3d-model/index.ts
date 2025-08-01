import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { HfInference } from 'https://esm.sh/@huggingface/inference@2.3.2'
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

    const { jobId, enhancedPrompt, modelPreferences = {} } = await req.json();
    console.log('Starting hybrid 3D generation for job:', jobId);
    console.log('Model preferences:', modelPreferences);

    if (!jobId) {
      return createCorsErrorResponse('Job ID is required', 400);
    }

    // Update job status to running
    const { error: updateError } = await supabaseClient
      .rpc('update_t3d_job', {
        p_job_id: jobId,
        p_status: 'running',
        p_progress: 10
      });

    if (updateError) {
      console.error('Error updating job status:', updateError);
      return createCorsErrorResponse(`Failed to update job status: ${updateError.message}`, 500);
    }

    // Determine generation strategy based on user preferences
    const selectedService = modelPreferences.selected_service || 'auto';
    const selectedModel = modelPreferences.selected_model || 'auto';
    const qualityLevel = modelPreferences.quality_level || 'standard';
    
    console.log(`Generation strategy: Service=${selectedService}, Model=${selectedModel}, Quality=${qualityLevel}`);

    // Phase 1: Try primary service based on preference
    let shouldTryHuggingFace = selectedService === 'huggingface_first' || selectedService === 'huggingface_only' || selectedService === 'auto';
    let shouldTryMeshy = selectedService === 'meshy_first' || selectedService === 'meshy_only' || selectedService === 'auto';
    
    if (selectedService === 'meshy_first') {
      // Swap order - try Meshy first
      const temp = shouldTryHuggingFace;
      shouldTryHuggingFace = shouldTryMeshy;
      shouldTryMeshy = temp;
    }

    if (shouldTryHuggingFace) {
      console.log('Attempting 3D generation with Hugging Face...');
      
      try {
      const hfToken = Deno.env.get('HUGGING_FACE_ACCESS_TOKEN');
      if (!hfToken) {
        throw new Error('Hugging Face token not configured');
      }

      const hf = new HfInference(hfToken);
      
      // Update progress
      await supabaseClient.rpc('update_t3d_job', {
        p_job_id: jobId,
        p_progress: 30
      });

      // Try Hunyuan3D-2.1 model for 3D generation
      console.log('Using Hugging Face Hunyuan3D model with prompt:', enhancedPrompt?.substring(0, 100) + '...');
      
      const result = await hf.request({
        model: "tencent/Hunyuan3D-2.1",
        inputs: enhancedPrompt || "A detailed 3D model",
        parameters: {
          steps: 50,
          guidance_scale: 7.5,
          seed: Math.floor(Math.random() * 1000000)
        }
      });

      // Update progress
      await supabaseClient.rpc('update_t3d_job', {
        p_job_id: jobId,
        p_progress: 80
      });

      // Process the result (assuming it returns a URL or blob data)
      let resultUrl;
      if (result && typeof result === 'object' && result.url) {
        resultUrl = result.url;
      } else if (result && result instanceof Blob) {
        // Handle blob data if needed
        resultUrl = URL.createObjectURL(result);
      } else {
        throw new Error('Unexpected result format from Hugging Face');
      }

      // Complete the job
      const { error: completeError } = await supabaseClient
        .rpc('update_t3d_job', {
          p_job_id: jobId,
          p_status: 'done',
          p_progress: 100,
          p_result_url: resultUrl,
          p_error_message: null
        });

      if (completeError) {
        console.error('Error completing job:', completeError);
        return createCorsErrorResponse(`Failed to complete job: ${completeError.message}`, 500);
      }

      console.log('3D model generation completed successfully with Hugging Face:', jobId);

      return createCorsResponse({
        success: true,
        jobId,
        message: '3D model generated successfully using Hugging Face',
        service: 'huggingface',
        resultUrl
      });

    } catch (hfError) {
      console.log('Hugging Face failed:', hfError.message);
      if (selectedService === 'huggingface_only') {
        console.log('Hugging Face only mode - not trying fallback');
        await supabaseClient
          .rpc('update_t3d_job', {
            p_job_id: jobId,
            p_status: 'error',
            p_progress: 0,
            p_error_message: `Hugging Face generation failed: ${hfError.message}`
          });
        return createCorsErrorResponse(`Hugging Face generation failed: ${hfError.message}`, 500);
      }
    }
    }
    
    // Phase 2: Try Meshy (either as fallback or primary)
    if (shouldTryMeshy) {
      console.log('Attempting 3D generation with Meshy...');
      try {
        const meshyApiKey = Deno.env.get('MESHY_API_KEY');
        if (!meshyApiKey) {
          throw new Error('Meshy API key not configured');
        }

        console.log('Starting Meshy 3D generation...');
        
        // Update progress
        await supabaseClient.rpc('update_t3d_job', {
          p_job_id: jobId,
          p_progress: 40
        });

        // Determine Meshy settings based on model preference and quality
        let mode = 'preview';
        let artStyle = 'realistic';
        
        if (selectedModel === 'meshy_refine' || qualityLevel === 'high') {
          mode = 'refine';
        }
        
        if (selectedModel === 'meshy_preview' || qualityLevel === 'draft') {
          mode = 'preview';
        }

        console.log(`Using Meshy mode: ${mode}, art style: ${artStyle}`);

        // Step 1: Create Meshy text-to-3D task with webhook
        const webhookUrl = `${Deno.env.get('SUPABASE_URL')}/functions/v1/meshy-webhook`;
        
        const meshyCreateResponse = await fetch('https://api.meshy.ai/v2/text-to-3d', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${meshyApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mode: mode,
            prompt: enhancedPrompt || 'A detailed 3D model',
            art_style: artStyle,
            negative_prompt: 'low quality, blurry, distorted',
            webhook_url: webhookUrl
          }),
        });

        if (!meshyCreateResponse.ok) {
          const errorText = await meshyCreateResponse.text();
          throw new Error(`Meshy API error: ${meshyCreateResponse.status} - ${errorText}`);
        }

        const meshyTask = await meshyCreateResponse.json();
        console.log('Meshy task created:', meshyTask.result);

        // Store the Meshy task ID in the job for webhook processing
        await supabaseClient
          .from('t3d_jobs')
          .update({ meshy_task_id: meshyTask.result })
          .eq('id', jobId);

        // Update progress
        await supabaseClient.rpc('update_t3d_job', {
          p_job_id: jobId,
          p_progress: 60
        });

        console.log('Meshy task created with webhook, job will complete automatically');
        
        return createCorsResponse({
          success: true,
          jobId,
          message: 'Meshy 3D generation started with webhook',
          service: 'meshy',
          taskId: meshyTask.result,
          mode: mode
        });

        // Note: The webhook will handle completion
        /* Legacy polling code removed - now handled by webhook
        // Step 2: Poll for completion
        let completed = false;
        let attempts = 0;
        const maxAttempts = 60; // 5 minutes max
        
        while (!completed && attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
          attempts++;

          const statusResponse = await fetch(`https://api.meshy.ai/v2/text-to-3d/${meshyTask.result}`, {
            headers: {
              'Authorization': `Bearer ${meshyApiKey}`,
            },
          });

          if (!statusResponse.ok) {
            throw new Error(`Meshy status check failed: ${statusResponse.status}`);
          }

          const status = await statusResponse.json();
          console.log(`Meshy task ${meshyTask.result} status:`, status.status);

          // Update progress
          let progress = 60 + (attempts * 1);
          await supabaseClient.rpc('update_t3d_job', {
            p_job_id: jobId,
            p_progress: Math.min(progress, 95)
          });

          if (status.status === 'SUCCEEDED') {
            completed = true;
            
            // Complete the job
            const { error: completeError } = await supabaseClient
              .rpc('update_t3d_job', {
                p_job_id: jobId,
                p_status: 'done',
                p_progress: 100,
                p_result_url: status.model_urls?.glb || status.model_urls?.obj || status.thumbnail_url,
                p_error_message: null
              });

            if (completeError) {
              console.error('Error completing job:', completeError);
              return createCorsErrorResponse(`Failed to complete job: ${completeError.message}`, 500);
            }

            console.log('3D model generation completed successfully with Meshy:', jobId);

            return createCorsResponse({
              success: true,
              jobId,
              message: '3D model generated successfully using Meshy (fallback)',
              service: 'meshy',
              resultUrl: status.model_urls?.glb || status.model_urls?.obj || status.thumbnail_url
            });

          } else if (status.status === 'FAILED') {
            throw new Error(`Meshy generation failed: ${status.error || 'Unknown error'}`);
          }
        }

        // If we reach here, it timed out
        throw new Error('Meshy generation timed out after 5 minutes');
        */ // End of legacy polling code

      } catch (meshyError) {
        console.error('Meshy failed:', meshyError.message);
        
        if (selectedService === 'meshy_only') {
          console.log('Meshy only mode - not trying fallback');
          await supabaseClient
            .rpc('update_t3d_job', {
              p_job_id: jobId,
              p_status: 'error',
              p_progress: 0,
              p_error_message: `Meshy generation failed: ${meshyError.message}`
            });
          return createCorsErrorResponse(`Meshy generation failed: ${meshyError.message}`, 500);
        }

        // Update job with error status
        await supabaseClient
          .rpc('update_t3d_job', {
            p_job_id: jobId,
            p_status: 'error',
            p_progress: 0,
            p_error_message: `All available services failed. Service preference: ${selectedService}. Last error: ${meshyError.message}`
          });

        return createCorsErrorResponse(`All 3D generation services failed. Last error: ${meshyError.message}`, 500);
      }
    }

    // If we get here, no services were attempted or available
    await supabaseClient
      .rpc('update_t3d_job', {
        p_job_id: jobId,
        p_status: 'error',
        p_progress: 0,
        p_error_message: `No 3D generation services available for the selected preference: ${selectedService}`
      });

    return createCorsErrorResponse(`No 3D generation services available for the selected preference: ${selectedService}`, 500);

  } catch (error) {
    console.error('Error in generate-3d-model function:', error);
    return createCorsErrorResponse(error.message || 'Internal server error', 500);
  }
});