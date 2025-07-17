
import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Job {
  id: string;
  prompt_id: string;
  user_id: string;
  status: 'queued' | 'running' | 'completed' | 'failed' | 'done';
  progress: number;
  result_url?: string;
  job_type?: string;
  error_message?: string;
  created_at: string;
  updated_at: string;
  prompts?: {
    id: string;
    space_type: string;
    style: string;
    description: string;
    json: any;
  };
}

// Status translation function to map database statuses to UI statuses
export const translateStatus = (dbStatus: string): 'queued' | 'running' | 'completed' | 'failed' => {
  switch (dbStatus) {
    case 'done':
      return 'completed';
    case 'queued':
    case 'running':
    case 'failed':
      return dbStatus as 'queued' | 'running' | 'failed';
    default:
      return 'queued';
  }
};

export const useJobs = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch jobs for the current user using Edge Function to access t3d schema
  const { data: jobs = [], isLoading, error } = useQuery({
    queryKey: ['jobs', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      try {
        // Call the Edge Function to get jobs from t3d schema
        const { data, error } = await supabase.functions.invoke('get-user-jobs', {
          body: { p_user_id: user.id }
        });

        if (error) {
          console.error('Error fetching jobs:', error);
          return []; // Return empty array instead of throwing
        }
        
        // Transform the data to ensure status translation
        const transformedJobs = (data || []).map((job: any) => ({
          ...job,
          status: translateStatus(job.status)
        }));
        
        return transformedJobs as Job[];
      } catch (err) {
        console.error('Jobs fetch failed:', err);
        return []; // Return empty array instead of throwing
      }
    },
    enabled: !!user,
    retry: false, // Don't retry failed requests
  });

  // Set up intelligent polling for job updates with exponential backoff
  useEffect(() => {
    if (!user?.id) return;

    console.log('Setting up intelligent polling for job updates');
    
    let pollInterval = 2000; // Start with 2 seconds
    const maxInterval = 10000; // Max 10 seconds
    let errorCount = 0;
    let intervalId: NodeJS.Timeout | null = null;
    
    const poll = async () => {
      try {
        // Only poll if there are active jobs
        const currentJobs = queryClient.getQueryData(['jobs', user.id]) as Job[] || [];
        const hasActiveJobs = currentJobs.some(job => 
          job.status === 'queued' || job.status === 'running'
        );
        
        if (hasActiveJobs) {
          console.log(`Polling for job updates (interval: ${pollInterval}ms)...`);
          queryClient.invalidateQueries({ queryKey: ['jobs', user.id] });
          
          // Reset error count and interval on successful poll
          errorCount = 0;
          pollInterval = Math.max(2000, pollInterval * 0.9); // Gradually decrease interval
        } else {
          // No active jobs, increase interval to save resources
          pollInterval = Math.min(5000, pollInterval * 1.2);
        }
      } catch (error) {
        console.error('Error during job polling:', error);
        errorCount++;
        
        // Increase interval on repeated errors (exponential backoff)
        if (errorCount > 2) {
          pollInterval = Math.min(pollInterval * 1.5, maxInterval);
          console.log(`Increased poll interval to ${pollInterval}ms due to errors`);
        }
      }
      
      // Schedule next poll with current interval
      intervalId = setTimeout(poll, pollInterval);
    };
    
    // Start polling immediately
    poll();

    return () => {
      console.log('Cleaning up job polling');
      if (intervalId) {
        clearTimeout(intervalId);
      }
    };
  }, [user?.id, queryClient]);

  const processPrompt = async (promptData: any) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase.functions.invoke('process-prompt', {
        body: { promptData }
      });

      if (error) {
        console.error('Process prompt error:', error);
        throw new Error('Failed to process prompt');
      }
      return data;
    } catch (err) {
      console.error('Process prompt failed:', err);
      throw err;
    }
  };

  const deleteJob = async (jobId: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase.functions.invoke('delete-job', {
        body: { jobId }
      });

      if (error) {
        console.error('Delete job error:', error);
        throw new Error(error.message || 'Failed to delete job');
      }

      // Immediately update the query cache to remove the deleted job
      queryClient.setQueryData(['jobs', user.id], (oldData: Job[] | undefined) => {
        if (!oldData) return oldData;
        return oldData.filter(job => job.id !== jobId);
      });

      return data;
    } catch (err) {
      console.error('Delete job failed:', err);
      throw err;
    }
  };

  const retryJob = async (jobId: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase.functions.invoke('retry-job', {
        body: { jobId }
      });

      if (error) {
        console.error('Retry job error:', error);
        throw new Error(error.message || 'Failed to retry job');
      }

      // Invalidate queries to refresh the job list
      queryClient.invalidateQueries({ queryKey: ['jobs', user.id] });

      return data;
    } catch (err) {
      console.error('Retry job failed:', err);
      throw err;
    }
  };

  const bulkDeleteJobs = async (jobIds: string[]) => {
    if (!user) throw new Error('User not authenticated');

    try {
      // Delete jobs one by one using the delete function
      const results = await Promise.allSettled(
        jobIds.map(jobId => deleteJob(jobId))
      );

      const successCount = results.filter(r => r.status === 'fulfilled').length;
      const failureCount = results.length - successCount;

      if (failureCount > 0) {
        console.warn(`${failureCount} jobs failed to delete out of ${jobIds.length}`);
      }

      return { successCount, failureCount };
    } catch (err) {
      console.error('Bulk delete jobs failed:', err);
      throw err;
    }
  };

  return {
    jobs,
    isLoading,
    error,
    processPrompt,
    deleteJob,
    retryJob,
    bulkDeleteJobs
  };
};
