
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mail, BarChart } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  stressScore: number | null;
  satisfactionScore: number | null;
  testStatus: 'completed' | 'pending' | 'not_sent';
}

interface TeamMembersTableProps {
  members: TeamMember[];
  onInvite: (memberId: string) => void;
  onViewResults: (memberId: string) => void;
}

const TeamMembersTable: React.FC<TeamMembersTableProps> = ({
  members,
  onInvite,
  onViewResults,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'not_sent':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return '';
    }
  };

  const getScoreColor = (score: number | null) => {
    if (score === null) return 'text-gray-400';
    if (score >= 70) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Department</TableHead>
            <TableHead className="text-center">Test Status</TableHead>
            <TableHead className="text-center">Stress Score</TableHead>
            <TableHead className="text-center">Satisfaction Score</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell className="font-medium">
                <div className="flex flex-col">
                  <span>{member.name}</span>
                  <span className="text-sm text-muted-foreground">{member.email}</span>
                </div>
              </TableCell>
              <TableCell>{member.role}</TableCell>
              <TableCell>{member.department}</TableCell>
              <TableCell className="text-center">
                <Badge 
                  className={`${getStatusColor(member.testStatus)} capitalize`}
                  variant="outline"
                >
                  {member.testStatus.replace('_', ' ')}
                </Badge>
              </TableCell>
              <TableCell className={`text-center font-medium ${getScoreColor(member.stressScore)}`}>
                {member.stressScore !== null ? `${member.stressScore}%` : '-'}
              </TableCell>
              <TableCell className={`text-center font-medium ${getScoreColor(member.satisfactionScore)}`}>
                {member.satisfactionScore !== null ? `${member.satisfactionScore}%` : '-'}
              </TableCell>
              <TableCell className="text-right">
                {member.testStatus === 'completed' ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewResults(member.id)}
                  >
                    <BarChart className="mr-2 h-4 w-4" />
                    View Results
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onInvite(member.id)}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    {member.testStatus === 'pending' ? 'Resend' : 'Send Test'}
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TeamMembersTable;
