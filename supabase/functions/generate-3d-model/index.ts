
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { jobId, enhancedPrompt } = await req.json();

    console.log('Starting 3D generation for job:', jobId);
    console.log('Enhanced prompt:', enhancedPrompt.substring(0, 200) + '...');

    // Update job to processing status
    const { error: updateError } = await supabaseClient
      .from('t3d.jobs')
      .update({ 
        status: 'processing',
        progress: 10
      })
      .eq('id', jobId);

    if (updateError) {
      throw new Error(`Failed to update job status: ${updateError.message}`);
    }

    // Simulate 3D generation process with progress updates
    // In a real implementation, this would call an actual 3D generation service
    const progressSteps = [20, 40, 60, 80, 95, 100];
    
    for (let i = 0; i < progressSteps.length; i++) {
      const progress = progressSteps[i];
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update progress
      await supabaseClient
        .from('t3d.jobs')
        .update({ progress })
        .eq('id', jobId);
      
      console.log(`Job ${jobId} progress: ${progress}%`);
    }

    // For demo purposes, we'll use a placeholder GLB model URL
    // In production, this would be the actual generated model
    const demoModelUrl = 'https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf';
    
    // Complete the job
    const { error: completeError } = await supabaseClient
      .from('t3d.jobs')
      .update({ 
        status: 'completed',
        progress: 100,
        result_url: demoModelUrl
      })
      .eq('id', jobId);

    if (completeError) {
      throw new Error(`Failed to complete job: ${completeError.message}`);
    }

    console.log('3D generation completed for job:', jobId);

    return new Response(
      JSON.stringify({ 
        success: true,
        jobId,
        resultUrl: demoModelUrl,
        message: '3D model generated successfully'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in generate-3d-model function:', error);
    
    // Try to update job to failed status if we have jobId
    const { jobId } = await req.json().catch(() => ({}));
    if (jobId) {
      try {
        const supabaseClient = createClient(
          Deno.env.get('SUPABASE_URL') ?? '',
          Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
        );
        
        await supabaseClient
          .from('t3d.jobs')
          .update({ 
            status: 'failed',
            error_message: error.message
          })
          .eq('id', jobId);
      } catch (updateError) {
        console.error('Failed to update job status to failed:', updateError);
      }
    }

    return new Response(
      JSON.stringify({ 
        error: error.message || 'Internal server error',
        success: false 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
