
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

    const { p_user_id } = await req.json()
    console.log('Fetching jobs for user:', p_user_id)

    // Query t3d schema directly using service role key
    const { data: jobs, error } = await supabaseClient
      .from('t3d.jobs')
      .select(`
        *,
        prompts:t3d.prompts!inner (
          id,
          space_type,
          style,
          description,
          json
        )
      `)
      .eq('user_id', p_user_id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error)
      throw error;
    }

    console.log('Jobs fetched successfully:', jobs?.length || 0)

    return new Response(
      JSON.stringify(jobs || []),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error in get-user-jobs function:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Internal server error'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
