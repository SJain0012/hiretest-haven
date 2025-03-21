
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Send } from 'lucide-react';

const TestCompletion: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="max-w-md w-full animate-scale-in">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Send className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">Thank You!</h1>
            <p className="text-muted-foreground">
              Your test has been submitted successfully. The hiring team will review your results.
            </p>
            <Separator className="my-4" />
            <p className="text-sm">
              You may close this window now.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestCompletion;
