import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Processing jobs...');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Process queued jobs
    const { error: processError } = await supabase.rpc('process_queued_jobs', {}, { schema: 't3d' });
    
    if (processError) {
      console.error('Error processing jobs:', processError);
      throw processError;
    }

    // Clean up stuck jobs
    const { data: cleanupCount, error: cleanupError } = await supabase.rpc('cleanup_stuck_jobs', {}, { schema: 't3d' });
    
    if (cleanupError) {
      console.error('Error cleaning up jobs:', cleanupError);
      throw cleanupError;
    }

    console.log(`Job processing completed. Cleaned up ${cleanupCount} stuck jobs.`);

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
    console.error('Error in process-jobs function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});