
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CandidatesTabContent from '@/components/dashboard/tabs/CandidatesTabContent';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { mockCandidates } from '@/data/mockData';
import { Candidate } from '@/types/candidate';
import InviteCandidatesDialog from '@/components/candidates/InviteCandidatesDialog';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const CandidatesList = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { session } = useAuth();

  // Fetch candidates from Supabase when component mounts
  useEffect(() => {
    const fetchCandidates = async () => {
      setIsLoading(true);
      
      try {
        // If user is logged in, fetch candidates from Supabase
        if (session) {
          const { data, error } = await supabase
            .from('Candidates')
            .select('*')
            .order('created_at', { ascending: false });
          
          if (error) {
            throw error;
          }
          
          // Map Supabase data to match our Candidate type
          const mappedCandidates = data.map(candidate => ({
            id: candidate.id.toString(),
            name: candidate.Name || '',
            email: candidate.Email || '',
            status: (candidate.Status?.toLowerCase() || 'pending') as 'pending' | 'completed' | 'expired',
            testName: candidate.testName || 'General Assessment', // We'll need to add this column later
            completedDate: candidate.Completed_On || undefined,
          }));
          
          setCandidates(mappedCandidates);
        } else {
          // Use mock data if not logged in
          const typedCandidates = mockCandidates.map(candidate => ({
            ...candidate,
            status: candidate.status as "completed" | "pending" | "expired"
          })) as Candidate[];
          
          setCandidates(typedCandidates);
        }
      } catch (error) {
        console.error('Error fetching candidates:', error);
        toast.error('Failed to load candidates');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidates();
  }, [session]);

  const handleInvite = () => {
    setInviteDialogOpen(true);
  };

  const onInviteSent = (newCandidate: Candidate) => {
    setCandidates(prev => [newCandidate, ...prev]);
    toast.success('Invitation sent successfully!');
    setInviteDialogOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-8">
          <DashboardHeader
            title="Candidates"
            description="Manage test participants and view results"
            actionLink="#"
            actionText="Invite Candidates"
            onActionClick={handleInvite}
          />
          
          <div className="mt-8 animate-fade-in">
            {isLoading ? (
              <div className="flex items-center justify-center p-12">
                <div className="text-muted-foreground">Loading candidates...</div>
              </div>
            ) : (
              <CandidatesTabContent candidates={candidates} />
            )}
          </div>
          
          <InviteCandidatesDialog 
            open={inviteDialogOpen} 
            onOpenChange={setInviteDialogOpen}
            onInviteSent={onInviteSent}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CandidatesList;
