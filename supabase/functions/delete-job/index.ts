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
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    // Get the authorization header
    const authHeader = req.headers.get('Authorization')!
    
    const { jobId } = await req.json()
    console.log('Deleting job:', jobId)

    // Set the authorization header for the client
    supabaseClient.auth.setSession({
      access_token: authHeader?.replace('Bearer ', '') || '',
      refresh_token: ''
    })

    // Use the RPC function to delete the job
    const { error: deleteError } = await supabaseClient
      .rpc('delete_job', { p_job_id: jobId })

    if (deleteError) {
      console.error('Delete job error:', deleteError)
      throw new Error(deleteError.message || 'Failed to delete job')
    }

    console.log('Job deleted successfully:', jobId)

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Job deleted successfully' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error in delete-job function:', error)
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