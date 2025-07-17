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
    
    const { jobId } = await req.json()
    console.log('Retrying job:', jobId)

    // Get the authenticated user
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(
      authHeader?.replace('Bearer ', '')
    )

    if (authError || !user) {
      throw new Error('Unauthorized')
    }

    // Check if job exists and belongs to user
    const { data: jobData, error: fetchError } = await supabaseClient
      .from('t3d.jobs')
      .select(`
        *,
        prompts:prompt_id (
          id,
          space_type,
          style,
          description,
          json
        )
      `)
      .eq('id', jobId)
      .eq('user_id', user.id)
      .single()

    if (fetchError || !jobData) {
      throw new Error('Job not found or unauthorized')
    }

    // Only allow retry of failed jobs
    if (jobData.status !== 'failed') {
      throw new Error('Can only retry failed jobs')
    }

    // Reset job to queued status
    const { error: updateError } = await supabaseClient
      .from('t3d.jobs')
      .update({
        status: 'queued',
        progress: 0,
        error_message: null,
        result_url: null,
        updated_at: new Date().toISOString()
      })
      .eq('id', jobId)
      .eq('user_id', user.id)

    if (updateError) {
      throw new Error(updateError.message || 'Failed to retry job')
    }

    // Trigger re-processing by calling generate-3d-model
    if (jobData.prompts) {
      const generateResponse = await supabaseClient.functions.invoke('generate-3d-model', {
        body: { 
          jobId: jobId, 
          enhancedPrompt: jobData.prompts.description 
        }
      });

      if (generateResponse.error) {
        console.error('Failed to restart 3D generation:', generateResponse.error);
        // Update job status back to failed
        await supabaseClient
          .from('t3d.jobs')
          .update({
            status: 'failed',
            error_message: 'Failed to restart 3D generation'
          })
          .eq('id', jobId)
          .eq('user_id', user.id)
        
        throw new Error('Failed to restart 3D generation')
      }
    }

    console.log('Job retry initiated successfully:', jobId)

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Job retry initiated successfully' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error in retry-job function:', error)
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