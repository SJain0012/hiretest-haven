
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CreditCard, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CreditPackage {
  id: number;
  name: string;
  credits: number;
  price: string;
  popular?: boolean;
}

interface CreditTopupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreditsPurchased: (credits: number) => void;
  currentCredits: number;
}

const creditPackages: CreditPackage[] = [
  { id: 1, name: "Small", credits: 50, price: "$49" },
  { id: 2, name: "Medium", credits: 100, price: "$89", popular: true },
  { id: 3, name: "Large", credits: 250, price: "$199" },
  { id: 4, name: "Enterprise", credits: 1000, price: "$699" }
];

const CreditTopupDialog = ({ 
  open, 
  onOpenChange, 
  onCreditsPurchased,
  currentCredits 
}: CreditTopupDialogProps) => {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const { toast } = useToast();

  const handlePurchaseCredits = () => {
    if (selectedPackage !== null) {
      const pkg = creditPackages.find(p => p.id === selectedPackage);
      if (pkg) {
        onCreditsPurchased(pkg.credits);
        toast({
          title: "Credits Added",
          description: `You've successfully added ${pkg.credits} credits to your account.`,
        });
        onOpenChange(false);
        setSelectedPackage(null);
      }
    } else {
      toast({
        title: "No Package Selected",
        description: "Please select a credit package to continue.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Purchase Credits</DialogTitle>
          <DialogDescription>
            Credits are used to create tests and send invitations to candidates.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {creditPackages.map((pkg) => (
            <div 
              key={pkg.id}
              className={`relative p-4 border rounded-lg cursor-pointer transition-all ${
                selectedPackage === pkg.id 
                  ? 'border-primary ring-2 ring-primary ring-opacity-50' 
                  : 'border-border hover:border-primary/50'
              } ${pkg.popular ? 'bg-primary/5' : ''}`}
              onClick={() => setSelectedPackage(pkg.id)}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                  Popular
                </div>
              )}
              <div className="flex flex-col gap-1">
                <h3 className="font-medium">{pkg.name} Pack</h3>
                <div className="text-2xl font-bold">{pkg.credits} <span className="text-sm font-normal">Credits</span></div>
                <div className="mt-2 font-medium">{pkg.price}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-muted p-3 rounded-md flex items-center gap-2 text-sm mt-2">
          <CreditCard className="h-4 w-4 text-primary flex-shrink-0" />
          <span>Current balance: <span className="font-medium">{currentCredits} credits</span></span>
        </div>
        
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            variant="credit" 
            onClick={handlePurchaseCredits}
            disabled={selectedPackage === null}
          >
            <Plus className="h-4 w-4 mr-1" />
            Purchase Credits
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreditTopupDialog;
