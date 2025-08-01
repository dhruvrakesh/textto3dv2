
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders, handleCorsOptions, createCorsResponse, createCorsErrorResponse } from '../_shared/cors.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return handleCorsOptions();
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    const webhook = await req.json()
    console.log('Received Replicate webhook:', JSON.stringify(webhook, null, 2))

    // Extract job ID from webhook metadata or URL
    const jobId = webhook.id || webhook.urls?.get?.split('/')?.pop()
    
    if (!jobId) {
      console.error('No job ID found in webhook:', webhook)
      return createCorsErrorResponse('Invalid webhook: missing job ID', 400)
    }

    // Find the job in our database using the Replicate prediction ID
    const { data: jobs, error: findError } = await supabaseClient
      .schema('t3d')
      .from('jobs')
      .select('id, status, user_id')
      .eq('replicate_prediction_id', jobId)
      .single()

    if (findError || !jobs) {
      console.error('Job not found for prediction ID:', jobId, findError)
      return createCorsErrorResponse('Job not found', 404)
    }

    let updateData: any = {
      updated_at: new Date().toISOString()
    }

    // Handle different webhook statuses
    switch (webhook.status) {
      case 'starting':
        updateData.status = 'running'
        updateData.progress = 10
        break
        
      case 'processing':
        updateData.status = 'running'
        updateData.progress = Math.min(50 + (webhook.metrics?.predict_time || 0) * 10, 90)
        break
        
      case 'succeeded':
        updateData.status = 'done'
        updateData.progress = 100
        if (webhook.output && webhook.output[0]) {
          updateData.result_url = webhook.output[0] // Replace prediction ID with actual result URL
        }
        break
        
      case 'failed':
      case 'canceled':
        updateData.status = 'error'
        updateData.progress = 0
        updateData.error_message = webhook.error || 'Generation failed'
        updateData.result_url = null
        break
        
      default:
        console.log('Unknown webhook status:', webhook.status)
        return createCorsResponse({ message: 'Status ignored' })
    }

    // Update the job in our database
    const { error: updateError } = await supabaseClient
      .schema('t3d')
      .from('jobs')
      .update(updateData)
      .eq('id', jobs.id)

    if (updateError) {
      console.error('Failed to update job:', updateError)
      throw new Error('Failed to update job status')
    }

    console.log('Job updated successfully:', jobs.id, updateData)

    return createCorsResponse({ 
      success: true,
      message: 'Webhook processed successfully',
      jobId: jobs.id,
      status: updateData.status
    })

  } catch (error) {
    console.error('Error in replicate-webhook function:', error)
    return createCorsErrorResponse(error.message || 'Internal server error')
  }
})
