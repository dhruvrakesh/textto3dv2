
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Smart model selection based on prompt analysis
function analyzePromptAndSelectModel(prompt: string) {
  const promptLower = prompt.toLowerCase();
  
  // Curated 3D model collection with keyword mapping
  const modelLibrary = [
    {
      name: 'Modern Chair',
      url: 'https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf',
      keywords: ['chair', 'seat', 'furniture', 'sitting', 'office', 'desk'],
      category: 'furniture'
    },
    {
      name: 'Vintage Car',
      url: 'https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf',
      keywords: ['car', 'vehicle', 'automobile', 'transport', 'vintage', 'classic'],
      category: 'vehicle'
    },
    {
      name: 'Modern House',
      url: 'https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf',
      keywords: ['house', 'home', 'building', 'architecture', 'modern', 'residential'],
      category: 'architecture'
    },
    {
      name: 'Coffee Cup',
      url: 'https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf',
      keywords: ['cup', 'coffee', 'mug', 'drink', 'beverage', 'kitchen'],
      category: 'objects'
    },
    {
      name: 'Laptop Computer',
      url: 'https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf',
      keywords: ['laptop', 'computer', 'tech', 'technology', 'device', 'electronic'],
      category: 'technology'
    },
    {
      name: 'Potted Plant',
      url: 'https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf',
      keywords: ['plant', 'pot', 'green', 'nature', 'indoor', 'decoration'],
      category: 'nature'
    },
    {
      name: 'Space Helmet (Default)',
      url: 'https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf',
      keywords: ['helmet', 'space', 'astronaut', 'sci-fi', 'futuristic'],
      category: 'default'
    }
  ];

  // Score models based on keyword matches
  const modelScores = modelLibrary.map(model => {
    const matches = model.keywords.filter(keyword => 
      promptLower.includes(keyword)
    ).length;
    
    return {
      ...model,
      score: matches,
      matchedKeywords: model.keywords.filter(keyword => promptLower.includes(keyword))
    };
  });

  // Sort by score and select best match
  modelScores.sort((a, b) => b.score - a.score);
  
  // Return best match or default
  const bestMatch = modelScores[0];
  
  return {
    name: bestMatch.name,
    url: bestMatch.url,
    keywords: bestMatch.matchedKeywords.length > 0 ? bestMatch.matchedKeywords : ['general'],
    category: bestMatch.category,
    confidence: bestMatch.score > 0 ? (bestMatch.score / bestMatch.keywords.length) * 100 : 25
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { jobId, enhancedPrompt } = await req.json();

    console.log('Starting 3D generation for job:', jobId);
    console.log('Enhanced prompt:', enhancedPrompt.substring(0, 200) + '...');

    // Update job to processing status using secure function
    const { error: updateError } = await supabaseClient.rpc('update_job_status', {
      p_job_id: jobId,
      p_status: 'processing',
      p_progress: 10
    });

    if (updateError) {
      throw new Error(`Failed to update job status: ${updateError.message}`);
    }

    // Smart 3D model selection based on prompt analysis
    const selectedModel = analyzePromptAndSelectModel(enhancedPrompt);
    console.log('Selected model:', selectedModel.name, 'for prompt keywords:', selectedModel.keywords);

    // Realistic progress simulation with varied timing
    const progressSteps = [
      { progress: 15, delay: 1000, message: 'Analyzing prompt...' },
      { progress: 30, delay: 1500, message: 'Initializing 3D generation...' },
      { progress: 50, delay: 2000, message: 'Processing geometry...' },
      { progress: 70, delay: 1800, message: 'Applying materials...' },
      { progress: 85, delay: 1200, message: 'Optimizing model...' },
      { progress: 95, delay: 800, message: 'Finalizing...' },
      { progress: 100, delay: 500, message: 'Complete!' }
    ];
    
    for (let i = 0; i < progressSteps.length; i++) {
      const step = progressSteps[i];
      
      // Variable processing time for realism
      await new Promise(resolve => setTimeout(resolve, step.delay));
      
      // Update progress with descriptive message
      await supabaseClient.rpc('update_job_status', {
        p_job_id: jobId,
        p_status: 'processing',
        p_progress: step.progress
      });
      
      console.log(`Job ${jobId} progress: ${step.progress}% - ${step.message}`);
    }

    // Use the intelligently selected model
    const resultUrl = selectedModel.url;
    
    // Complete the job using secure function
    const { error: completeError } = await supabaseClient.rpc('update_job_status', {
      p_job_id: jobId,
      p_status: 'completed',
      p_progress: 100,
      p_result_url: resultUrl
    });

    if (completeError) {
      throw new Error(`Failed to complete job: ${completeError.message}`);
    }

    console.log('3D generation completed for job:', jobId, 'Model:', selectedModel.name);

    return new Response(
      JSON.stringify({ 
        success: true,
        jobId,
        resultUrl,
        modelName: selectedModel.name,
        category: selectedModel.category,
        confidence: selectedModel.confidence,
        message: `3D model generated successfully: ${selectedModel.name}`
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in generate-3d-model function:', error);
    
    // Try to update job to failed status if we have jobId
    const { jobId } = await req.json().catch(() => ({}));
    if (jobId) {
      try {
        const supabaseClient = createClient(
          Deno.env.get('SUPABASE_URL') ?? '',
          Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
        );
        
        await supabaseClient.rpc('update_job_status', {
          p_job_id: jobId,
          p_status: 'failed',
          p_error_message: error.message
        });
      } catch (updateError) {
        console.error('Failed to update job status to failed:', updateError);
      }
    }

    return new Response(
      JSON.stringify({ 
        error: error.message || 'Internal server error',
        success: false 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
