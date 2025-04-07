
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TestIntroProps {
  candidateName: string;
  setCandidateName: (name: string) => void;
  candidateEmail: string;
  setCandidateEmail: (email: string) => void;
  onStartTest: () => void;
  testName?: string;
}

const TestIntro: React.FC<TestIntroProps> = ({
  candidateName,
  setCandidateName,
  candidateEmail,
  setCandidateEmail,
  onStartTest,
  testName = 'Personality Assessment'
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="max-w-md w-full animate-fade-in">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">{testName}</CardTitle>
          <CardDescription>
            Complete this assessment to help us understand your personality traits.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder="Enter your full name"
              required
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
              required
            />
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>The assessment should take around 10-15 minutes to complete.</p>
            <p>Please answer all questions honestly for the most accurate results.</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={onStartTest} className="w-full">Start Assessment</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TestIntro;
