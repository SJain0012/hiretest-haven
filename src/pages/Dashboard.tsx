
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
  const { user } = useAuth();
  const isDemoMode = new URLSearchParams(location.search).get('demo') === 'true';
  
  // State for company data
  const [companyName, setCompanyName] = useState<string>('');
  const [credits, setCredits] = useState<number>(isDemoMode ? 75 : 0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  // Fetch company data for authenticated users
  useEffect(() => {
    const fetchCompanyData = async () => {
      if (!user || isDemoMode) return;
      
      setIsLoading(true);
      try {
        // Get company name from user metadata
        const companyName = user.user_metadata.company_name;
        
        if (companyName) {
          setCompanyName(companyName);
          
          // Get company credits
          const { data, error } = await supabase
            .from('Company')
            .select('credits')
            .eq('name', companyName)
            .single();
            
          if (error) {
            console.error('Error fetching company data:', error);
          } else if (data) {
            setCredits(data.credits || 0);
          }
        }
      } catch (error) {
        console.error('Error in fetchCompanyData:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCompanyData();
  }, [user, isDemoMode]);

  const handleTopUp = () => {
    setIsTopupOpen(true);
  };

  const handleCreditsPurchased = (addedCredits: number) => {
    setCredits(prev => prev + addedCredits);
    
    // If not in demo mode, update the database
    if (!isDemoMode && user) {
      supabase
        .from('Company')
        .update({ credits: credits + addedCredits })
        .eq('name', companyName)
        .then(({ error }) => {
          if (error) {
            toast.error('Failed to update credits in database');
            console.error('Error updating credits:', error);
          }
        });
    }
  };
  
  const activeTestsCount = typedTests.filter(t => t.status === 'active').length;
  const completedTestsCount = typedCandidates.filter(c => c.status === 'completed').length;
  const completionRate = Math.round((completedTestsCount / typedCandidates.length) * 100);
  
  // Display title based on demo mode or company name
  const dashboardTitle = isDemoMode 
    ? "Demo Dashboard" 
    : `${companyName || 'Your'} Dashboard`;
  
  // Display description based on demo mode
  const dashboardDescription = isDemoMode
    ? "This is a demo view of the dashboard"
    : "Overview of your tests and candidates";
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-8">
          {isDemoMode && (
            <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6">
              <p className="text-amber-800">
                <strong>Demo Mode:</strong> You're viewing a sample dashboard. 
                <a href="/auth" className="text-blue-600 hover:underline ml-2">
                  Sign in
                </a> or 
                <a href="/auth?tab=signup" className="text-blue-600 hover:underline ml-2">
                  create an account
                </a> to get started with your own dashboard.
              </p>
            </div>
          )}
          
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
