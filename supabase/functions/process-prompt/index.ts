
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    // Get the authorization header
    const authHeader = req.headers.get('Authorization')!
    
    const { promptData } = await req.json()
    console.log('Processing prompt:', promptData)

    // Get the authenticated user
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(
      authHeader?.replace('Bearer ', '')
    )

    if (authError || !user) {
      throw new Error('Unauthorized')
    }

    // Use security definer function to create prompt and job
    const { data: result, error: createError } = await supabaseClient
      .rpc('t3d.create_prompt_and_job', {
        p_user_id: user.id,
        p_prompt_data: promptData,
        p_job_type: '3d_model_generation'
      })

    if (createError || !result || result.length === 0) {
      console.error('Error creating prompt and job:', createError)
      throw new Error(`Failed to create prompt and job: ${createError?.message || 'Unknown error'}`)
    }

    const { prompt_id, job_id } = result[0]

    console.log('Created job:', job_id)

    // Start the 3D generation process asynchronously
    const generateResponse = await supabaseClient.functions.invoke('generate-3d-model', {
      body: { 
        jobId: job_id, 
        enhancedPrompt: promptData.description 
      }
    });

    if (generateResponse.error) {
      console.error('Failed to start 3D generation:', generateResponse.error);
      // Update job status to failed using secure function
      await supabaseClient.rpc('t3d.update_job_status', {
        p_job_id: job_id,
        p_status: 'failed',
        p_error_message: 'Failed to start 3D generation'
      });
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        promptId: prompt_id,
        jobId: job_id,
        message: 'Prompt processed and 3D generation started' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error in process-prompt function:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Internal server error',
        success: false 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
