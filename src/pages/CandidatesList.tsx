
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CandidatesTabContent from '@/components/dashboard/tabs/CandidatesTabContent';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { mockCandidates } from '@/data/mockData';
import { Candidate } from '@/components/dashboard/DashboardTabs';

const CandidatesList = () => {
  // Convert string status values to the expected union type
  const typedCandidates = mockCandidates.map(candidate => ({
    ...candidate,
    status: candidate.status as "completed" | "pending" | "expired"
  })) as Candidate[];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-8">
          <DashboardHeader
            title="Candidates"
            description="Manage test participants and view results"
            actionLink="/candidates/invite"
            actionText="Invite Candidates"
          />
          
          <div className="mt-8 animate-fade-in">
            <CandidatesTabContent candidates={typedCandidates} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CandidatesList;
