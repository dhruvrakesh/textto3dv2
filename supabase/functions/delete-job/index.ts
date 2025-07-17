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
    console.log('Deleting job:', jobId)

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
      .select('*')
      .eq('id', jobId)
      .eq('user_id', user.id)
      .single()

    if (fetchError || !jobData) {
      throw new Error('Job not found or unauthorized')
    }

    // Don't allow deletion of processing jobs
    if (jobData.status === 'processing') {
      throw new Error('Cannot delete job that is currently processing')
    }

    // Delete the job
    const { error: deleteError } = await supabaseClient
      .from('t3d.jobs')
      .delete()
      .eq('id', jobId)
      .eq('user_id', user.id)

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