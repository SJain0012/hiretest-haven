
import React from 'react';
import { Share2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import PersonalityChart from '@/components/results/PersonalityChart';
import { Candidate } from '@/types/candidate';
import { mockTraits } from '@/data/mockData';

interface ShareResultsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidate: Candidate | null;
  shareNote: string;
  setShareNote: (note: string) => void;
  onSendShare: () => void;
}

const ShareResultsDialog: React.FC<ShareResultsDialogProps> = ({
  open,
  onOpenChange,
  candidate,
  shareNote,
  setShareNote,
  onSendShare
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Results with Hiring Manager</DialogTitle>
          <DialogDescription>
            Share {candidate?.name}'s assessment results with the hiring manager for the next round.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {candidate && (
            <div className="rounded-md border p-4 bg-slate-50">
              <h4 className="font-medium mb-2">Result Preview</h4>
              <div className="h-48">
                <PersonalityChart 
                  data={mockTraits}
                  candidateName={candidate.name}
                  compact={true}
                />
              </div>
            </div>
          )}
          <Textarea 
            placeholder="Add a note to the hiring manager..."
            value={shareNote}
            onChange={(e) => setShareNote(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={onSendShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Send to Hiring Manager
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareResultsDialog;
