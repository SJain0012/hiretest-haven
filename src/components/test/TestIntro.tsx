
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface TestIntroProps {
  candidateName: string;
  setCandidateName: (name: string) => void;
  candidateEmail: string;
  setCandidateEmail: (email: string) => void;
  onStartTest: () => void;
}

const TestIntro: React.FC<TestIntroProps> = ({
  candidateName,
  setCandidateName,
  candidateEmail,
  setCandidateEmail,
  onStartTest,
}) => {
  const { toast } = useToast();

  const handleStartTest = () => {
    if (!candidateName.trim() || !candidateEmail.trim()) {
      toast({
        title: "Required Fields Missing",
        description: "Please enter your name and email to begin the test.",
        variant: "destructive",
      });
      return;
    }
    
    onStartTest();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="max-w-md w-full animate-scale-in">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold">Personality Assessment</h1>
              <p className="text-muted-foreground">
                Please enter your information to begin the test.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={candidateEmail}
                  onChange={(e) => setCandidateEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                className="w-full btn-hover" 
                onClick={handleStartTest}
                disabled={!candidateName || !candidateEmail}
              >
                Begin Assessment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestIntro;
