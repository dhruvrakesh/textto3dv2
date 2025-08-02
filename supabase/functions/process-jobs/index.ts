import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('=== PROCESS-JOBS FUNCTION STARTED ===');
  console.log('Timestamp:', new Date().toISOString());
  console.log('Request method:', req.method);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling CORS preflight');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('=== ENVIRONMENT CHECK ===');
    console.log('SUPABASE_URL exists:', !!Deno.env.get('SUPABASE_URL'));
    console.log('SUPABASE_SERVICE_ROLE_KEY exists:', !!Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'));
    
    console.log('Creating Supabase client...');
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    console.log('Supabase client created successfully');

    // Process queued jobs - call the public wrapper function
    console.log('=== CALLING PROCESS_QUEUED_JOBS RPC ===');
    const { data: processData, error: processError } = await supabase.rpc('process_queued_jobs');
    console.log('process_queued_jobs response data:', processData);
    console.log('process_queued_jobs error:', processError);
    
    if (processError) {
      console.error('Error processing jobs:', JSON.stringify(processError, null, 2));
      throw processError;
    }

    // Clean up stuck jobs - call the public wrapper function
    console.log('=== CALLING CLEANUP_STUCK_JOBS RPC ===');
    const { data: cleanupCount, error: cleanupError } = await supabase.rpc('cleanup_stuck_jobs');
    console.log('cleanup_stuck_jobs response data:', cleanupCount);
    console.log('cleanup_stuck_jobs error:', cleanupError);
    
    if (cleanupError) {
      console.error('Error cleaning up jobs:', JSON.stringify(cleanupError, null, 2));
      throw cleanupError;
    }

    console.log(`Job processing completed. Cleaned up ${cleanupCount || 0} stuck jobs.`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Jobs processed successfully',
        cleanedUpJobs: cleanupCount
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('=== PROCESS-JOBS FUNCTION ERROR ===');
    console.error('Error type:', typeof error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Error details:', JSON.stringify(error, null, 2));
    console.error('Function execution completed with error at:', new Date().toISOString());
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});