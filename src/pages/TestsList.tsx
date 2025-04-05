import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TestsTabContent from '@/components/dashboard/tabs/TestsTabContent';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { DashboardTest } from '@/components/dashboard/DashboardTabs';

const TestsList = () => {
  const [tests, setTests] = useState<DashboardTest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { session } = useAuth();
  
  useEffect(() => {
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
        toast.error('Failed to load tests');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTests();
  }, [session]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-8">
          <DashboardHeader
            title="Tests"
            description="Manage your personality assessments"
            actionLink="/tests/create"
            actionText="Create New Test"
          />
          
          <div className="mt-8 animate-fade-in">
            {isLoading ? (
              <div className="flex items-center justify-center p-12">
                <div className="text-muted-foreground">Loading tests...</div>
              </div>
            ) : (
              <TestsTabContent tests={tests} />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TestsList;
