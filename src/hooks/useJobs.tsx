
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

  // Set up polling for job updates to avoid subscription cycling issues
  useEffect(() => {
    if (!user?.id) return;

    console.log('Setting up polling for job updates');
    
    const pollInterval = setInterval(async () => {
      // Only poll if there are active jobs
      const currentJobs = queryClient.getQueryData(['jobs', user.id]) as Job[] || [];
      const hasActiveJobs = currentJobs.some(job => 
        job.status === 'queued' || job.status === 'running'
      );
      
      if (hasActiveJobs) {
        console.log('Polling for job updates...');
        queryClient.invalidateQueries({ queryKey: ['jobs', user.id] });
      }
    }, 3000); // Poll every 3 seconds when there are active jobs

    return () => {
      console.log('Cleaning up job polling');
      clearInterval(pollInterval);
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
