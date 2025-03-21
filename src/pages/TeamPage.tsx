
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { UserPlus, Search, Download } from 'lucide-react';
import TeamMembersTable from '@/components/team/TeamMembersTable';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useToast } from '@/hooks/use-toast';

// Mock data for team members
const mockTeamMembers = [
  {
    id: '1',
    name: 'Emma Johnson',
    email: 'emma.johnson@example.com',
    role: 'Product Manager',
    department: 'Product',
    stressScore: 75,
    satisfactionScore: 82,
    testStatus: 'completed' as const,
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    role: 'Senior Developer',
    department: 'Engineering',
    stressScore: 62,
    satisfactionScore: 78,
    testStatus: 'completed' as const,
  },
  {
    id: '3',
    name: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    role: 'UX Designer',
    department: 'Design',
    stressScore: 45,
    satisfactionScore: 55,
    testStatus: 'completed' as const,
  },
  {
    id: '4',
    name: 'David Rodriguez',
    email: 'david.rodriguez@example.com',
    role: 'Sales Representative',
    department: 'Sales',
    stressScore: 68,
    satisfactionScore: 72,
    testStatus: 'completed' as const,
  },
  {
    id: '5',
    name: 'Lisa Patel',
    email: 'lisa.patel@example.com',
    role: 'HR Specialist',
    department: 'Human Resources',
    stressScore: null,
    satisfactionScore: null,
    testStatus: 'pending' as const,
  },
  {
    id: '6',
    name: 'James Wilson',
    email: 'james.wilson@example.com',
    role: 'Customer Support',
    department: 'Support',
    stressScore: null,
    satisfactionScore: null,
    testStatus: 'not_sent' as const,
  },
  {
    id: '7',
    name: 'Olivia Thompson',
    email: 'olivia.thompson@example.com',
    role: 'Marketing Specialist',
    department: 'Marketing',
    stressScore: null,
    satisfactionScore: null,
    testStatus: 'not_sent' as const,
  },
];

const TeamPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [teamMembers] = useState(mockTeamMembers);

  const filteredMembers = teamMembers.filter(
    member =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInvite = (memberId: string) => {
    const member = teamMembers.find(m => m.id === memberId);
    if (member) {
      toast({
        title: "Test Invitation Sent",
        description: `Invitation sent to ${member.name} at ${member.email}`,
      });
    }
  };

  const handleViewResults = (memberId: string) => {
    console.log(`View results for team member ${memberId}`);
    // Navigate to results page
    // navigate(`/team/${memberId}/results`);
  };

  const handleAddMember = () => {
    toast({
      title: "Feature Coming Soon",
      description: "The ability to add team members will be available in the next update.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        <DashboardHeader
          title="Team Assessment"
          description="Monitor work satisfaction and stress levels across your organization"
          actionText="Add Member"
          actionLink="#"
          onTopUpClick={() => {}}
          credits={45}
        />

        <div className="mt-8">
          <Card className="p-6">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">Current Team Members</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Send assessment links to see how your team is doing
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search members..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button onClick={handleAddMember}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Member
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <TeamMembersTable
                members={filteredMembers}
                onInvite={handleInvite}
                onViewResults={handleViewResults}
              />
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              <p>
                Note: Team assessments help identify potential burnout and satisfaction issues
                early. Results are anonymized in group reports.
              </p>
            </div>
          </Card>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Understanding the Scores</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-base">Stress Score</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Measures workplace stress levels. Lower scores indicate higher stress and potential burnout risk.
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-green-500"></span>
                  <span className="text-xs">70-100: Healthy</span>
                  <span className="h-3 w-3 rounded-full bg-yellow-500 ml-3"></span>
                  <span className="text-xs">50-69: Moderate</span>
                  <span className="h-3 w-3 rounded-full bg-red-500 ml-3"></span>
                  <span className="text-xs">&lt;50: Concerning</span>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-base">Satisfaction Score</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Indicates overall job satisfaction and engagement. Higher scores reflect greater workplace happiness.
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-green-500"></span>
                  <span className="text-xs">70-100: Highly Satisfied</span>
                  <span className="h-3 w-3 rounded-full bg-yellow-500 ml-3"></span>
                  <span className="text-xs">50-69: Neutral</span>
                  <span className="h-3 w-3 rounded-full bg-red-500 ml-3"></span>
                  <span className="text-xs">&lt;50: Dissatisfied</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Benefits of Team Assessment</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                  <svg className="h-3 w-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span>Early detection of burnout risks before they impact productivity</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                  <svg className="h-3 w-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span>Identify department-specific workplace satisfaction trends</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                  <svg className="h-3 w-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span>Improve retention by addressing issues before employees consider leaving</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                  <svg className="h-3 w-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span>Create targeted wellness and workplace improvement initiatives</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                  <svg className="h-3 w-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span>Track improvement over time with regular assessment cycles</span>
              </li>
            </ul>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TeamPage;
