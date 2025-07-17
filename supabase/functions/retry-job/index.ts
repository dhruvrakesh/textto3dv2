import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

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
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    // Get the authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Authorization header missing or invalid');
    }
    
    const token = authHeader.replace('Bearer ', '')
    const { userId } = decodeJWT(token)
    
    const { jobId } = await req.json()
    console.log('Retrying job:', jobId, 'for user:', userId)

    // Reset the job status to queued so it can be processed again using the t3d function
    const { error: retryError } = await supabaseClient
      .rpc('t3d.update_job_status', {
        p_job_id: jobId,
        p_status: 'queued',
        p_progress: 0,
        p_error_message: null
      })

    if (retryError) {
      console.error('Retry job error:', retryError)
      throw new Error(retryError.message || 'Failed to retry job')
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