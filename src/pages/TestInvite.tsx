
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import InviteForm from '@/components/candidates/InviteForm';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { sendTestInvitation } from '@/utils/supabaseHelpers';

const TestInvite = () => {
  const { id } = useParams<{ id: string }>();
  const [test, setTest] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { session } = useAuth();

  useEffect(() => {
    const fetchTest = async () => {
      setIsLoading(true);
      
      try {
        if (session && id) {
          const { data, error } = await supabase
            .from('Tests')
            .select('*')
            .eq('id', id)
            .single();
            
          if (error) throw error;
          setTest(data || null);
        }
      } catch (error) {
        console.error('Error fetching test:', error);
        toast.error('Failed to load test details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTest();
  }, [id, session]);

  const handleInviteSend = async (emails: string[], subject: string, message: string) => {
    if (!test || !id) {
      toast.error('Test information is missing');
      return false;
    }
    
    try {
      // Process each email and add to database using our helper function
      const promises = emails.map(async (email) => {
        // Use the email username as a simple name
        const candidateName = email.split('@')[0];
        
        await sendTestInvitation(
          candidateName,
          email,
          test.name,
          id // Pass the test ID
        );
      });
      
      await Promise.all(promises);
      
      toast.success(`Invitations sent to ${emails.length} candidate${emails.length > 1 ? 's' : ''}`);
      return true;
    } catch (error) {
      console.error('Error sending invitations:', error);
      toast.error('Failed to send invitations');
      return false;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Link to={id ? `/tests/${id}` : '/tests'}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
          </div>
          
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight">
              Invite Candidates
              {test && `: ${test.name}`}
            </h1>
            <p className="text-muted-foreground">
              Send test invitations to candidates
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center p-12">
              <div className="text-muted-foreground">Loading test details...</div>
            </div>
          ) : (
            <InviteForm onInviteSend={handleInviteSend} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TestInvite;
