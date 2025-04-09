
import React, { useEffect, useState } from 'react';
import { getDashboardStats } from '@/utils/supabaseHelpers';
import { toast } from 'sonner';
import { Candidate } from '@/types/candidate';
import { DashboardTest } from '@/components/dashboard/DashboardTabs';

interface DashboardStatsProps {
  isDemoMode: boolean;
  supabaseCandidates: Candidate[];
  supabaseTests: any[];
}

export interface DashboardStatsData {
  testsCount: number;
  activeTestsCount: number;
  candidatesCount: number;
  completedTestsCount: number;
  completionRate: number;
}

export const useDashboardStats = ({ isDemoMode, supabaseCandidates, supabaseTests }: DashboardStatsProps) => {
  const [dashboardStats, setDashboardStats] = useState<DashboardStatsData>({
    testsCount: 0,
    activeTestsCount: 0,
    candidatesCount: 0,
    completedTestsCount: 0,
    completionRate: 0
  });

  // Fetch dashboard statistics from Supabase
  useEffect(() => {
    const fetchStats = async () => {
      if (isDemoMode) return;
      
      try {
        const stats = await getDashboardStats();
        setDashboardStats(stats);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        toast.error('Error loading dashboard statistics');
      }
    };
    
    fetchStats();
  }, [isDemoMode, supabaseCandidates]);

  // Format tests for dashboard display
  const formatTests = (): DashboardTest[] => {
    return supabaseTests.map(test => ({
      id: test.id,
      name: test.name,
      status: test.status,
      createdAt: new Date().toISOString(), // Use current date if not available
      candidatesCount: supabaseCandidates.filter(c => c.testId === test.id).length,
      completionRate: calculateCompletionRate(test.id)
    }));
  };
  
  // Calculate completion rate for a specific test
  const calculateCompletionRate = (testId: string): number => {
    const candidatesForTest = supabaseCandidates.filter(c => c.testId === testId);
    if (candidatesForTest.length === 0) return 0;
    
    const completedCount = candidatesForTest.filter(c => c.status === 'completed').length;
    return Math.round((completedCount / candidatesForTest.length) * 100);
  };

  return {
    dashboardStats,
    formatTests
  };
};

export default useDashboardStats;
