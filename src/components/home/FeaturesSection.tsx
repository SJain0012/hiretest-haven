
import React from 'react';
import { PieChart, Mail, User, Check, Search, List, ClipboardList } from 'lucide-react';

const features = [
  {
    icon: <PieChart className="h-8 w-8" />,
    title: "Insightful Analytics",
    description: "Visualize personality data with elegant charts and graphs to identify the perfect candidate fit."
  },
  {
    icon: <Mail className="h-8 w-8" />,
    title: "Automated Invitations",
    description: "Send personalized test invitations to candidates with just a few clicks."
  },
  {
    icon: <User className="h-8 w-8" />,
    title: "Candidate Profiles",
    description: "Build comprehensive profiles based on personality test results and other data points."
  },
  {
    icon: <ClipboardList className="h-8 w-8" />,
    title: "Customizable Tests",
    description: "Create personalized questionnaires tailored to your specific hiring needs."
  },
  {
    icon: <Search className="h-8 w-8" />,
    title: "Advanced Filtering",
    description: "Quickly find candidates matching specific personality traits and attributes."
  },
  {
    icon: <List className="h-8 w-8" />,
    title: "Team Collaboration",
    description: "Share insights and feedback with your team to make collective hiring decisions."
  }
];

const FeaturesSection = () => {
  return (
    <section className="w-full py-24 bg-blue-gradient-soft">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm">
              Key Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Everything You <span className="blue-gradient-text">Need</span>
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
              Our platform offers comprehensive tools to streamline your recruitment process.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mt-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="blue-card flex flex-col items-center gap-2 rounded-xl p-6 text-center"
              >
                <div className="rounded-full bg-blue-light/30 p-3 text-blue-dark">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-blue-dark">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
