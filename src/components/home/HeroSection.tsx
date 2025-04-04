
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="w-full py-24 md:py-32 hero-gradient text-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-full bg-white/20 px-3 py-1 text-sm text-white">
              Modern Recruitment Solution
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Discover the <span className="blue-gradient-text">Perfect Personality Fit</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-lg text-white/80 md:text-xl">
              Streamline your hiring process with our intuitive personality testing platform. 
              Find candidates who align with your company culture.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link to="/dashboard">
              <Button className="w-full min-[400px]:w-auto btn-blue-gradient">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" className="w-full min-[400px]:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
