
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import TestsTable from '@/components/dashboard/TestsTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockTests, mockCandidates, mockTraits } from '@/data/mockData';
import { PieChart, User, Mail, CheckCircle } from 'lucide-react';
import CandidatesTable from '@/components/dashboard/CandidatesTable';
import PersonalityChart from '@/components/results/PersonalityChart';

// Define Candidate type to match what's in CandidatesTable
interface Candidate {
  id: string;
  name: string;
  email: string;
  status: "pending" | "completed" | "expired";
  testName: string;
  completedDate?: string;
}

const Dashboard = () => {
  // Convert string status values to the expected union types
  const typedTests = mockTests.map(test => ({
    ...test,
    status: test.status as "active" | "draft" | "archived"
  }));
  
  // Convert string status values to the expected union types for candidates
  const typedCandidates = mockCandidates.map(candidate => ({
    ...candidate,
    status: candidate.status as "completed" | "pending" | "expired"
  }));

  // State to track the selected candidate
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    typedCandidates.find(c => c.status === 'completed') || null
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-8">
          <DashboardHeader
            title="Dashboard"
            description="Overview of your tests and candidates"
          />
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Tests
                </CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockTests.length}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {mockTests.filter(t => t.status === 'active').length} active
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Candidates
                </CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockCandidates.length}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {mockCandidates.filter(c => c.status === 'completed').length} completed tests
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Invitations
                </CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockCandidates.filter(c => c.status === 'pending').length}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Awaiting responses
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Completion Rate
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round((mockCandidates.filter(c => c.status === 'completed').length / mockCandidates.length) * 100)}%
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Average across all tests
                </p>
              </CardContent>
            </Card>
          </div>
          
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
          
          <Tabs defaultValue="tests" className="mt-8 animate-fade-in">
            <TabsList>
              <TabsTrigger value="tests">Tests</TabsTrigger>
              <TabsTrigger value="candidates">Candidates</TabsTrigger>
            </TabsList>
            <TabsContent value="tests" className="mt-4">
              <TestsTable tests={typedTests} />
            </TabsContent>
            <TabsContent value="candidates" className="mt-4">
              <CandidatesTable 
                candidates={typedCandidates} 
                onCandidateSelect={setSelectedCandidate}
                selectedCandidateId={selectedCandidate?.id}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
