import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Upload, X, Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useJobs } from "@/hooks/useJobs";

interface PromptData {
  space: string;
  dimensions_mm: { x: number; y: number; z: number };
  style: string;
  color_scheme: string[];
  mood_keywords: string[];
  uploaded_refs: Array<{ type: string; bucket: string; path: string }>;
  description: string;
}

interface PromptWizardProps {
  onComplete: (data: PromptData) => void;
}

const PromptWizard = ({ onComplete }: PromptWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [promptData, setPromptData] = useState<PromptData>({
    space: "",
    dimensions_mm: { x: 4500, y: 3200, z: 3000 },
    style: "",
    color_scheme: [],
    mood_keywords: [],
    uploaded_refs: [],
    description: ""
  });
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const { processPrompt } = useJobs();

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const spaceTypes = ["kitchen", "living_room", "bedroom", "bathroom", "office", "dining_room"];
  const styles = ["Modern", "Minimalist", "Japandi", "Industrial", "Scandinavian", "Traditional", "Contemporary"];
  const colorSchemes = ["warm_wood", "matte_black", "sage_green", "white", "navy_blue", "cream", "charcoal", "oak"];
  const moodKeywords = ["minimal", "cozy", "bright", "spacious", "concealed_handles", "open_concept", "luxury", "rustic"];

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0 || !user) return;

    setUploading(true);
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileName = `${user.id}/${Date.now()}-${file.name}`;
        
        const { error } = await supabase.storage
          .from('t3d-uploads')
          .upload(fileName, file);

        if (error) throw error;

        setPromptData(prev => ({
          ...prev,
          uploaded_refs: [...prev.uploaded_refs, {
            type: 'photo',
            bucket: 't3d-uploads',
            path: fileName
          }]
        }));
      }
      
      toast({
        title: "Files uploaded successfully",
        description: `${files.length} file(s) uploaded`,
      });
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const removeUploadedFile = (index: number) => {
    setPromptData(prev => ({
      ...prev,
      uploaded_refs: prev.uploaded_refs.filter((_, i) => i !== index)
    }));
  };

  const addColorScheme = (color: string) => {
    if (!promptData.color_scheme.includes(color)) {
      setPromptData(prev => ({
        ...prev,
        color_scheme: [...prev.color_scheme, color]
      }));
    }
  };

  const removeColorScheme = (color: string) => {
    setPromptData(prev => ({
      ...prev,
      color_scheme: prev.color_scheme.filter(c => c !== color)
    }));
  };

  const addMoodKeyword = (keyword: string) => {
    if (!promptData.mood_keywords.includes(keyword)) {
      setPromptData(prev => ({
        ...prev,
        mood_keywords: [...prev.mood_keywords, keyword]
      }));
    }
  };

  const removeMoodKeyword = (keyword: string) => {
    setPromptData(prev => ({
      ...prev,
      mood_keywords: prev.mood_keywords.filter(k => k !== keyword)
    }));
  };

  const enhanceDescription = async () => {
    if (!promptData.description) {
      toast({
        title: "Description required",
        description: "Please add a description before enhancing",
        variant: "destructive",
      });
      return;
    }

    setIsEnhancing(true);
    try {
      const { data, error } = await supabase.functions.invoke('enhance-prompt', {
        body: { promptData }
      });

      if (error) throw error;

      setPromptData(prev => ({
        ...prev,
        description: data.enhancedPrompt
      }));

      toast({
        title: "Description Enhanced!",
        description: "Your description has been enhanced with AI",
      });
    } catch (error: any) {
      console.error('Error enhancing prompt:', error);
      toast({
        title: "Enhancement failed",
        description: error.message || "Failed to enhance description",
        variant: "destructive",
      });
    } finally {
      setIsEnhancing(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return promptData.space && promptData.dimensions_mm.x && promptData.dimensions_mm.y;
      case 2:
        return promptData.style && promptData.color_scheme.length > 0;
      case 3:
        return true; // Optional step
      case 4:
        return promptData.description.length > 0;
      default:
        return false;
    }
  };

  const handleComplete = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create a 3D model",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      console.log('Starting generation process with data:', promptData);

      // First process the prompt and create job entry
      const result = await processPrompt(promptData);
      console.log('Prompt processed, job created:', result);

      if (!result || !result.jobId) {
        throw new Error('Failed to create generation job');
      }

      // Enhance the prompt with GPT-4 and start 3D generation in background
      const enhanceAndGenerate = async () => {
        try {
          console.log('Enhancing prompt with GPT-4...');
          const { data: enhanceData, error: enhanceError } = await supabase.functions.invoke('enhance-prompt', {
            body: { promptData }
          });

          if (enhanceError) {
            console.warn('Prompt enhancement failed, using original:', enhanceError);
          }

          const enhancedPrompt = enhanceData?.enhancedPrompt || promptData.description;
          console.log('Prompt enhanced, starting 3D generation...');

          // Start 3D generation process
          const { data: generateData, error: generateError } = await supabase.functions.invoke('generate-3d-model', {
            body: { 
              jobId: result.jobId,
              enhancedPrompt 
            }
          });

          if (generateError) {
            console.error('3D generation failed:', generateError);
          } else {
            console.log('3D generation started successfully:', generateData);
          }
        } catch (error) {
          console.error('Background generation process failed:', error);
        }
      };

      // Start the enhancement and generation process in the background
      enhanceAndGenerate();
      
      toast({
        title: "Generation Started!",
        description: "Your 3D model is being generated with AI enhancement.",
      });
      
      onComplete(promptData);
    } catch (error: any) {
      console.error('Error processing prompt:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to process your request",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card/80 backdrop-blur-sm border-border/50">
      <CardHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold">
              Create Your 3D Space
            </CardTitle>
            <Badge variant="outline">
              Step {currentStep} of {totalSteps}
            </Badge>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {currentStep === 1 && (
          <div className="space-y-4">
            <CardDescription>
              Let's start with the basics - what type of space are you creating?
            </CardDescription>
            
            <div className="space-y-2">
              <Label>Space Type</Label>
              <Select value={promptData.space} onValueChange={(value) => 
                setPromptData(prev => ({ ...prev, space: value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Select a space type" />
                </SelectTrigger>
                <SelectContent>
                  {spaceTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Width (mm)</Label>
                <Input
                  type="number"
                  value={promptData.dimensions_mm.x}
                  onChange={(e) => setPromptData(prev => ({
                    ...prev,
                    dimensions_mm: { ...prev.dimensions_mm, x: parseInt(e.target.value) || 0 }
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Depth (mm)</Label>
                <Input
                  type="number"
                  value={promptData.dimensions_mm.y}
                  onChange={(e) => setPromptData(prev => ({
                    ...prev,
                    dimensions_mm: { ...prev.dimensions_mm, y: parseInt(e.target.value) || 0 }
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Height (mm)</Label>
                <Input
                  type="number"
                  value={promptData.dimensions_mm.z}
                  onChange={(e) => setPromptData(prev => ({
                    ...prev,
                    dimensions_mm: { ...prev.dimensions_mm, z: parseInt(e.target.value) || 0 }
                  }))}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <CardDescription>
              Choose the style and color scheme for your space
            </CardDescription>
            
            <div className="space-y-2">
              <Label>Style</Label>
              <Select value={promptData.style} onValueChange={(value) => 
                setPromptData(prev => ({ ...prev, style: value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Select a style" />
                </SelectTrigger>
                <SelectContent>
                  {styles.map(style => (
                    <SelectItem key={style} value={style}>
                      {style}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Color Scheme</Label>
              <div className="grid grid-cols-2 gap-2">
                {colorSchemes.map(color => (
                  <Button
                    key={color}
                    variant={promptData.color_scheme.includes(color) ? "default" : "outline"}
                    onClick={() => promptData.color_scheme.includes(color) ? 
                      removeColorScheme(color) : addColorScheme(color)
                    }
                    className="justify-start"
                  >
                    {color.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Button>
                ))}
              </div>
              
              {promptData.color_scheme.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {promptData.color_scheme.map(color => (
                    <Badge key={color} variant="secondary" className="flex items-center gap-1">
                      {color.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeColorScheme(color)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Mood & Style Keywords</Label>
              <div className="grid grid-cols-2 gap-2">
                {moodKeywords.map(keyword => (
                  <Button
                    key={keyword}
                    variant={promptData.mood_keywords.includes(keyword) ? "default" : "outline"}
                    onClick={() => promptData.mood_keywords.includes(keyword) ? 
                      removeMoodKeyword(keyword) : addMoodKeyword(keyword)
                    }
                    className="justify-start"
                  >
                    {keyword.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Button>
                ))}
              </div>
              
              {promptData.mood_keywords.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {promptData.mood_keywords.map(keyword => (
                    <Badge key={keyword} variant="secondary" className="flex items-center gap-1">
                      {keyword.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeMoodKeyword(keyword)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <CardDescription>
              Upload reference images to help guide the generation (optional)
            </CardDescription>
            
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Click to upload reference images
              </p>
              <Button 
                variant="outline" 
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Choose Files"}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {promptData.uploaded_refs.length > 0 && (
              <div className="space-y-2">
                <Label>Uploaded References</Label>
                <div className="space-y-2">
                  {promptData.uploaded_refs.map((ref, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">{ref.path.split('/').pop()}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeUploadedFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-4">
            <CardDescription>
              Describe your vision in detail. Our AI can enhance your description for better results.
            </CardDescription>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Detailed Description</Label>
                <Button
                  variant="outline" 
                  size="sm"
                  onClick={enhanceDescription}
                  disabled={isEnhancing || !promptData.description}
                >
                  {isEnhancing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Enhancing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Enhance with AI
                    </>
                  )}
                </Button>
              </div>
              <Textarea
                value={promptData.description}
                onChange={(e) => setPromptData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your ideal space in detail. Include materials, lighting, specific features, and any other details that are important to you..."
                className="min-h-32"
              />
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Preview JSON</h4>
              <pre className="text-xs overflow-auto max-h-40">
                {JSON.stringify(promptData, null, 2)}
              </pre>
            </div>
          </div>
        )}

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1 || isSubmitting}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <Button
            onClick={nextStep}
            disabled={!canProceed() || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                {currentStep === totalSteps ? "Generate 3D Model" : "Next"}
                {currentStep < totalSteps && <ChevronRight className="h-4 w-4 ml-2" />}
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PromptWizard;
