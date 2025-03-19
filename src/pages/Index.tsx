
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PieChart, Mail, Check } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <HeroSection />
        <FeaturesSection />
        
        {/* How It Works Section */}
        <section className="w-full py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm">
                  Simple Process
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  How It Works
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                  Our streamlined process makes personality testing easy for both hiring teams and candidates.
                </p>
              </div>
              
              <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <PieChart className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">1. Create Test</h3>
                  <p className="mt-2 text-muted-foreground">
                    Build customized personality assessments with our intuitive test creator.
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">2. Invite Candidates</h3>
                  <p className="mt-2 text-muted-foreground">
                    Send personalized invitations to candidates with secure test links.
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Check className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">3. Review Results</h3>
                  <p className="mt-2 text-muted-foreground">
                    Analyze comprehensive personality insights through intuitive visualizations.
                  </p>
                </div>
              </div>
              
              <div className="mt-16">
                <Link to="/dashboard">
                  <Button size="lg" className="btn-hover">
                    Start Creating Tests
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="w-full py-24 bg-primary/5">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Ready to Improve Your Hiring Process?
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-lg">
                  Join hundreds of companies finding their perfect candidates through better personality insights.
                </p>
              </div>
              <div className="mt-6">
                <Link to="/dashboard">
                  <Button size="lg" className="btn-hover">
                    Get Started Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
