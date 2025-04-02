import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { mockTests, mockCandidates, mockTraits } from '@/data/mockData';
import PersonalityChart from '@/components/results/PersonalityChart';
import DashboardCards from '@/components/dashboard/DashboardCards';
import CreditTopupDialog from '@/components/dashboard/CreditTopupDialog';
import DashboardTabs, { DashboardTest } from '@/components/dashboard/DashboardTabs';
import { Candidate } from '@/types/candidate';
import CandidateInsights from '@/components/results/CandidateInsights';

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

  const [credits, setCredits] = useState<number>(75);
  const [isTopupOpen, setIsTopupOpen] = useState<boolean>(false);

  const handleTopUp = () => {
    setIsTopupOpen(true);
  };

  const handleCreditsPurchased = (addedCredits: number) => {
    setCredits(prev => prev + addedCredits);
  };
  
  const activeTestsCount = typedTests.filter(t => t.status === 'active').length;
  const completedTestsCount = typedCandidates.filter(c => c.status === 'completed').length;
  const completionRate = Math.round((completedTestsCount / typedCandidates.length) * 100);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-8">
          <DashboardHeader
            title="Dashboard"
            description="Overview of your tests and candidates"
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
          
          {selectedCandidate && selectedCandidate.status === 'completed' && (
            <div className="my-8 animate-fade-in">
              <h2 className="text-2xl font-bold mb-4">Candidate Results</h2>
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-3/5">
                  <PersonalityChart 
                    data={mockTraits} 
                    candidateName={selectedCandidate.name} 
                  />
                </div>
                <div className="lg:w-2/5">
                  <CandidateInsights
                    candidateName={selectedCandidate.name}
                    insights={mockInsights}
                  />
                </div>
              </div>
            </div>
          )}
          
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
