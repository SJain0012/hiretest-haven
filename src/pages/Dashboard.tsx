
import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardCards from '@/components/dashboard/DashboardCards';
import CreditTopupDialog from '@/components/dashboard/CreditTopupDialog';
import DashboardTabs, { DashboardTest } from '@/components/dashboard/DashboardTabs';
import { Candidate } from '@/types/candidate';
import DashboardDemoNotice from '@/components/dashboard/DashboardDemoNotice';
import CandidateResultsSection from '@/components/dashboard/CandidateResultsSection';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useTests } from '@/hooks/useTests';
import { useCandidates } from '@/hooks/useCandidates';
import { getDashboardStats } from '@/utils/supabaseHelpers';
import { toast } from 'sonner';
import { mockTraits } from '@/data/mockData';

// Sample insights for candidates without proper results
const mockInsights = [
  {
    type: 'finding' as const,
    text: 'Shows strong creative problem-solving abilities'
  },
  {
    type: 'finding' as const,
    text: 'Highly collaborative with excellent team communication'
  },
  {
    type: 'finding' as const,
    text: 'Demonstrates leadership potential in group settings'
  },
  {
    type: 'question' as const,
    text: 'How do you handle conflicting priorities?'
  },
  {
    type: 'question' as const,
    text: 'What strategies do you use when facing an unfamiliar challenge?'
  }
];

const Dashboard = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const candidateIdFromUrl = searchParams.get('candidateId');
  const isDemoMode = new URLSearchParams(location.search).get('demo') === 'true';
  
  const [isTopupOpen, setIsTopupOpen] = useState<boolean>(false);
  const { companyName, credits, updateCredits } = useDashboardData(isDemoMode);
  
  // Use hooks to get real data
  const { tests: supabaseTests, isLoading: isTestsLoading } = useTests();
  const { candidates: supabaseCandidates, isLoading: isCandidatesLoading } = useCandidates();
  
  // Statistics state
  const [dashboardStats, setDashboardStats] = useState({
    testsCount: 0,
    activeTestsCount: 0,
    candidatesCount: 0,
    completedTestsCount: 0,
    completionRate: 0
  });
  
  // Selected candidate state
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  
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
    const candidatesForTest = supabaseCandidates.filter(c => c.testId === test.id);
    if (candidatesForTest.length === 0) return 0;
    
    const completedCount = candidatesForTest.filter(c => c.status === 'completed').length;
    return Math.round((completedCount / candidatesForTest.length) * 100);
  };
  
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
  
  // Effect for handling the candidateId from URL
  useEffect(() => {
    if (candidateIdFromUrl && supabaseCandidates.length > 0) {
      const candidate = supabaseCandidates.find(c => c.id === candidateIdFromUrl);
      if (candidate) {
        console.log('Setting selected candidate from URL param:', candidate);
        setSelectedCandidate(candidate);
        
        // Add sample results if not present
        if (!candidate.results) {
          const candidateWithResults = {
            ...candidate,
            status: 'completed',
            completedDate: new Date().toISOString(),
            results: {
              traits: mockTraits,
              insights: mockInsights
            }
          };
          setSelectedCandidate(candidateWithResults);
        }
      }
    } else if (supabaseCandidates.length > 0) {
      // Default behavior when no candidateId in URL
      const completedCandidate = supabaseCandidates.find(c => c.status === 'completed' && c.results);
      if (completedCandidate) {
        console.log('Setting selected candidate with results:', completedCandidate);
        setSelectedCandidate(completedCandidate);
      } else {
        // If no completed candidate, select first one but add sample results
        const firstCandidate = supabaseCandidates[0];
        const candidateWithResults = {
          ...firstCandidate,
          status: 'completed',
          completedDate: new Date().toISOString(),
          results: {
            traits: mockTraits,
            insights: mockInsights
          }
        };
        setSelectedCandidate(candidateWithResults);
      }
    }
  }, [candidateIdFromUrl, supabaseCandidates]);
  
  // Display title and description based on demo mode
  const dashboardTitle = isDemoMode 
    ? "Demo Dashboard" 
    : `${companyName || 'Your'} Dashboard`;
  
  const dashboardDescription = isDemoMode
    ? "This is a demo view of the dashboard"
    : "Overview of your tests and candidates";
  
  const handleTopUp = () => {
    setIsTopupOpen(true);
  };

  const handleCreditsPurchased = (addedCredits: number) => {
    updateCredits(addedCredits);
  };
  
  const isLoading = isTestsLoading || isCandidatesLoading;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-8">
          <DashboardDemoNotice isDemoMode={isDemoMode} />
          
          <DashboardHeader
            title={dashboardTitle}
            description={dashboardDescription}
            credits={credits}
            onTopUpClick={handleTopUp}
          />
          
          {isLoading ? (
            <div className="flex items-center justify-center p-12">
              <div className="text-muted-foreground">Loading dashboard data...</div>
            </div>
          ) : (
            <>
              <DashboardCards 
                testsCount={dashboardStats.testsCount}
                activeTestsCount={dashboardStats.activeTestsCount}
                candidatesCount={dashboardStats.candidatesCount}
                completedTestsCount={dashboardStats.completedTestsCount}
                completionRate={dashboardStats.completionRate}
              />
              
              {selectedCandidate && (
                <CandidateResultsSection 
                  selectedCandidate={selectedCandidate}
                  mockTraits={selectedCandidate.results?.traits || mockTraits}
                  mockInsights={selectedCandidate.results?.insights || mockInsights}
                />
              )}
              
              <DashboardTabs
                tests={formatTests()}
                candidates={supabaseCandidates}
                selectedCandidate={selectedCandidate}
                onCandidateSelect={setSelectedCandidate}
              />
            </>
          )}

          <CreditTopupDialog
            open={isTopupOpen}
            onOpenChange={setIsTopupOpen}
            onCreditsPurchased={handleCreditsPurchased}
            currentCredits={credits}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
