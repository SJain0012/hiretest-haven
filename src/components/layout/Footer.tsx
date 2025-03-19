
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Link to="/" className="text-xl font-medium tracking-tight">
              HireTest Haven
            </Link>
            <p className="text-sm text-muted-foreground mt-2">
              Personality testing platform for modern hiring teams.
            </p>
          </div>
          
          <div className="grid gap-2">
            <h3 className="text-sm font-medium">Platform</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <Link to="/tests" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Tests
              </Link>
              <Link to="/candidates" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Candidates
              </Link>
            </nav>
          </div>
          
          <div className="grid gap-2">
            <h3 className="text-sm font-medium">Resources</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Help Center
              </Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </nav>
          </div>
          
          <div className="grid gap-2">
            <h3 className="text-sm font-medium">Contact</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact Us
              </Link>
              <span className="text-sm text-muted-foreground">
                hello@hiretesthaven.com
              </span>
            </nav>
          </div>
        </div>
        
        <div className="flex flex-col gap-4 mt-16 items-center justify-between md:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} HireTest Haven. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Twitter
            </Link>
            <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              LinkedIn
            </Link>
            <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
