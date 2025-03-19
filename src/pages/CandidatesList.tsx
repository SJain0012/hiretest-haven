
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CandidatesTable from '@/components/dashboard/CandidatesTable';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { mockCandidates } from '@/data/mockData';

const CandidatesList = () => {
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
            <CandidatesTable candidates={mockCandidates} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CandidatesList;
