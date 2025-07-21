
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

// Enhanced status translation function to handle all possible database statuses
export const translateStatus = (dbStatus: string): 'queued' | 'running' | 'completed' | 'failed' => {
  switch (dbStatus?.toLowerCase()) {
    case 'done':
    case 'completed':
      return 'completed';
    case 'error':
    case 'failed':
    case 'canceled':
    case 'cancelled':
      return 'failed';
    case 'queued':
    case 'pending':
      return 'queued';
    case 'running':
    case 'processing':
    case 'starting':
      return 'running';
    default:
      console.warn('Unknown job status:', dbStatus);
      return 'queued';
  }
};

export const useJobs = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isRealTimeConnected, setIsRealTimeConnected] = useState(false);

  // Fetch jobs for the current user using Edge Function to access jobs table
  const { data: jobs = [], isLoading, error } = useQuery({
    queryKey: ['jobs', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      try {
        console.log('Fetching jobs for user:', user.id);
        
        // Call the Edge Function to get jobs
        const { data, error } = await supabase.functions.invoke('get-user-jobs', {
          body: { p_user_id: user.id }
        });

        if (error) {
          console.error('Error fetching jobs:', error);
          throw new Error(error.message || 'Failed to fetch jobs');
        }
        
        if (!data) {
          console.log('No jobs data returned');
          return [];
        }
        
        console.log('Raw jobs data:', data);
        
        // Transform the data to ensure status translation and error handling
        const transformedJobs = (Array.isArray(data) ? data : []).map((job: any) => ({
          ...job,
          status: translateStatus(job.status),
          error_message: job.error_message || null,
          progress: Math.max(0, Math.min(100, job.progress || 0))
        }));
        
        console.log('Transformed jobs:', transformedJobs);
        return transformedJobs as Job[];
        
      } catch (err) {
        console.error('Jobs fetch failed:', err);
        throw err; // Re-throw to let React Query handle the error state
      }
    },
    enabled: !!user,
    retry: 3, // Retry failed requests up to 3 times
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    refetchInterval: (data) => {
      // Only poll if there are active jobs
      const hasActiveJobs = data?.some(job => {
        const translatedStatus = translateStatus(job.status);
        return translatedStatus === 'queued' || translatedStatus === 'running';
      });
      return hasActiveJobs ? 3000 : false; // Poll every 3 seconds if active jobs, otherwise don't poll
    },
  });

  // Set up real-time subscription for job updates
  useEffect(() => {
    if (!user?.id) return;

    console.log('Setting up real-time subscription for job updates');
    
    const channel = supabase
      .channel('job-updates')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'jobs',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Real-time job update received:', payload);
          
          // Invalidate and refetch jobs when we receive updates
          queryClient.invalidateQueries({ queryKey: ['jobs', user.id] });
        }
      )
      .subscribe((status) => {
        console.log('Real-time subscription status:', status);
        setIsRealTimeConnected(status === 'SUBSCRIBED');
      });

    return () => {
      console.log('Cleaning up real-time subscription');
      supabase.removeChannel(channel);
      setIsRealTimeConnected(false);
    };
  }, [user?.id, queryClient]);

  const processPrompt = async (promptData: any) => {
    if (!user) throw new Error('User not authenticated');

    try {
      console.log('Processing prompt:', promptData);
      
      const { data, error } = await supabase.functions.invoke('process-prompt', {
        body: { promptData }
      });

      if (error) {
        console.error('Process prompt error:', error);
        throw new Error(error.message || 'Failed to process prompt');
      }
      
      console.log('Process prompt success:', data);
      
      // Invalidate jobs query to refresh the list
      queryClient.invalidateQueries({ queryKey: ['jobs', user.id] });
      
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
      console.log('Retrying job:', jobId);
      
      const { data, error } = await supabase.functions.invoke('retry-job', {
        body: { jobId }
      });

      if (error) {
        console.error('Retry job error:', error);
        throw new Error(error.message || 'Failed to retry job');
      }

      console.log('Retry job success:', data);

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
    bulkDeleteJobs,
    isRealTimeConnected
  };
};
