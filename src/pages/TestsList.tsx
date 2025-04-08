
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TestsTabContent from '@/components/dashboard/tabs/TestsTabContent';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { useTests } from '@/hooks/useTests';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const TestsList = () => {
  const { tests, isLoading } = useTests();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter tests based on search query
  const filteredTests = tests.filter(test => {
    const searchLower = searchQuery.toLowerCase();
    return (
      test.name.toLowerCase().includes(searchLower) ||
      test.status.toLowerCase().includes(searchLower)
    );
  });
  
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
          
          {/* Search bar */}
          <div className="mt-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search tests by name or status..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="mt-8 animate-fade-in">
            {isLoading ? (
              <div className="flex items-center justify-center p-12">
                <div className="text-muted-foreground">Loading tests...</div>
              </div>
            ) : filteredTests.length === 0 && searchQuery ? (
              <div className="text-center p-12 border rounded-lg bg-muted/20">
                <h3 className="text-lg font-medium">No tests match your search</h3>
                <p className="text-muted-foreground mt-1">Try a different search term or clear your search.</p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mt-4 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <TestsTabContent tests={filteredTests} />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TestsList;
