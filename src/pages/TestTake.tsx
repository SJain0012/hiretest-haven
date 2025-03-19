
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { mockTestQuestions } from '@/data/mockData';
import { ArrowLeft, ArrowRight, Send } from 'lucide-react';

const TestTake = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const questions = mockTestQuestions;
  const currentQuestion = questions[currentQuestionIndex];
  
  const handleStartTest = () => {
    if (!candidateName.trim() || !candidateEmail.trim()) {
      toast({
        title: "Required Fields Missing",
        description: "Please enter your name and email to begin the test.",
        variant: "destructive",
      });
      return;
    }
    
    setIsStarted(true);
  };
  
  const handleAnswer = (value: any) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value,
    });
  };
  
  const goToNextQuestion = () => {
    if (!answers[currentQuestion.id] && currentQuestion.type !== 'text') {
      toast({
        title: "No Answer Selected",
        description: "Please select an answer before proceeding.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleSubmit = () => {
    // Validate that all questions are answered
    const unansweredQuestions = questions.filter(q => !answers[q.id] && q.type !== 'text');
    
    if (unansweredQuestions.length > 0) {
      toast({
        title: "Incomplete Test",
        description: `You have ${unansweredQuestions.length} unanswered questions. Please complete the test before submitting.`,
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, we would submit the test results here
    console.log({
      testId,
      candidateName,
      candidateEmail,
      answers,
    });
    
    setIsSubmitted(true);
    
    toast({
      title: "Test Submitted",
      description: "Thank you for completing the personality assessment.",
    });
  };
  
  if (isSubmitted) {
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
  }
  
  if (!isStarted) {
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
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="max-w-2xl w-full animate-fade-in">
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
              <div className="flex h-2 w-full max-w-24 rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-medium mb-4">{currentQuestion.text}</h2>
              
              {currentQuestion.type === 'multiple_choice' && currentQuestion.options && (
                <RadioGroup
                  value={answers[currentQuestion.id] || ''}
                  onValueChange={handleAnswer}
                  className="space-y-3"
                >
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem id={`option-${index}`} value={option} />
                      <Label htmlFor={`option-${index}`} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
              
              {currentQuestion.type === 'scale' && (
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{currentQuestion.scaleLabels?.min}</span>
                    <span>{currentQuestion.scaleLabels?.max}</span>
                  </div>
                  <RadioGroup
                    value={answers[currentQuestion.id]?.toString() || ''}
                    onValueChange={(value) => handleAnswer(Number(value))}
                    className="flex justify-between"
                  >
                    {Array.from(
                      { length: (currentQuestion.scaleMax || 5) - (currentQuestion.scaleMin || 1) + 1 },
                      (_, i) => (currentQuestion.scaleMin || 1) + i
                    ).map((value) => (
                      <div key={value} className="flex flex-col items-center gap-2">
                        <RadioGroupItem
                          id={`scale-${value}`}
                          value={value.toString()}
                          className="peer hidden"
                        />
                        <Label
                          htmlFor={`scale-${value}`}
                          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-input bg-background text-sm transition-colors hover:bg-secondary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground"
                        >
                          {value}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
              
              {currentQuestion.type === 'text' && (
                <Textarea
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className="h-32"
                />
              )}
            </div>
            
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={goToPreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              
              {currentQuestionIndex < questions.length - 1 ? (
                <Button onClick={goToNextQuestion}>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="btn-hover">
                  Submit
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestTake;
