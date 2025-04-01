import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { mockTests, mockCandidates, mockTraits } from '@/data/mockData';
import PersonalityChart from '@/components/results/PersonalityChart';
import DashboardCards from '@/components/dashboard/DashboardCards';
import CreditTopupDialog from '@/components/dashboard/CreditTopupDialog';
import DashboardTabs, { DashboardTest, Candidate } from '@/components/dashboard/DashboardTabs';

const Dashboard = () => {
  // Convert mockTests to DashboardTest type
  const typedTests = mockTests.map(test => ({
    ...test,
    status: test.status as "active" | "draft" | "archived"
  })) as DashboardTest[];
  
  // Convert string status values to the expected union types for candidates
  const typedCandidates = mockCandidates.map(candidate => ({
    ...candidate,
    status: candidate.status as "completed" | "pending" | "expired"
  }));

  // State to track the selected candidate
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    typedCandidates.find(c => c.status === 'completed') || null
  );

  // Credit system states
  const [credits, setCredits] = useState<number>(75);
  const [isTopupOpen, setIsTopupOpen] = useState<boolean>(false);

  const handleTopUp = () => {
    setIsTopupOpen(true);
  };

  const handleCreditsPurchased = (addedCredits: number) => {
    setCredits(prev => prev + addedCredits);
  };
  
  // Calculate statistics for dashboard cards
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
          
          {/* Add personality results section */}
          {selectedCandidate && selectedCandidate.status === 'completed' && (
            <div className="my-8 animate-fade-in">
              <h2 className="text-2xl font-bold mb-4">Candidate Results</h2>
              <PersonalityChart 
                data={mockTraits} 
                candidateName={selectedCandidate.name} 
              />
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
