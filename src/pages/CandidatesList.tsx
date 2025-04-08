
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CandidatesTabContent from '@/components/dashboard/tabs/CandidatesTabContent';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Candidate } from '@/types/candidate';
import InviteCandidatesDialog from '@/components/candidates/InviteCandidatesDialog';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { useCandidates } from '@/hooks/useCandidates';

const CandidatesList = () => {
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const { session } = useAuth();
  const { candidates, isLoading, fetchCandidates } = useCandidates();

  useEffect(() => {
    if (session) {
      fetchCandidates();
    }
  }, [session]);

  const handleInvite = () => {
    setInviteDialogOpen(true);
  };

  const onInviteSent = (newCandidate: Candidate) => {
    toast.success('Invitation sent successfully!');
    setInviteDialogOpen(false);
    // The candidate is already added to the list in the useCandidates hook
    // Just refresh the list to be sure
    fetchCandidates();
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
            ) : candidates.length === 0 ? (
              <div className="text-center p-12 border rounded-lg bg-muted/20">
                <h3 className="text-lg font-medium">No candidates yet</h3>
                <p className="text-muted-foreground mt-1">Invite candidates to take tests and see their results here.</p>
                <button 
                  onClick={handleInvite}
                  className="mt-4 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Invite Your First Candidate
                </button>
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
