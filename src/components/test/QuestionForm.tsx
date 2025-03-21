
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: string;
  text: string;
  type: string;
  options?: string[];
  scaleMin?: number;
  scaleMax?: number;
  scaleLabels?: {
    min: string;
    max: string;
  };
}

interface QuestionFormProps {
  questions: Question[];
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  answers: Record<string, any>;
  setAnswers: (answers: Record<string, any>) => void;
  onSubmit: () => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  questions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  answers,
  setAnswers,
  onSubmit,
}) => {
  const { toast } = useToast();
  const currentQuestion = questions[currentQuestionIndex];
  
  // Calculate progress percentage
  const answeredQuestions = Object.keys(answers).length;
  const progressPercentage = (answeredQuestions / questions.length) * 100;
  
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
    
    onSubmit();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="max-w-2xl w-full animate-fade-in">
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  {answeredQuestions} of {questions.length} answered
                </div>
              </div>
              <Progress value={progressPercentage} className="h-2" />
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

export default QuestionForm;
