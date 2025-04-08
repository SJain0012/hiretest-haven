
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
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const CandidatesList = () => {
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { session } = useAuth();
  const { candidates, isLoading, fetchCandidates } = useCandidates();

  useEffect(() => {
    console.log('CandidatesList - initial fetch');
    fetchCandidates();
  }, []);

  // Fetch again when session changes
  useEffect(() => {
    console.log('CandidatesList - session changed, fetching candidates');
    if (session) {
      fetchCandidates();
    }
  }, [session]);

  const handleInvite = () => {
    setInviteDialogOpen(true);
  };

  const onInviteSent = async (newCandidate: Candidate) => {
    console.log('Invitation sent successfully, refreshing candidates list');
    toast.success('Invitation sent successfully!');
    setInviteDialogOpen(false);
    
    // Force refresh the candidates list
    await fetchCandidates();
  };

  // Filter candidates based on search query
  const filteredCandidates = candidates.filter(candidate => {
    const searchLower = searchQuery.toLowerCase();
    return (
      candidate.name.toLowerCase().includes(searchLower) ||
      candidate.email.toLowerCase().includes(searchLower) ||
      candidate.testName.toLowerCase().includes(searchLower)
    );
  });

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
          
          {/* Search bar */}
          <div className="mt-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search candidates by name, email or test name..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="mt-8 animate-fade-in">
            {isLoading ? (
              <div className="flex items-center justify-center p-12">
                <div className="text-muted-foreground">Loading candidates...</div>
              </div>
            ) : filteredCandidates.length === 0 && searchQuery ? (
              <div className="text-center p-12 border rounded-lg bg-muted/20">
                <h3 className="text-lg font-medium">No candidates match your search</h3>
                <p className="text-muted-foreground mt-1">Try a different search term or clear your search.</p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mt-4 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Clear Search
                </button>
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
              <CandidatesTabContent candidates={filteredCandidates} />
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
