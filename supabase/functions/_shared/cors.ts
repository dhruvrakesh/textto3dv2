
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Max-Age': '86400',
}

export function handleCorsOptions() {
  return new Response(null, { 
    headers: corsHeaders,
    status: 200 
  });
}

export function createCorsResponse(data: any, options: { status?: number } = {}) {
  return new Response(
    JSON.stringify(data),
    { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: options.status || 200
    }
  );
}

export function createCorsErrorResponse(error: string, status: number = 500) {
  return new Response(
    JSON.stringify({ 
      error,
      success: false 
    }),
    { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status
    }
  );
}
