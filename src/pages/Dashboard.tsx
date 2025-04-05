
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { mockTests, mockCandidates, mockTraits } from '@/data/mockData';
import DashboardCards from '@/components/dashboard/DashboardCards';
import CreditTopupDialog from '@/components/dashboard/CreditTopupDialog';
import DashboardTabs, { DashboardTest } from '@/components/dashboard/DashboardTabs';
import { Candidate } from '@/types/candidate';
import DashboardDemoNotice from '@/components/dashboard/DashboardDemoNotice';
import CandidateResultsSection from '@/components/dashboard/CandidateResultsSection';
import { useDashboardData } from '@/hooks/useDashboardData';

const mockInsights = [
  {
    type: 'finding' as const,
    text: 'Shows exceptional problem-solving abilities under pressure'
  },
  {
    type: 'finding' as const,
    text: 'Demonstrates strong collaborative tendencies with high agreeableness'
  },
  {
    type: 'question' as const,
    text: 'How do you prioritize competing deadlines?'
  },
  {
    type: 'question' as const,
    text: 'Can you describe a situation where you had to adapt quickly to change?'
  }
];

const Dashboard = () => {
  const location = useLocation();
  const isDemoMode = new URLSearchParams(location.search).get('demo') === 'true';
  
  // Convert mock data to typed data
  const typedTests = mockTests.map(test => ({
    ...test,
    status: test.status as "active" | "draft" | "archived"
  })) as DashboardTest[];
  
  const typedCandidates = mockCandidates.map(candidate => ({
    ...candidate,
    status: candidate.status as "completed" | "pending" | "expired"
  })) as Candidate[];

  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    typedCandidates.find(c => c.status === 'completed') || null
  );

  const [isTopupOpen, setIsTopupOpen] = useState<boolean>(false);
  const { companyName, credits, updateCredits } = useDashboardData(isDemoMode);

  // Dashboard metrics calculations
  const activeTestsCount = typedTests.filter(t => t.status === 'active').length;
  const completedTestsCount = typedCandidates.filter(c => c.status === 'completed').length;
  const completionRate = Math.round((completedTestsCount / typedCandidates.length) * 100);
  
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
          
          <DashboardCards 
            testsCount={typedTests.length}
            activeTestsCount={activeTestsCount}
            candidatesCount={typedCandidates.length}
            completedTestsCount={completedTestsCount}
            completionRate={completionRate}
          />
          
          <CandidateResultsSection 
            selectedCandidate={selectedCandidate}
            mockTraits={mockTraits}
            mockInsights={mockInsights}
          />
          
          <DashboardTabs
            tests={typedTests}
            candidates={typedCandidates}
            selectedCandidate={selectedCandidate}
            onCandidateSelect={setSelectedCandidate}
          />

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
