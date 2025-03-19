
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TestsTable from '@/components/dashboard/TestsTable';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { mockTests } from '@/data/mockData';

const TestsList = () => {
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
            <TestsTable tests={mockTests} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TestsList;
