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
    console.log('Deleting job:', jobId, 'for user:', userId)

    // Use the public wrapper function to delete the job
    const { error: deleteError } = await supabaseClient
      .rpc('delete_job', { p_job_id: jobId, p_user_id: userId })

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