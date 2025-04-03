
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { statusColorMap } from '@/types/candidate';

interface CandidateStatusProps {
  status: "pending" | "completed" | "expired";
}

const CandidateStatus: React.FC<CandidateStatusProps> = ({ status }) => {
  return (
    <Badge variant="outline" className={statusColorMap[status]}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export default CandidateStatus;
