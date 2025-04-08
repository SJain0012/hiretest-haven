
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface CandidateProfileProps {
  name: string;
  email: string;
  id: string;
}

const CandidateProfile: React.FC<CandidateProfileProps> = ({
  name,
  email,
  id,
}) => {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-8 w-8">
        <AvatarImage alt={name} />
        <AvatarFallback className="text-xs">
          {name.split(' ').map(n => n[0]).join('')}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <Link to={`/dashboard?candidateId=${id}`} className="font-medium hover:underline">
          {name}
        </Link>
        <span className="text-xs text-muted-foreground">{email}</span>
      </div>
    </div>
  );
};

export default CandidateProfile;
