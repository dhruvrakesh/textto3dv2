import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { HfInference } from 'https://esm.sh/@huggingface/inference@2.3.2'
import { corsHeaders, handleCorsOptions, createCorsResponse, createCorsErrorResponse } from '../_shared/cors.ts'

serve(async (req) => {
  console.log('=== GENERATE-3D-MODEL FUNCTION STARTED ===');
  console.log('Timestamp:', new Date().toISOString());
  console.log('Request method:', req.method);
  console.log('Request URL:', req.url);
  
  if (req.method === 'OPTIONS') {
    console.log('Handling CORS preflight');
    return handleCorsOptions();
  }

  try {
    // Log environment variables (safely)
    console.log('=== ENVIRONMENT CHECK ===');
    console.log('SUPABASE_URL exists:', !!Deno.env.get('SUPABASE_URL'));
    console.log('SUPABASE_SERVICE_ROLE_KEY exists:', !!Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'));
    console.log('HUGGING_FACE_ACCESS_TOKEN exists:', !!Deno.env.get('HUGGING_FACE_ACCESS_TOKEN'));
    console.log('MESHY_API_KEY exists:', !!Deno.env.get('MESHY_API_KEY'));
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error('Missing required Supabase environment variables');
    }
    
    console.log('Creating Supabase client...');
    const supabaseClient = createClient(supabaseUrl, serviceRoleKey);
    console.log('Supabase client created successfully');

    console.log('=== PARSING REQUEST BODY ===');
    const requestBody = await req.json();
    console.log('Raw request body:', JSON.stringify(requestBody, null, 2));
    
    const { jobId, enhancedPrompt, modelPreferences = {} } = requestBody;
    console.log('Extracted jobId:', jobId);
    console.log('Enhanced prompt length:', enhancedPrompt?.length || 0);
    console.log('Model preferences:', JSON.stringify(modelPreferences, null, 2));

    if (!jobId) {
      console.error('Missing jobId in request');
      return createCorsErrorResponse('Job ID is required', 400);
    }

    // Update job status to running
    console.log('=== UPDATING JOB STATUS TO RUNNING ===');
    console.log('Calling update_t3d_job RPC with:', {
      p_job_id: jobId,
      p_status: 'running',
      p_progress: 10
    });
    
    const { data: updateData, error: updateError } = await supabaseClient
      .rpc('update_t3d_job', {
        p_job_id: jobId,
        p_status: 'running',
        p_progress: 10,
        p_result_url: null
      });

    console.log('RPC update_t3d_job response data:', updateData);
    console.log('RPC update_t3d_job error:', updateError);

    if (updateError) {
      console.error('=== RPC UPDATE ERROR ===');
      console.error('Error type:', typeof updateError);
      console.error('Error message:', updateError.message);
      console.error('Error details:', JSON.stringify(updateError, null, 2));
      console.error('Error stack:', updateError.stack);
      return createCorsErrorResponse(`Failed to update job status: ${updateError.message}`, 500);
    }
    
    console.log('Job status updated successfully to running');

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
      console.log('=== ATTEMPTING HUGGING FACE GENERATION ===');
      
      try {
      const hfToken = Deno.env.get('HUGGING_FACE_ACCESS_TOKEN');
      console.log('HF token exists:', !!hfToken);
      console.log('HF token length:', hfToken?.length || 0);
      
      if (!hfToken) {
        throw new Error('Hugging Face token not configured');
      }

      console.log('Creating HfInference client...');
      const hf = new HfInference(hfToken);
      console.log('HfInference client created successfully');
      
      // Update progress
      console.log('Updating progress to 30...');
      const { data: progressData, error: progressError } = await supabaseClient.rpc('update_t3d_job', {
        p_job_id: jobId,
        p_progress: 30,
        p_status: null,
        p_result_url: null
      });
      
      if (progressError) {
        console.error('Progress update error:', progressError);
      } else {
        console.log('Progress updated successfully:', progressData);
      }

      // Try Hunyuan3D-2.1 model for 3D generation
      console.log('=== CALLING HUGGING FACE API ===');
      console.log('Model: tencent/Hunyuan3D-2.1');
      console.log('Prompt preview:', enhancedPrompt?.substring(0, 100) + '...');
      console.log('Full prompt length:', enhancedPrompt?.length || 0);
      
      console.log('Making HF API request...');
      const requestStartTime = Date.now();
      
      const result = await hf.request({
        model: "tencent/Hunyuan3D-2.1",
        inputs: enhancedPrompt || "A detailed 3D model",
        parameters: {
          steps: 50,
          guidance_scale: 7.5,
          seed: Math.floor(Math.random() * 1000000)
        }
      });
      
      const requestDuration = Date.now() - requestStartTime;
      console.log('HF API request completed in:', requestDuration, 'ms');
      console.log('HF API result type:', typeof result);
      console.log('HF API result keys:', result ? Object.keys(result) : 'null');
      console.log('HF API result preview:', JSON.stringify(result, null, 2).substring(0, 500));

      // Update progress
      console.log('Updating progress to 80...');
      const { data: progress80Data, error: progress80Error } = await supabaseClient.rpc('update_t3d_job', {
        p_job_id: jobId,
        p_status: null,
        p_progress: 80,
        p_result_url: null
      });
      
      if (progress80Error) {
        console.error('Progress 80 update error:', progress80Error);
      } else {
        console.log('Progress 80 updated successfully:', progress80Data);
      }

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
          p_result_url: resultUrl
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
      console.error('=== HUGGING FACE ERROR ===');
      console.error('Error type:', typeof hfError);
      console.error('Error name:', hfError.name);
      console.error('Error message:', hfError.message);
      console.error('Error stack:', hfError.stack);
      console.error('Error details:', JSON.stringify(hfError, null, 2));
      
      if (selectedService === 'huggingface_only') {
        console.log('Hugging Face only mode - not trying fallback');
        
        console.log('Updating job status to error...');
        const { data: errorData, error: errorUpdateError } = await supabaseClient
          .rpc('update_t3d_job', {
            p_job_id: jobId,
            p_status: 'error',
            p_progress: 0,
            p_result_url: `Hugging Face generation failed: ${hfError.message}`
          });
          
        if (errorUpdateError) {
          console.error('Error updating job to error status:', errorUpdateError);
        } else {
          console.log('Job updated to error status successfully:', errorData);
        }
        
        return createCorsErrorResponse(`Hugging Face generation failed: ${hfError.message}`, 500);
      }
      console.log('Hugging Face failed, will try fallback service if available');
    }
    }
    
    // Phase 2: Try Meshy (either as fallback or primary)
    if (shouldTryMeshy) {
      console.log('=== ATTEMPTING MESHY GENERATION ===');
      try {
        const meshyApiKey = Deno.env.get('MESHY_API_KEY');
        console.log('Meshy API key exists:', !!meshyApiKey);
        console.log('Meshy API key length:', meshyApiKey?.length || 0);
        
        if (!meshyApiKey) {
          throw new Error('Meshy API key not configured');
        }

        console.log('Starting Meshy 3D generation...');
        
        // Update progress
        console.log('Updating progress to 40...');
        const { data: progress40Data, error: progress40Error } = await supabaseClient.rpc('update_t3d_job', {
          p_job_id: jobId,
          p_status: null,
          p_progress: 40,
          p_result_url: null
        });
        
        if (progress40Error) {
          console.error('Progress 40 update error:', progress40Error);
        } else {
          console.log('Progress 40 updated successfully:', progress40Data);
        }

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
        console.log('Webhook URL:', webhookUrl);
        
        const meshyRequestBody = {
          mode: mode,
          prompt: enhancedPrompt || 'A detailed 3D model',
          art_style: artStyle,
          negative_prompt: 'low quality, blurry, distorted',
          webhook_url: webhookUrl
        };
        
        console.log('=== CALLING MESHY API ===');
        console.log('Request body:', JSON.stringify(meshyRequestBody, null, 2));
        console.log('Making request to: https://api.meshy.ai/v2/text-to-3d');
        
        const meshyRequestStartTime = Date.now();
        const meshyCreateResponse = await fetch('https://api.meshy.ai/v2/text-to-3d', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${meshyApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(meshyRequestBody),
        });
        
        const meshyRequestDuration = Date.now() - meshyRequestStartTime;
        console.log('Meshy API request completed in:', meshyRequestDuration, 'ms');
        console.log('Meshy response status:', meshyCreateResponse.status);
        console.log('Meshy response headers:', JSON.stringify(Object.fromEntries(meshyCreateResponse.headers.entries()), null, 2));

        if (!meshyCreateResponse.ok) {
          const errorText = await meshyCreateResponse.text();
          console.error('Meshy API error response:', errorText);
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
          p_status: null,
          p_progress: 60,
          p_result_url: null
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
            p_status: null,
            p_progress: Math.min(progress, 95),
            p_result_url: null
          });

          if (status.status === 'SUCCEEDED') {
            completed = true;
            
            // Complete the job
            const { error: completeError } = await supabaseClient
              .rpc('update_t3d_job', {
                p_job_id: jobId,
                p_status: 'done',
                p_progress: 100,
                p_result_url: status.model_urls?.glb || status.model_urls?.obj || status.thumbnail_url
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
        console.error('=== MESHY ERROR ===');
        console.error('Error type:', typeof meshyError);
        console.error('Error name:', meshyError.name);
        console.error('Error message:', meshyError.message);
        console.error('Error stack:', meshyError.stack);
        console.error('Error details:', JSON.stringify(meshyError, null, 2));
        
        if (selectedService === 'meshy_only') {
          console.log('Meshy only mode - not trying fallback');
          
          console.log('Updating job status to error (Meshy only)...');
          const { data: meshyErrorData, error: meshyErrorUpdateError } = await supabaseClient
            .rpc('update_t3d_job', {
              p_job_id: jobId,
              p_status: 'error',
              p_progress: 0,
              p_result_url: `Meshy generation failed: ${meshyError.message}`
            });
            
          if (meshyErrorUpdateError) {
            console.error('Error updating job to error status (Meshy):', meshyErrorUpdateError);
          } else {
            console.log('Job updated to error status successfully (Meshy):', meshyErrorData);
          }
          
          return createCorsErrorResponse(`Meshy generation failed: ${meshyError.message}`, 500);
        }

        // Update job with error status
        console.log('Updating job status to error (all services failed)...');
        const { data: allFailedData, error: allFailedUpdateError } = await supabaseClient
          .rpc('update_t3d_job', {
            p_job_id: jobId,
            p_status: 'error',
            p_progress: 0,
            p_result_url: `All available services failed. Service preference: ${selectedService}. Last error: ${meshyError.message}`
          });
          
        if (allFailedUpdateError) {
          console.error('Error updating job to error status (all failed):', allFailedUpdateError);
        } else {
          console.log('Job updated to error status successfully (all failed):', allFailedData);
        }

        return createCorsErrorResponse(`All 3D generation services failed. Last error: ${meshyError.message}`, 500);
      }
    }

    // If we get here, no services were attempted or available
    await supabaseClient
      .rpc('update_t3d_job', {
        p_job_id: jobId,
        p_status: 'error',
        p_progress: 0,
        p_result_url: `No 3D generation services available for the selected preference: ${selectedService}`
      });

    return createCorsErrorResponse(`No 3D generation services available for the selected preference: ${selectedService}`, 500);

  } catch (error) {
    console.error('=== GENERATE-3D-MODEL FUNCTION ERROR ===');
    console.error('Error type:', typeof error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Error details:', JSON.stringify(error, null, 2));
    console.error('Function execution completed with error at:', new Date().toISOString());
    return createCorsErrorResponse(error.message || 'Internal server error', 500);
  }
});