
import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Job {
  id: string;
  prompt_id: string;
  user_id: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  progress: number;
  result_url?: string;
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
        
        return (data || []) as Job[];
      } catch (err) {
        console.error('Jobs fetch failed:', err);
        return []; // Return empty array instead of throwing
      }
    },
    enabled: !!user,
    retry: false, // Don't retry failed requests
  });

  // Set up real-time subscription for job updates using direct channel
  useEffect(() => {
    if (!user) return;

    console.log('Setting up real-time subscription for t3d.jobs');
    
    const channel = supabase
      .channel('t3d-jobs-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 't3d',
          table: 'jobs',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Job update received:', payload);
          queryClient.invalidateQueries({ queryKey: ['jobs', user.id] });
        }
      )
      .subscribe();

    return () => {
      console.log('Cleaning up t3d jobs subscription');
      supabase.removeChannel(channel);
    };
  }, [user, queryClient]);

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

  return {
    jobs,
    isLoading,
    error,
    processPrompt
  };
};
