
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, PieChart, Mail } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="w-full border-b border-border bg-white bg-opacity-70 backdrop-blur-lg fixed top-0 z-50">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-medium tracking-tight">HireTest Haven</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary/80">
            Home
          </Link>
          <Link to="/dashboard" className="text-sm font-medium transition-colors hover:text-primary/80">
            Dashboard
          </Link>
          <Link to="/tests" className="text-sm font-medium transition-colors hover:text-primary/80">
            Tests
          </Link>
          <Link to="/candidates" className="text-sm font-medium transition-colors hover:text-primary/80">
            Candidates
          </Link>
        </nav>
        
        <div className="flex items-center gap-2">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon" className="rounded-full">
              <PieChart className="h-5 w-5" />
              <span className="sr-only">Dashboard</span>
            </Button>
          </Link>
          <Link to="/messages">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Messages</span>
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
