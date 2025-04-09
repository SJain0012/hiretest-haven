
import React, { useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardCards from '@/components/dashboard/DashboardCards';
import CreditTopupDialog from '@/components/dashboard/CreditTopupDialog';
import DashboardTabs from '@/components/dashboard/DashboardTabs';
import DashboardDemoNotice from '@/components/dashboard/DashboardDemoNotice';
import CandidateResultsSection from '@/components/dashboard/CandidateResultsSection';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useTests } from '@/hooks/useTests';
import { useCandidates } from '@/hooks/useCandidates';
import { useDashboardStats } from '@/components/dashboard/DashboardStats';
import { useCandidateSelector } from '@/components/dashboard/CandidateSelector';
import { mockTraits, mockInsights } from '@/data/mockData';

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
  
  // Use our custom hooks for dashboard stats and candidate selection
  const { dashboardStats, formatTests } = useDashboardStats({ 
    isDemoMode, 
    supabaseCandidates, 
    supabaseTests 
  });
  
  const { selectedCandidate, setSelectedCandidate } = useCandidateSelector(
    candidateIdFromUrl, 
    supabaseCandidates
  );
  
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
