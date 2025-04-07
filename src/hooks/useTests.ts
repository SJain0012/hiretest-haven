
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
          .select('*, Candidates(count)')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        // Process the data to get candidates count for each test
        const formattedTests = data.map(test => {
          // Get the count of candidates for this test
          const candidatesCount = test.Candidates?.length || 0;
          
          // Calculate completion rate (random for now)
          // In a real app, you would fetch the actual completed vs total candidates
          const completionRate = candidatesCount > 0 
            ? Math.floor(Math.random() * 100) 
            : 0;
          
          return {
            id: test.id,
            name: test.name,
            status: test.status as "active" | "draft" | "archived",
            createdAt: test.created_at || new Date().toISOString(),
            candidatesCount,
            completionRate,
          };
        });
        
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
