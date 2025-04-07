
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { mockTestQuestions } from '@/data/mockData';

export interface TestQuestion {
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

export interface TestData {
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

export const useTestData = (testId: string | undefined) => {
  const [isLoading, setIsLoading] = useState(true);
  const [test, setTest] = useState<TestData | null>(null);
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  
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
  
  return {
    isLoading,
    test,
    questions
  };
};
