
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const { promptData } = await req.json();

    // Create a detailed prompt for 3D generation based on the wizard data
    const systemPrompt = `You are an expert 3D interior design prompt engineer. Transform the user's basic requirements into a detailed, professional 3D generation prompt that will create stunning interior spaces.

Focus on:
- Architectural details and proportions
- Material specifications and textures
- Lighting setup and ambiance
- Color harmony and palette
- Furniture placement and styling
- Spatial flow and functionality

Make it vivid, specific, and optimized for 3D rendering engines.`;

    const userPrompt = `Transform this interior design specification into a detailed 3D generation prompt:

Space Type: ${promptData.space}
Style: ${promptData.style}
Dimensions: ${promptData.dimensions_mm.x}mm x ${promptData.dimensions_mm.y}mm x ${promptData.dimensions_mm.z}mm
Color Scheme: ${promptData.color_scheme.join(', ')}
Mood Keywords: ${promptData.mood_keywords.join(', ')}
Description: ${promptData.description}

Create a comprehensive prompt that will generate a photorealistic 3D interior space.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.8,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const enhancedPrompt = data.choices[0].message.content;

    console.log('Enhanced prompt generated:', enhancedPrompt.substring(0, 100) + '...');

    return new Response(
      JSON.stringify({ 
        enhancedPrompt,
        originalData: promptData 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in enhance-prompt function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to enhance prompt'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
