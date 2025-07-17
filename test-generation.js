// Test script for 3D generation with Scandinavian kitchen prompt
// This will be used to test the generation workflow

const scandinavianKitchenPrompt = {
  space: "kitchen",
  dimensions_mm: { x: 4500, y: 3200, z: 3000 },
  style: "Scandinavian",
  color_scheme: ["warm_wood", "white", "matte_black"],
  mood_keywords: ["minimal", "bright", "luxury", "concealed_handles"],
  uploaded_refs: [],
  description: `**3D Interior Design Prompt for a Scandinavian Kitchen**

**Space Type:** Kitchen  
**Style:** Scandinavian  
**Dimensions:** 4500mm (width) x 3200mm (depth) x 3000mm (height)  

**Architectural Details and Proportions:**  
Design a Scandinavian-style kitchen with an emphasis on clean lines and minimalism. The room should feature a large, central kitchen island measuring 1800mm x 1000mm. Include full-height cabinetry along the longest wall (4500mm), with soft-close doors for a sleek appearance. The ceiling at a height of 3000mm should include recessed lighting panels to ensure even illumination. Incorporate large vertical windows along the shorter wall (3200mm) to enhance natural light, framed with thin, black metal for a modern aesthetic.

**Material Specifications and Textures:**  
Utilize a blend of natural materials, focusing on a warm wood palette. Use light oak for the cabinetry and island, with a matte finish to emphasize the texture of the grain. The countertops should be crafted from honed Carrara marble, providing a luxurious and timeless element. Include matte black metal fixtures and handles for a modern contrast. The flooring should be wide-plank engineered wood in a warm honey tone, enhancing the cozy and inviting atmosphere typical of Scandinavian design.

**Lighting Setup and Ambiance:**  
Install recessed LED lights in the ceiling to cast a soft, even glow across the space, adjustable to mimic natural daylight. Above the kitchen island, suspend three minimalist pendant lights with white frosted glass shades to provide focused task lighting. Enhance the ambiance with under-cabinet lighting, creating a subtle, luxurious feel. Ensure the large windows allow ample daylight, with sheer white curtains to diffuse sunlight and maintain privacy without sacrificing brightness.

**Color Harmony and Palette:**  
Focus on a harmonious color scheme that includes warm wood tones, soft whites, and subtle greys. The walls should be painted in a soft, matte white to provide a neutral backdrop that complements the warm wood and black metal accents. Integrate greenery through potted herbs on the window sill for a fresh touch of color that aligns with the Scandinavian style.

**Furniture Placement and Styling:**  
Position the kitchen island centrally, facilitating efficient spatial flow and functionality. Furnish with sleek, high-back stools in black leather with metal frames, placed along one side of the island for casual dining and entertaining. Ensure cabinetry is arranged for optimal storage, with taller units for pantry storage and lower units for pots and utensils. Incorporate open shelving along one wall to display minimalist Scandinavian dishware and decor, such as ceramic vases and wooden bowls.

**Spatial Flow and Functionality:**  
Design the layout to maximize efficiency, with the work triangle formed by the sink, stove, and refrigerator. Place a built-in oven and microwave at waist height within the cabinetry for ergonomic access. Ensure ample countertop space for food preparation, with easy access to cooking appliances and utensils. Create a seamless flow between the kitchen and any adjoining rooms, promoting an open, airy feel conducive to social interaction and family gatherings. 

This prompt will generate a photorealistic 3D interior space that embodies the luxurious, functional, and timeless essence of a Scandinavian kitchen.`
};

console.log('Scandinavian Kitchen Test Prompt:', JSON.stringify(scandinavianKitchenPrompt, null, 2));