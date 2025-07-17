
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ProgressBar";
import { Clock, Eye, Download, Trash2, AlertCircle, CheckCircle, Loader, RotateCcw } from "lucide-react";
import { useJobs, Job } from "@/hooks/useJobs";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface GenerationHistoryProps {
  onView?: (item: Job) => void;
  onDelete?: (id: string) => void;
  onRetry?: (id: string) => void;
}

const GenerationHistory = ({ onView, onDelete, onRetry }: GenerationHistoryProps) => {
  const { jobs, isLoading } = useJobs();
  const { toast } = useToast();

  const getStatusColor = (status: Job["status"]) => {
    switch (status) {
      case "queued":
      case "processing":
        return "bg-primary/20 text-primary border-primary/30";
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "failed":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleView = (job: Job) => {
    if (job.status === 'completed' && job.result_url) {
      onView?.(job);
    } else {
      toast({
        title: "Model not ready",
        description: "This model is still being generated or has failed.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = (job: Job) => {
    if (job.status === 'completed' && job.result_url) {
      window.open(job.result_url, '_blank');
    } else {
      toast({
        title: "Download not available",
        description: "This model is not ready for download yet.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto">
            <Clock className="w-8 h-8 text-muted-foreground animate-spin" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">Loading History</h3>
            <p className="text-muted-foreground text-sm">
              Fetching your generation history...
            </p>
          </div>
        </div>
      </Card>
    );
  }

  if (jobs.length === 0) {
    return (
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto">
            <Clock className="w-8 h-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">No Generation History</h3>
            <p className="text-muted-foreground text-sm">
              Your generated 3D models will appear here
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Generation History</h3>
        
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-4 bg-background/30 rounded-lg border border-border/30 hover:border-border/50 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-foreground line-clamp-1">
                      {job.prompts?.space_type} - {job.prompts?.style}
                    </h4>
                    <Badge 
                      variant={
                        job.status === 'completed' ? 'default' : 
                        job.status === 'failed' ? 'destructive' : 
                        'secondary'
                      }
                      className={cn(
                        "text-xs",
                        job.status === 'processing' && "animate-pulse"
                      )}
                    >
                      {job.status === 'processing' ? (
                        <div className="flex items-center gap-1">
                          <Loader className="w-3 h-3 animate-spin" />
                          Processing
                        </div>
                      ) : job.status === 'completed' ? (
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Completed
                        </div>
                      ) : job.status === 'failed' ? (
                        <div className="flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Failed
                        </div>
                      ) : (
                        'Queued'
                      )}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDistanceToNow(new Date(job.created_at))} ago
                  </span>
                </div>

                {/* Enhanced Progress Bar for active jobs */}
                {(job.status === 'processing' || job.status === 'queued') && (
                  <ProgressBar 
                    progress={job.progress || 0} 
                    status={job.status}
                    showETA={true}
                    className="my-2"
                  />
                )}

                {/* Error message for failed jobs */}
                {job.status === 'failed' && job.error_message && (
                  <div className="p-2 bg-destructive/10 border border-destructive/20 rounded text-xs text-destructive">
                    {job.error_message}
                  </div>
                )}

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {job.prompts?.description || 'No description available'}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-muted-foreground space-x-4">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatTime(job.created_at)}
                    </div>
                    <span>{formatDate(job.created_at)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {job.status === "completed" && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleView(job)}
                          className="h-7 px-2"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDownload(job)}
                          className="h-7 px-2"
                        >
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      </>
                    )}
                    {/* Retry Button - Only for failed jobs */}
                    {job.status === 'failed' && onRetry && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onRetry(job.id)}
                        className="h-7 px-2 hover:bg-primary/20 hover:border-primary/50"
                      >
                        <RotateCcw className="w-3 h-3 mr-1" />
                        Retry
                      </Button>
                    )}
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onDelete?.(job.id)}
                      className="h-7 px-2 hover:bg-destructive/20 hover:border-destructive/50"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default GenerationHistory;
