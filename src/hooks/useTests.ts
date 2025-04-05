
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { DashboardTest } from '@/components/dashboard/DashboardTabs';

export const useTests = () => {
  const [tests, setTests] = useState<DashboardTest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { session } = useAuth();

  const fetchTests = async () => {
    setIsLoading(true);
    
    try {
      if (session) {
        const { data, error } = await supabase
          .from('Tests')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        const formattedTests = data.map(test => ({
          id: test.id,
          name: test.name,
          status: test.status as "active" | "draft" | "archived",
          createdAt: test.created_at || new Date().toISOString(),
          candidatesCount: 0,
          completionRate: 0,
        }));
        
        setTests(formattedTests);
      } else {
        setTests([]);
      }
    } catch (error) {
      console.error('Error fetching tests:', error);
      // Only show error toast if it's not a network error, to avoid too many error messages
      if (!(error instanceof TypeError && error.message.includes('Failed to fetch'))) {
        toast.error('Failed to load tests');
      }
      // Use mock data in case of network errors during development/preview
      if (process.env.NODE_ENV !== 'production') {
        setTests([
          {
            id: 'mock-1',
            name: 'Demo Test (Offline Mode)',
            status: 'active',
            createdAt: new Date().toISOString(),
            candidatesCount: 5,
            completionRate: 60,
          }
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, [session]);

  return {
    tests,
    isLoading,
    fetchTests
  };
};
