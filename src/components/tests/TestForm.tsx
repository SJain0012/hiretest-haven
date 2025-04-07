
import React, { useState } from 'react';
import { PlusCircle, X, GripVertical, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { AIQuestionGenerator } from '@/components/tests/AIQuestionGenerator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

interface Question {
  id: string;
  text: string;
  type: 'multiple_choice' | 'scale' | 'text';
  options?: string[];
  scaleMin?: number;
  scaleMax?: number;
  scaleLabels?: { min: string; max: string };
}

const TestForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { session } = useAuth();
  const [testName, setTestName] = useState('');
  const [testDescription, setTestDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addQuestion = (type: Question['type']) => {
    const newQuestion: Question = {
      id: `q-${Date.now()}`,
      text: '',
      type,
    };

    if (type === 'multiple_choice') {
      newQuestion.options = ['', ''];
    } else if (type === 'scale') {
      newQuestion.scaleMin = 1;
      newQuestion.scaleMax = 5;
      newQuestion.scaleLabels = { min: 'Strongly Disagree', max: 'Strongly Agree' };
    }

    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const updateQuestion = (id: string, field: string, value: any) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === id) {
          return { ...q, [field]: value };
        }
        return q;
      })
    );
  };

  const addOption = (questionId: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId && q.options) {
          return { ...q, options: [...q.options, ''] };
        }
        return q;
      })
    );
  };

  const updateOption = (questionId: string, index: number, value: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId && q.options) {
          const newOptions = [...q.options];
          newOptions[index] = value;
          return { ...q, options: newOptions };
        }
        return q;
      })
    );
  };

  const removeOption = (questionId: string, index: number) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId && q.options && q.options.length > 2) {
          const newOptions = [...q.options];
          newOptions.splice(index, 1);
          return { ...q, options: newOptions };
        }
        return q;
      })
    );
  };

  const handleSubmit = async (e: React.FormEvent, asDraft: boolean = false) => {
    e.preventDefault();
    
    if (!testName.trim()) {
      toast({
        title: "Required Field Missing",
        description: "Please provide a test name.",
        variant: "destructive",
      });
      return;
    }
    
    if (questions.length === 0) {
      toast({
        title: "No Questions Added",
        description: "Please add at least one question to your test.",
        variant: "destructive",
      });
      return;
    }
    
    const incompleteQuestions = questions.filter(q => !q.text.trim());
    if (incompleteQuestions.length > 0) {
      toast({
        title: "Incomplete Questions",
        description: "Please provide text for all questions.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Prepare test data
      const questionsData = JSON.stringify(questions);
      
      const testData = {
        name: testName,
        description: testDescription,
        questions: questionsData,
        questions_count: questions.length,
        status: asDraft ? 'draft' : 'active',
        // If we have a company_id in session, we could add it here
      };
      
      console.log('Saving test data:', testData);
      
      // Save to Supabase
      const { data, error } = await supabase
        .from('Tests')
        .insert([testData])
        .select()
        .single();
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Test created:', data);
      
      toast({
        title: asDraft ? "Test Saved as Draft" : "Test Created",
        description: `Your personality test "${testName}" has been ${asDraft ? 'saved as a draft' : 'created successfully'}.`,
      });
      
      // Navigate back to tests list
      navigate('/tests');
    } catch (error) {
      console.error('Error creating test:', error);
      toast({
        title: "Error Creating Test",
        description: "There was a problem saving your test. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addAIGeneratedQuestions = (generatedQuestions: Question[]) => {
    setQuestions([...questions, ...generatedQuestions]);
    setIsAIDialogOpen(false);
    
    toast({
      title: "Questions Added",
      description: `${generatedQuestions.length} AI-generated questions have been added to your test.`,
    });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-8 animate-fade-in">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="test-name">Test Name</Label>
          <Input
            id="test-name"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            placeholder="Enter test name"
            className="max-w-md"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="test-description">Description (Optional)</Label>
          <Textarea
            id="test-description"
            value={testDescription}
            onChange={(e) => setTestDescription(e.target.value)}
            placeholder="Provide a brief description of this test"
            className="max-w-md h-24"
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Questions</h2>
          <div className="flex gap-2">
            <Dialog open={isAIDialogOpen} onOpenChange={setIsAIDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Wand2 className="h-4 w-4" />
                  Generate with AI
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Generate Questions with AI</DialogTitle>
                  <DialogDescription>
                    Select personality traits you want to assess and let AI generate questions for you.
                  </DialogDescription>
                </DialogHeader>
                <AIQuestionGenerator onQuestionsGenerated={addAIGeneratedQuestions} />
              </DialogContent>
            </Dialog>
            
            <Select onValueChange={(value) => addQuestion(value as Question['type'])}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Add Question" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                <SelectItem value="scale">Scale</SelectItem>
                <SelectItem value="text">Open Text</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {questions.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center animate-pulse">
            <h3 className="mt-2 text-sm font-medium">No questions yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Get started by adding your first question
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => addQuestion('multiple_choice')}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Question
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {questions.map((question, index) => (
              <Card key={question.id} className="group relative animate-scale-in">
                <div className="absolute left-2 top-3 opacity-50 cursor-grab">
                  <GripVertical className="h-5 w-5" />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => removeQuestion(question.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <CardContent className="pt-6 pb-4 pl-10">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Question {index + 1}</Label>
                      <Textarea
                        value={question.text}
                        onChange={(e) =>
                          updateQuestion(question.id, 'text', e.target.value)
                        }
                        placeholder="Enter your question"
                      />
                    </div>

                    {question.type === 'multiple_choice' && question.options && (
                      <div className="space-y-3">
                        <Label>Options</Label>
                        {question.options.map((option, optIndex) => (
                          <div key={optIndex} className="flex items-center gap-2">
                            <Input
                              value={option}
                              onChange={(e) =>
                                updateOption(question.id, optIndex, e.target.value)
                              }
                              placeholder={`Option ${optIndex + 1}`}
                            />
                            {question.options && question.options.length > 2 && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeOption(question.id, optIndex)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addOption(question.id)}
                        >
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Add Option
                        </Button>
                      </div>
                    )}

                    {question.type === 'scale' && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Minimum Scale Label</Label>
                            <Input
                              value={question.scaleLabels?.min}
                              onChange={(e) =>
                                updateQuestion(question.id, 'scaleLabels', {
                                  ...question.scaleLabels,
                                  min: e.target.value,
                                })
                              }
                              placeholder="e.g., Strongly Disagree"
                            />
                          </div>
                          <div>
                            <Label>Maximum Scale Label</Label>
                            <Input
                              value={question.scaleLabels?.max}
                              onChange={(e) =>
                                updateQuestion(question.id, 'scaleLabels', {
                                  ...question.scaleLabels,
                                  max: e.target.value,
                                })
                              }
                              placeholder="e.g., Strongly Agree"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Min Value</Label>
                            <Input
                              type="number"
                              value={question.scaleMin}
                              onChange={(e) =>
                                updateQuestion(
                                  question.id,
                                  'scaleMin',
                                  parseInt(e.target.value)
                                )
                              }
                              min={1}
                              max={10}
                            />
                          </div>
                          <div>
                            <Label>Max Value</Label>
                            <Input
                              type="number"
                              value={question.scaleMax}
                              onChange={(e) =>
                                updateQuestion(
                                  question.id,
                                  'scaleMax',
                                  parseInt(e.target.value)
                                )
                              }
                              min={1}
                              max={10}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-2 justify-end pt-4">
        <Button 
          variant="outline" 
          type="button" 
          onClick={(e) => handleSubmit(e, true)}
          disabled={isSubmitting}
        >
          Save as Draft
        </Button>
        <Button 
          type="submit" 
          className="btn-hover"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create Test'}
        </Button>
      </div>
    </form>
  );
};

export default TestForm;
