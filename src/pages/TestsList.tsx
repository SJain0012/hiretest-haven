
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TestsTabContent from '@/components/dashboard/tabs/TestsTabContent';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { useTests } from '@/hooks/useTests';

const TestsList = () => {
  const { tests, isLoading } = useTests();
  
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
