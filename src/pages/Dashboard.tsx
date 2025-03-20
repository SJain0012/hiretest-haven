
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import TestsTable from '@/components/dashboard/TestsTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockTests, mockCandidates, mockTraits } from '@/data/mockData';
import { PieChart, User, Mail, CheckCircle, Plus, CreditCard } from 'lucide-react';
import CandidatesTable from '@/components/dashboard/CandidatesTable';
import PersonalityChart from '@/components/results/PersonalityChart';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Define Candidate type to match what's in CandidatesTable
interface Candidate {
  id: string;
  name: string;
  email: string;
  status: "pending" | "completed" | "expired";
  testName: string;
  completedDate?: string;
}

const creditPackages = [
  { id: 1, name: "Small", credits: 50, price: "$49" },
  { id: 2, name: "Medium", credits: 100, price: "$89", popular: true },
  { id: 3, name: "Large", credits: 250, price: "$199" },
  { id: 4, name: "Enterprise", credits: 1000, price: "$699" }
];

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

  // Credit system states
  const [credits, setCredits] = useState<number>(75);
  const [isTopupOpen, setIsTopupOpen] = useState<boolean>(false);
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);

  const { toast } = useToast();

  const handleTopUp = () => {
    setIsTopupOpen(true);
  };

  const handlePurchaseCredits = () => {
    if (selectedPackage !== null) {
      const pkg = creditPackages.find(p => p.id === selectedPackage);
      if (pkg) {
        setCredits(prev => prev + pkg.credits);
        toast({
          title: "Credits Added",
          description: `You've successfully added ${pkg.credits} credits to your account.`,
        });
        setIsTopupOpen(false);
        setSelectedPackage(null);
      }
    } else {
      toast({
        title: "No Package Selected",
        description: "Please select a credit package to continue.",
        variant: "destructive",
      });
    }
  };
  
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

          {/* Credits Top-up Dialog */}
          <Dialog open={isTopupOpen} onOpenChange={setIsTopupOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Purchase Credits</DialogTitle>
                <DialogDescription>
                  Credits are used to create tests and send invitations to candidates.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                {creditPackages.map((pkg) => (
                  <div 
                    key={pkg.id}
                    className={`relative p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedPackage === pkg.id 
                        ? 'border-primary ring-2 ring-primary ring-opacity-50' 
                        : 'border-border hover:border-primary/50'
                    } ${pkg.popular ? 'bg-primary/5' : ''}`}
                    onClick={() => setSelectedPackage(pkg.id)}
                  >
                    {pkg.popular && (
                      <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                        Popular
                      </div>
                    )}
                    <div className="flex flex-col gap-1">
                      <h3 className="font-medium">{pkg.name} Pack</h3>
                      <div className="text-2xl font-bold">{pkg.credits} <span className="text-sm font-normal">Credits</span></div>
                      <div className="mt-2 font-medium">{pkg.price}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-muted p-3 rounded-md flex items-center gap-2 text-sm mt-2">
                <CreditCard className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Current balance: <span className="font-medium">{credits} credits</span></span>
              </div>
              
              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setIsTopupOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  variant="credit" 
                  onClick={handlePurchaseCredits}
                  disabled={selectedPackage === null}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Purchase Credits
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
