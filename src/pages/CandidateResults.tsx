
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Download } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import PersonalityChart from '@/components/results/PersonalityChart';
import CandidateInsights from '@/components/results/CandidateInsights';
import { mockCandidates, mockTraits } from '@/data/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

// Sample insights - in a real app these would come from an API or analysis of the candidate's answers
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
    type: 'finding' as const,
    text: 'Excellent at detailed work requiring concentration'
  },
  {
    type: 'question' as const,
    text: 'How do you prioritize competing deadlines?'
  },
  {
    type: 'question' as const,
    text: 'Can you describe a situation where you had to adapt quickly to change?'
  },
  {
    type: 'question' as const,
    text: 'What strategies do you use to maintain focus on complex tasks?'
  }
];

const CandidateResults = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const candidate = mockCandidates.find((c) => c.id === id);

  const handleShareResults = () => {
    toast({
      title: "Results Shared",
      description: `Results for ${candidate?.name} have been shared with the team.`,
    });
  };

  const handleDownloadReport = () => {
    toast({
      title: "Report Downloaded",
      description: "The detailed PDF report has been downloaded.",
    });
  };

  if (!candidate) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col items-center justify-center h-[50vh]">
              <h1 className="text-2xl font-bold mb-2">Candidate Not Found</h1>
              <p className="text-muted-foreground mb-4">
                The candidate you're looking for doesn't exist or has been removed.
              </p>
              <Link to="/candidates">
                <Button>Return to Candidates</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Link to="/candidates">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Candidates
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{candidate.name}</h1>
              <p className="text-muted-foreground">
                {candidate.testName} • Completed {candidate.completedDate && new Date(candidate.completedDate).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleShareResults}>
                <Mail className="mr-2 h-4 w-4" />
                Share Results
              </Button>
              <Button variant="outline" onClick={handleDownloadReport}>
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3 animate-fade-in">
            <div className="md:col-span-2 space-y-6">
              <PersonalityChart data={mockTraits} candidateName={candidate.name} />
              <CandidateInsights candidateName={candidate.name} insights={mockInsights} />
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Candidate Info</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Full Name</dt>
                      <dd>{candidate.name}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                      <dd>{candidate.email}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Assessment</dt>
                      <dd>{candidate.testName}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Status</dt>
                      <dd className="capitalize">{candidate.status}</dd>
                    </div>
                    {candidate.completedDate && (
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Completed On</dt>
                        <dd>{new Date(candidate.completedDate).toLocaleString()}</dd>
                      </div>
                    )}
                  </dl>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Summary</CardTitle>
                  <CardDescription>AI-generated personality insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    {candidate.name} demonstrates excellent problem-solving abilities with high openness to new ideas 
                    and strong agreeableness, making them a valuable collaborator. Their conscientiousness is 
                    above average, indicating good reliability and organization. While their extraversion is balanced, 
                    they show good emotional stability when handling pressure.
                  </p>
                  <Separator className="my-4" />
                  <h3 className="text-sm font-medium mb-2">Recommended Roles</h3>
                  <div className="flex flex-wrap gap-2">
                    <div className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium">
                      Team Lead
                    </div>
                    <div className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium">
                      Product Developer
                    </div>
                    <div className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium">
                      Project Coordinator
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CandidateResults;
