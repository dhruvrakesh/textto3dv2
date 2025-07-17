import { Progress } from "@/components/ui/progress";
import { Clock, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number;
  status?: 'queued' | 'processing' | 'completed' | 'failed';
  showETA?: boolean;
  className?: string;
}

const getProgressStage = (progress: number) => {
  if (progress < 5) return 'Initializing';
  if (progress < 20) return 'Queued';
  if (progress < 40) return 'Enhancing Prompt';
  if (progress < 80) return 'Generating Model';
  if (progress < 95) return 'Processing Result';
  return 'Finalizing';
};

const getEstimatedTime = (progress: number) => {
  if (progress < 20) return '2-3 minutes';
  if (progress < 40) return '1-2 minutes';
  if (progress < 80) return '30-90 seconds';
  if (progress < 95) return '15-30 seconds';
  return 'Almost done';
};

export const ProgressBar = ({ 
  progress, 
  status = 'processing', 
  showETA = true, 
  className 
}: ProgressBarProps) => {
  const currentStage = getProgressStage(progress);
  const eta = getEstimatedTime(progress);
  const isCompleted = status === 'completed' || progress >= 100;
  const isFailed = status === 'failed';

  return (
    <div className={cn("space-y-3", className)}>
      {/* Status and Progress */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isFailed ? (
            <AlertCircle className="w-4 h-4 text-destructive" />
          ) : isCompleted ? (
            <CheckCircle2 className="w-4 h-4 text-success" />
          ) : (
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          )}
          <span className="text-sm font-medium text-foreground">
            {isFailed ? 'Generation Failed' : isCompleted ? 'Complete' : currentStage}
          </span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{Math.round(progress)}%</span>
          {showETA && !isCompleted && !isFailed && (
            <>
              <Clock className="w-3 h-3" />
              <span>{eta}</span>
            </>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <Progress 
          value={progress} 
          className={cn(
            "h-2",
            isFailed && "bg-destructive/20",
            isCompleted && "bg-success/20"
          )}
        />
        
        {/* Animated shimmer effect during processing */}
        {!isCompleted && !isFailed && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse rounded-full" />
        )}
      </div>

      {/* Stage Indicators */}
      <div className="flex justify-between text-xs">
        {['Queued', 'Processing', 'Generating', 'Finalizing'].map((stage, index) => {
          const stageProgress = (index + 1) * 25;
          const isActive = progress >= stageProgress;
          
          return (
            <span
              key={stage}
              className={cn(
                "transition-colors duration-500",
                isActive ? "text-primary font-medium" : "text-muted-foreground"
              )}
            >
              {stage}
            </span>
          );
        })}
      </div>
    </div>
  );
};