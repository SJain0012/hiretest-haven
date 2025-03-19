
import React from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';

const PricingTier = ({ 
  name, 
  price, 
  description, 
  features, 
  buttonText, 
  buttonVariant = "default",
  popular = false 
}: { 
  name: string; 
  price: string; 
  description: string; 
  features: { name: string; included: boolean }[]; 
  buttonText: string; 
  buttonVariant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link"; 
  popular?: boolean; 
}) => {
  return (
    <Card className={`w-full max-w-sm transition-all duration-300 ${popular ? 'border-primary shadow-lg scale-105' : 'border-border'}`}>
      <CardHeader className="text-center pb-2">
        {popular && <p className="text-xs font-medium text-primary uppercase mb-2">Most Popular</p>}
        <CardTitle className="text-xl font-semibold">{name}</CardTitle>
        <div className="mt-1 mb-3">
          <span className="text-3xl font-bold">{price}</span>
          {price !== 'Custom' && <span className="text-muted-foreground ml-1">/month</span>}
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="pt-4">
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2">
              {feature.included ? (
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              ) : (
                <X className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              )}
              <span className={`text-sm ${feature.included ? '' : 'text-muted-foreground'}`}>
                {feature.name}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="pt-4">
        <Button 
          variant={buttonVariant} 
          className="w-full" 
          asChild
        >
          <Link to="/contact">{buttonText}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="container px-4 py-16 md:py-24">
          {/* Pricing Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground">
              Choose the plan that's right for your hiring team. All plans include a 14-day free trial.
            </p>
          </div>

          {/* Pricing Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <PricingTier
              name="Starter"
              price="$49"
              description="Perfect for small teams just getting started with structured hiring."
              buttonText="Start Free Trial"
              buttonVariant="outline"
              features={[
                { name: "Up to 5 team members", included: true },
                { name: "Create 3 test templates", included: true },
                { name: "Test up to 20 candidates/month", included: true },
                { name: "Basic candidate reports", included: true },
                { name: "Email support", included: true },
                { name: "Advanced analytics", included: false },
                { name: "Custom branding", included: false },
                { name: "API access", included: false },
                { name: "Dedicated account manager", included: false },
              ]}
            />

            {/* Professional Plan */}
            <PricingTier
              name="Professional"
              price="$99"
              description="Ideal for growing teams with serious hiring needs."
              buttonText="Start Free Trial"
              popular={true}
              features={[
                { name: "Up to 15 team members", included: true },
                { name: "Unlimited test templates", included: true },
                { name: "Test up to 100 candidates/month", included: true },
                { name: "Advanced candidate reports", included: true },
                { name: "Priority email support", included: true },
                { name: "Advanced analytics", included: true },
                { name: "Custom branding", included: true },
                { name: "API access", included: false },
                { name: "Dedicated account manager", included: false },
              ]}
            />

            {/* Enterprise Plan */}
            <PricingTier
              name="Enterprise"
              price="Custom"
              description="Built for organizations with large-scale hiring operations."
              buttonText="Contact Sales"
              buttonVariant="secondary"
              features={[
                { name: "Unlimited team members", included: true },
                { name: "Unlimited test templates", included: true },
                { name: "Unlimited candidates", included: true },
                { name: "Advanced candidate reports", included: true },
                { name: "24/7 priority support", included: true },
                { name: "Advanced analytics", included: true },
                { name: "Custom branding", included: true },
                { name: "API access", included: true },
                { name: "Dedicated account manager", included: true },
              ]}
            />
          </div>

          {/* FAQ/CTA Section */}
          <div className="max-w-3xl mx-auto mt-24 text-center">
            <h2 className="text-2xl font-bold mb-4">Have questions?</h2>
            <p className="text-muted-foreground mb-6">
              Our team is ready to help you find the perfect plan for your organization.
            </p>
            <Button asChild>
              <Link to="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
