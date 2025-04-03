
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import InviteForm from '@/components/candidates/InviteForm';
import { mockTests } from '@/data/mockData';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const TestInvite = () => {
  const { id } = useParams<{ id: string }>();
  const [test, setTest] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { session } = useAuth();

  useEffect(() => {
    const fetchTest = async () => {
      setIsLoading(true);
      
      try {
        if (session) {
          // TODO: Replace with actual test fetch from Supabase when tests table is available
          const foundTest = mockTests.find((t) => t.id === id);
          setTest(foundTest || null);
        } else {
          const foundTest = mockTests.find((t) => t.id === id);
          setTest(foundTest || null);
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
    if (!test) {
      toast.error('Test information is missing');
      return;
    }
    
    try {
      if (session) {
        // Process each email and add to database
        const promises = emails.map(async (email) => {
          const { error } = await supabase
            .from('Candidates')
            .insert([
              { 
                Name: email.split('@')[0], // Simple name extraction from email
                Email: email,
                Status: 'pending',
                Company: 'XYZ', // Using XYZ as requested
                testName: test.name
              }
            ]);
            
          if (error) throw error;
        });
        
        await Promise.all(promises);
      }
      
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
              Send test invitations via email
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
