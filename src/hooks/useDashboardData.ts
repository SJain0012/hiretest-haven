
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useDashboardData = (isDemoMode: boolean) => {
  const [companyName, setCompanyName] = useState<string>('');
  const [credits, setCredits] = useState<number>(isDemoMode ? 75 : 0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCompanyData = async () => {
      if (!user || isDemoMode) return;
      
      setIsLoading(true);
      try {
        // Get company name from user metadata
        const companyName = user.user_metadata.company_name;
        
        if (companyName) {
          setCompanyName(companyName);
          
          // Get company credits
          const { data, error } = await supabase
            .from('Company')
            .select('credits')
            .eq('name', companyName)
            .single();
            
          if (error) {
            console.error('Error fetching company data:', error);
          } else if (data) {
            setCredits(data.credits || 0);
          }
        }
      } catch (error) {
        console.error('Error in fetchCompanyData:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCompanyData();
  }, [user, isDemoMode]);

  const updateCredits = (addedCredits: number) => {
    setCredits(prev => prev + addedCredits);
    
    // If not in demo mode, update the database
    if (!isDemoMode && user) {
      supabase
        .from('Company')
        .update({ credits: credits + addedCredits })
        .eq('name', companyName)
        .then(({ error }) => {
          if (error) {
            toast.error('Failed to update credits in database');
            console.error('Error updating credits:', error);
          }
        });
    }
  };

  return {
    companyName,
    credits,
    isLoading,
    updateCredits
  };
};
