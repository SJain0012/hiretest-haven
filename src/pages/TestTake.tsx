
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { mockTestQuestions } from '@/data/mockData';
import TestIntro from '@/components/test/TestIntro';
import QuestionForm from '@/components/test/QuestionForm';
import TestCompletion from '@/components/test/TestCompletion';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Interface for the test data from Supabase
interface TestData {
  id: string;
  name: string;
  status: string;
  description?: string;
  company_id?: number;
  created_at?: string;
  updated_at?: string;
  questions?: string;
  questions_count?: number;
}

const TestTake = () => {
  const { testId } = useParams<{ testId: string }>();
  const location = useLocation();
  const { toast: uiToast } = useToast();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [candidateId, setCandidateId] = useState<string | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [test, setTest] = useState<TestData | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cid = params.get('cid');
    if (cid) {
      setCandidateId(cid);
      fetchCandidateInfo(cid);
    }
  }, [location]);
  
  const fetchCandidateInfo = async (candidateId: string) => {
    try {
      const { data, error } = await supabase
        .from('Candidates')
        .select('*')
        .eq('id', candidateId)
        .single();
        
      if (error) throw error;
      
      if (data) {
        setCandidateName(data.Name || '');
        setCandidateEmail(data.Email || '');
      }
    } catch (error) {
      console.error('Error fetching candidate:', error);
    }
  };
  
  useEffect(() => {
    const fetchTest = async () => {
      setIsLoading(true);
      
      try {
        if (testId) {
          let { data, error } = await supabase
            .from('Tests')
            .select('*')
            .eq('id', testId)
            .single();
            
          if (error) {
            console.log('Test not found, using mock data');
            setQuestions(mockTestQuestions);
          } else if (data) {
            setTest(data as TestData);
            if (data.questions) {
              try {
                const parsedQuestions = JSON.parse(data.questions as string);
                setQuestions(parsedQuestions);
              } catch (e) {
                console.error('Error parsing questions:', e);
                setQuestions(mockTestQuestions);
              }
            } else {
              setQuestions(mockTestQuestions);
            }
          }
        } else {
          setQuestions(mockTestQuestions);
        }
      } catch (error) {
        console.error('Error fetching test:', error);
        setQuestions(mockTestQuestions);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTest();
  }, [testId]);
  
  const handleStartTest = () => {
    if (!candidateName || !candidateEmail) {
      uiToast({
        title: "Missing Information",
        description: "Please provide your name and email to start the test.",
        variant: "destructive",
      });
      return;
    }
    
    if (candidateId) {
      updateCandidateInfo();
    } else {
      createCandidateRecord();
    }
    
    setIsStarted(true);
  };
  
  const updateCandidateInfo = async () => {
    if (!candidateId) return;
    
    try {
      await supabase
        .from('Candidates')
        .update({
          Name: candidateName,
          Email: candidateEmail,
          Status: 'in-progress',
        })
        .eq('id', candidateId);
    } catch (error) {
      console.error('Error updating candidate:', error);
    }
  };
  
  const createCandidateRecord = async () => {
    if (!testId || !test) return;
    
    try {
      const { data, error } = await supabase
        .from('Candidates')
        .insert([{
          Name: candidateName,
          Email: candidateEmail,
          Status: 'in-progress',
          testName: test.name,
          test_id: testId,
        }])
        .select()
        .single();
        
      if (error) throw error;
      
      if (data) {
        setCandidateId(data.id.toString());
      }
    } catch (error) {
      console.error('Error creating candidate:', error);
    }
  };
  
  const handleSubmit = async () => {
    const results = {
      answers: answers,
      completionDate: new Date().toISOString(),
      traits: [
        { trait: "Openness", score: Math.floor(Math.random() * 100) },
        { trait: "Conscientiousness", score: Math.floor(Math.random() * 100) },
        { trait: "Extraversion", score: Math.floor(Math.random() * 100) },
        { trait: "Agreeableness", score: Math.floor(Math.random() * 100) },
        { trait: "Neuroticism", score: Math.floor(Math.random() * 100) },
      ]
    };
    
    if (candidateId) {
      try {
        await supabase
          .from('Candidates')
          .update({
            Status: 'completed',
            Completed_On: new Date().toISOString(),
            results: results
          })
          .eq('id', candidateId);
          
        toast.success('Test submitted successfully!');
      } catch (error) {
        console.error('Error saving results:', error);
        toast.error('Failed to save results');
      }
    }
    
    setIsSubmitted(true);
    
    uiToast({
      title: "Test Submitted",
      description: "Thank you for completing the personality assessment.",
    });
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-medium mb-2">Loading Test...</div>
          <div className="text-muted-foreground">Please wait while we prepare your assessment.</div>
        </div>
      </div>
    );
  }
  
  if (isSubmitted) {
    return <TestCompletion />;
  }
  
  if (!isStarted) {
    return (
      <TestIntro
        candidateName={candidateName}
        setCandidateName={setCandidateName}
        candidateEmail={candidateEmail}
        setCandidateEmail={setCandidateEmail}
        onStartTest={handleStartTest}
        testName={test?.name || 'Personality Assessment'}
      />
    );
  }
  
  return (
    <QuestionForm
      questions={questions}
      currentQuestionIndex={currentQuestionIndex}
      setCurrentQuestionIndex={setCurrentQuestionIndex}
      answers={answers}
      setAnswers={setAnswers}
      onSubmit={handleSubmit}
    />
  );
};

export default TestTake;
