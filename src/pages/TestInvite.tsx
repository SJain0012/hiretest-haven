
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import InviteForm from '@/components/candidates/InviteForm';
import { mockTests } from '@/data/mockData';

const TestInvite = () => {
  const { id } = useParams<{ id: string }>();
  const test = mockTests.find((t) => t.id === id);

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
          
          <InviteForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TestInvite;
