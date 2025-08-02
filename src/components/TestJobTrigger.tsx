import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useJobs } from "@/hooks/useJobs";
import { useToast } from "@/hooks/use-toast";

const TestJobTrigger = () => {
  const [isCreating, setIsCreating] = useState(false);
  const { processPrompt } = useJobs();
  const { toast } = useToast();

  const createTestJob = async () => {
    setIsCreating(true);
    
    const testPromptData = {
      space: "kitchen",
      style: "Modern",
      space_type: "room",
      description: "A simple modern kitchen for testing the 3D generation pipeline",
      color_scheme: ["neutral"],
      dimensions_mm: {
        x: 4000,
        y: 3000,
        z: 2800
      },
      mood_keywords: ["clean"],
      quality_level: "standard",
      uploaded_refs: [],
      selected_model: "auto",
      selected_service: "auto"
    };

    try {
      console.log("🧪 Creating test job with data:", testPromptData);
      
      const result = await processPrompt(testPromptData);
      
      console.log("🧪 Test job created:", result);
      
      toast({
        title: "Test Job Created",
        description: `Job ID: ${result.jobId}. Check the edge function logs for detailed debugging info.`,
      });
    } catch (error) {
      console.error("🧪 Test job creation failed:", error);
      
      toast({
        title: "Test Job Failed",
        description: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Card className="p-4 border-2 border-dashed border-orange-500">
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-orange-600">🧪 Debug Test Zone</h3>
        <p className="text-sm text-muted-foreground">
          Create a test 3D generation job to see the detailed logs from our comprehensive logging implementation.
        </p>
        <Button 
          onClick={createTestJob}
          disabled={isCreating}
          className="w-full"
          variant="outline"
        >
          {isCreating ? "Creating Test Job..." : "🧪 Create Test 3D Job"}
        </Button>
        <p className="text-xs text-muted-foreground">
          Check browser console and edge function logs after clicking the button.
        </p>
      </div>
    </Card>
  );
};

export default TestJobTrigger;