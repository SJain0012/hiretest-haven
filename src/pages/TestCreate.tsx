
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import TestForm from '@/components/tests/TestForm';

const TestCreate = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Link to="/tests">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Tests
              </Button>
            </Link>
          </div>
          
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight">Create New Test</h1>
            <p className="text-muted-foreground">
              Design a personality assessment for your candidates
            </p>
          </div>
          
          <TestForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TestCreate;
