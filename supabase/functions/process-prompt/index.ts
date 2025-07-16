
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

    // Insert prompt into t3d.prompts table
    const { data: prompt, error: promptError } = await supabaseClient
      .schema('t3d')
      .from('prompts')
      .insert({
        user_id: user.id,
        json: promptData,
        version: 1
      })
      .select()
      .single()

    if (promptError) {
      console.error('Error creating prompt:', promptError)
      throw new Error(`Failed to create prompt: ${promptError.message || JSON.stringify(promptError)}`)
    }

    // Create corresponding job in t3d.jobs table
    const { data: job, error: jobError } = await supabaseClient
      .schema('t3d')
      .from('jobs')
      .insert({
        prompt_id: prompt.id,
        user_id: user.id,
        job_type: '3d_model_generation',
        status: 'queued',
        progress: 0
      })
      .select()
      .single()

    if (jobError) {
      console.error('Error creating job:', jobError)
      throw new Error(`Failed to create job: ${jobError.message || JSON.stringify(jobError)}`)
    }

    console.log('Created job:', job.id)

    // Start the 3D generation process asynchronously
    const generateResponse = await supabaseClient.functions.invoke('generate-3d-model', {
      body: { 
        jobId: job.id, 
        enhancedPrompt: promptData.description 
      }
    });

    if (generateResponse.error) {
      console.error('Failed to start 3D generation:', generateResponse.error);
      // Update job status to failed
      await supabaseClient
        .schema('t3d')
        .from('jobs')
        .update({ 
          status: 'failed',
          error_message: 'Failed to start 3D generation'
        })
        .eq('id', job.id);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        promptId: prompt.id,
        jobId: job.id,
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
