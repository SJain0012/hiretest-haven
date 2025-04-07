
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import QuestionProgress from './QuestionProgress';
import QuestionNavigation from './QuestionNavigation';
import MultipleChoiceQuestion from './questionTypes/MultipleChoiceQuestion';
import ScaleQuestion from './questionTypes/ScaleQuestion';
import TextQuestion from './questionTypes/TextQuestion';

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
  
  // Calculate progress
  const answeredQuestions = Object.keys(answers).length;
  
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

  const renderQuestionContent = () => {
    switch (currentQuestion.type) {
      case 'multiple_choice':
        return (
          <MultipleChoiceQuestion
            questionId={currentQuestion.id}
            options={currentQuestion.options || []}
            currentAnswer={answers[currentQuestion.id] || ''}
            onAnswerChange={handleAnswer}
          />
        );
      case 'scale':
        return (
          <ScaleQuestion
            questionId={currentQuestion.id}
            scaleMin={currentQuestion.scaleMin || 1}
            scaleMax={currentQuestion.scaleMax || 5}
            scaleLabels={currentQuestion.scaleLabels}
            currentAnswer={answers[currentQuestion.id] || null}
            onAnswerChange={handleAnswer}
          />
        );
      case 'text':
        return (
          <TextQuestion
            currentAnswer={answers[currentQuestion.id] || ''}
            onAnswerChange={handleAnswer}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="max-w-2xl w-full animate-fade-in">
        <CardContent className="pt-6">
          <div className="space-y-6">
            <QuestionProgress
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              answeredCount={answeredQuestions}
            />
            
            <div>
              <h2 className="text-xl font-medium mb-4">{currentQuestion.text}</h2>
              {renderQuestionContent()}
            </div>
            
            <QuestionNavigation
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              onPrevious={goToPreviousQuestion}
              onNext={goToNextQuestion}
              onSubmit={handleSubmit}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionForm;
