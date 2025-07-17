import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useJobProcessor = () => {
  useEffect(() => {
    const processJobs = async () => {
      try {
        const { error } = await supabase.functions.invoke('process-jobs');
        if (error) {
          console.error('Job processing error:', error);
        }
      } catch (error) {
        console.error('Failed to process jobs:', error);
      }
    };

    // Process jobs immediately
    processJobs();

    // Set up interval to process jobs every 30 seconds
    const interval = setInterval(processJobs, 30000);

    return () => clearInterval(interval);
  }, []);
};