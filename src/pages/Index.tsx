
import React, { useState } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PieChart, Mail, Check, Users, TrendingUp, PiggyBank, Timer, Heart } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
});

const Index = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      console.log("Form submitted:", values);
      toast.success("Thank you for signing up! We'll be in touch soon.");
      form.reset();
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <HeroSection />
        
        {/* Culture Fit Section */}
        <section className="w-full py-24 bg-blue-gradient-soft">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm">
                  Beyond Technical Skills
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Culture Fit is the <span className="blue-gradient-text">Missing Piece</span>
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                  In the age of AI, technical skills are increasingly common. What truly sets candidates apart is how well they fit your company culture.
                </p>
              </div>
              
              <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col items-center text-center blue-card p-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-light/30 mb-4">
                    <TrendingUp className="h-8 w-8 text-blue-medium" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-dark">Higher Retention</h3>
                  <p className="mt-2 text-muted-foreground">
                    Employees who align with your culture are 47% more likely to stay with your company long-term.
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center blue-card p-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-light/30 mb-4">
                    <PiggyBank className="h-8 w-8 text-blue-medium" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-dark">Cost Efficient</h3>
                  <p className="mt-2 text-muted-foreground">
                    The average cost of a bad hire exceeds $15,000. Our platform helps you avoid this expense by identifying mismatches early.
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center blue-card p-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-light/30 mb-4">
                    <Timer className="h-8 w-8 text-blue-medium" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-dark">Time Saving</h3>
                  <p className="mt-2 text-muted-foreground">
                    Hiring managers spend an average of 23 hours per hire. Pre-screening for culture fit reduces this by up to 60%.
                  </p>
                </div>
              </div>
              
              <div className="mt-12 max-w-[800px] blue-card p-8">
                <div className="flex items-center justify-center mb-6">
                  <Users className="h-12 w-12 text-blue-medium" />
                </div>
                <h3 className="text-2xl font-bold text-blue-dark mb-4">Find Your Tribe Before Investing</h3>
                <p className="text-muted-foreground">
                  In today's competitive market, anyone can use AI to appear technically qualified. But building a cohesive team requires more than just skills—it demands personality alignment and shared values. Our objective assessment helps you identify candidates who truly belong in your organization <span className="font-semibold">before</span> investing substantial time and resources in the hiring process.
                </p>
                <div className="mt-6">
                  <Link to="/dashboard">
                    <Button className="btn-blue-gradient text-white">
                      Start Building Your Tribe
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="w-full py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm">
                  Simple Process
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  How It <span className="blue-gradient-text">Works</span>
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                  Our streamlined process makes personality testing easy for both hiring teams and candidates.
                </p>
              </div>
              
              <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="flex flex-col items-center text-center blue-card p-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-light/30 mb-4">
                    <PieChart className="h-8 w-8 text-blue-medium" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-dark">1. Create Test</h3>
                  <p className="mt-2 text-muted-foreground">
                    Build customized personality assessments with our intuitive test creator.
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center blue-card p-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-light/30 mb-4">
                    <Mail className="h-8 w-8 text-blue-medium" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-dark">2. Invite Candidates</h3>
                  <p className="mt-2 text-muted-foreground">
                    Send personalized invitations to candidates with secure test links.
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center blue-card p-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-light/30 mb-4">
                    <Check className="h-8 w-8 text-blue-medium" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-dark">3. Review Results</h3>
                  <p className="mt-2 text-muted-foreground">
                    Analyze comprehensive personality insights through intuitive visualizations.
                  </p>
                </div>
              </div>
              
              <div className="mt-16">
                <Link to="/dashboard">
                  <Button size="lg" className="btn-blue-gradient text-white">
                    Start Creating Tests
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Everything You Need - Features Section */}
        <FeaturesSection />
        
        {/* Early Adopter Sign-up Section */}
        <section className="w-full py-24 bg-blue-gradient-soft">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm">
                  <Heart className="h-4 w-4 text-blue-medium" />
                  <span>Limited Time Offer</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Join Our <span className="blue-gradient-text">Early Adopters</span>
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                  Sign up today to be notified when we launch and receive an exclusive 50% discount on any plan.
                </p>
              </div>
              
              <Card className="mt-8 w-full max-w-md border-blue-light/30 bg-white/80">
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <Badge variant="secondary" className="bg-blue-light/20 text-blue-dark px-3 py-1">
                      50% OFF for Early Adopters
                    </Badge>
                  </div>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="you@example.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full btn-blue-gradient text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            Get Early Access <Mail className="h-4 w-4" />
                          </span>
                        )}
                      </Button>
                      
                      <p className="text-xs text-muted-foreground text-center">
                        By signing up, you'll be the first to know when we launch and receive your exclusive discount code.
                      </p>
                    </form>
                  </Form>
                </CardContent>
              </Card>
              
              <div className="mt-8 flex flex-col items-center gap-2">
                <div className="flex items-center gap-1 text-sm text-blue-dark">
                  <Check className="h-4 w-4 text-blue-medium" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-blue-dark">
                  <Check className="h-4 w-4 text-blue-medium" />
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-blue-dark">
                  <Check className="h-4 w-4 text-blue-medium" />
                  <span>Priority support</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="w-full py-24 bg-blue-gradient text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Ready to Improve Your Hiring Process?
                </h2>
                <p className="mx-auto max-w-[600px] text-white/80 md:text-lg">
                  Join hundreds of companies finding their perfect candidates through better personality insights.
                </p>
              </div>
              <div className="mt-6">
                <Link to="/dashboard">
                  <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white border-white/10">
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
