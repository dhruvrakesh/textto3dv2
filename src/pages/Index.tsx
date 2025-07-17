
import { useState, useEffect } from "react";
import { useJobs, Job } from "@/hooks/useJobs";
import { useToast } from "@/hooks/use-toast";
import PromptWizard from "@/components/PromptWizard";
import ModelViewer from "@/components/ModelViewer";
import GenerationHistory from "@/components/GenerationHistory";
import ErrorBoundary from "@/components/ErrorBoundary";

const Index = () => {
  const [showWizard, setShowWizard] = useState(false);
  const [currentModel, setCurrentModel] = useState<string | undefined>();
  const [currentJob, setCurrentJob] = useState<Job | undefined>();
  const { jobs, isLoading, deleteJob, retryJob } = useJobs();
  const { toast } = useToast();

  // Find any processing job to show in the viewer
  useEffect(() => {
    const processingJob = jobs.find(job => job.status === 'processing' || job.status === 'queued');
    if (processingJob) {
      setCurrentJob(processingJob);
      setCurrentModel(undefined); // Clear model while generating
    } else {
      // Show the most recent completed job if no processing job
      const completedJob = jobs
        .filter(job => job.status === 'completed' && job.result_url)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];
      
      if (completedJob) {
        setCurrentJob(completedJob);
        setCurrentModel(completedJob.result_url);
      } else {
        setCurrentJob(undefined);
        setCurrentModel(undefined);
      }
    }
  }, [jobs]);

  const handleWizardComplete = () => {
    setShowWizard(false);
    toast({
      title: "3D Generation Started!",
      description: "Your model is being generated. Check the history panel for progress.",
    });
  };

  const handleViewJob = (job: Job) => {
    if (job.status === 'completed' && job.result_url) {
      setCurrentModel(job.result_url);
      setCurrentJob(job);
      toast({
        title: "Model Loaded",
        description: "3D model loaded in the viewer",
      });
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    try {
      await deleteJob(jobId);
      toast({
        title: "Job Deleted",
        description: "The job has been successfully deleted.",
      });
    } catch (error) {
      console.error('Delete job error:', error);
      toast({
        title: "Failed to Delete Job",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const handleRetryJob = async (jobId: string) => {
    try {
      await retryJob(jobId);
      toast({
        title: "Job Retried",
        description: "The job has been reset and will be processed again.",
      });
    } catch (error) {
      console.error('Retry job error:', error);
      toast({
        title: "Failed to Retry Job",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            AI-Powered 3D Interior Designer
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create stunning 3D interior spaces with the power of AI. 
            Design your dream room with our intuitive wizard and watch it come to life.
          </p>
        </div>

        {/* Wizard Modal */}
        {showWizard && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <ErrorBoundary>
                <PromptWizard 
                  onComplete={handleWizardComplete}
                />
              </ErrorBoundary>
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setShowWizard(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 3D Viewer - Takes up 2 columns on large screens */}
          <div className="lg:col-span-2">
            <ErrorBoundary>
              <ModelViewer 
                model={currentModel}
                isGenerating={currentJob?.status === 'processing' || currentJob?.status === 'queued'}
                job={currentJob}
              />
            </ErrorBoundary>
          </div>

          {/* Sidebar - History and Controls */}
          <div className="space-y-6">
            {/* Generate Button */}
            <div className="flex flex-col gap-4">
              <button
                onClick={() => setShowWizard(true)}
                className="w-full bg-gradient-primary text-white py-4 px-6 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg"
              >
                Create New 3D Space
              </button>
              
              {currentJob && (
                <div className="text-center text-sm text-muted-foreground">
                  {currentJob.status === 'processing' || currentJob.status === 'queued' ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                      Generating your space...
                    </span>
                  ) : currentJob.status === 'completed' ? (
                    <span className="text-green-400">
                      ✓ Generation complete
                    </span>
                  ) : currentJob.status === 'failed' ? (
                    <span className="text-red-400">
                      ✗ Generation failed
                    </span>
                  ) : null}
                </div>
              )}
            </div>

            {/* Generation History */}
            <ErrorBoundary>
              <GenerationHistory 
                onView={handleViewJob}
                onDelete={handleDeleteJob}
                onRetry={handleRetryJob}
              />
            </ErrorBoundary>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 flex items-center justify-center">
            <div className="bg-card/80 backdrop-blur-sm p-6 rounded-lg border border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                <span className="text-foreground">Loading your workspace...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
