
import React from 'react';
import { PieChart, Mail, Check, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import dashboardScreenshot from '@/assets/dashboard-preview.png';

const HowItWorksSection = () => {
  return (
    <section className="w-full py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm">
            Simple Process
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mt-2">
            How It <span className="blue-gradient-text">Works</span>
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg mt-4">
            Our streamlined process makes personality testing easy for both hiring teams and candidates.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Steps Column */}
          <div className="space-y-16 relative">
            {/* Vertical line connecting steps */}
            <div className="absolute left-[29px] top-[60px] w-0.5 h-[calc(100%-80px)] bg-blue-light/60" />
            
            {/* Step 1 */}
            <div className="flex gap-6 relative">
              <div className="flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-full bg-blue-light/30 z-10">
                <PieChart className="h-7 w-7 text-blue-medium" />
              </div>
              <div className="pt-1">
                <h3 className="text-xl font-bold text-blue-dark mb-2">Create Tests</h3>
                <p className="text-muted-foreground">
                  Build customized personality assessments with our intuitive test creator. 
                  Target the traits that matter most to your organization.
                </p>
              </div>
            </div>
            
            {/* Down arrow */}
            <div className="flex justify-center ml-7">
              <ArrowDown className="h-8 w-8 text-blue-light" />
            </div>
            
            {/* Step 2 */}
            <div className="flex gap-6 relative">
              <div className="flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-full bg-blue-light/30 z-10">
                <Mail className="h-7 w-7 text-blue-medium" />
              </div>
              <div className="pt-1">
                <h3 className="text-xl font-bold text-blue-dark mb-2">Invite Candidates</h3>
                <p className="text-muted-foreground">
                  Send personalized invitations to candidates with secure test links. 
                  Track responses and send reminders automatically.
                </p>
              </div>
            </div>
            
            {/* Down arrow */}
            <div className="flex justify-center ml-7">
              <ArrowDown className="h-8 w-8 text-blue-light" />
            </div>
            
            {/* Step 3 */}
            <div className="flex gap-6 relative">
              <div className="flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-full bg-blue-light/30 z-10">
                <Check className="h-7 w-7 text-blue-medium" />
              </div>
              <div className="pt-1">
                <h3 className="text-xl font-bold text-blue-dark mb-2">Review Results</h3>
                <p className="text-muted-foreground">
                  Analyze comprehensive personality insights through intuitive visualizations.
                  Make data-driven hiring decisions based on cultural alignment.
                </p>
              </div>
            </div>
          </div>
          
          {/* Dashboard Preview Column */}
          <div className="relative rounded-xl overflow-hidden shadow-2xl border border-blue-light/20">
            <div className="absolute top-0 left-0 right-0 h-10 bg-blue-light/10 flex items-center px-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
            </div>
            <div className="pt-10">
              <img 
                src={dashboardScreenshot} 
                alt="Dashboard Preview" 
                className="w-full object-cover"
                style={{ 
                  maxHeight: "600px",
                  objectPosition: "top" 
                }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-blue-dark/10 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="btn-blue-gradient text-white">
                  Try It Yourself
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
