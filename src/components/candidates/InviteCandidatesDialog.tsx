
import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Candidate } from '@/types/candidate';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Check } from 'lucide-react';
import { useCandidates } from '@/hooks/useCandidates';

interface InviteCandidatesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInviteSent: (candidate: Candidate) => void;
}

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  testId: z.string().min(1, { message: "Please select a test." }),
});

type FormValues = z.infer<typeof formSchema>;

const InviteCandidatesDialog: React.FC<InviteCandidatesDialogProps> = ({ 
  open, 
  onOpenChange,
  onInviteSent
}) => {
  const { session } = useAuth();
  const { tests, addCandidate } = useCandidates();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      testId: '',
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: FormValues) => {
    try {
      const selectedTest = tests.find(test => test.id === values.testId);
      const testName = selectedTest ? selectedTest.name : 'General Assessment';

      const newCandidate = await addCandidate(
        values.name, 
        values.email, 
        testName
      );

      // Simulate invitation sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Invitation sent successfully!');
      onInviteSent(newCandidate);
      
      // Reset form and close dialog
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error('Error sending invitation:', error);
      toast.error('Failed to send invitation');
    }
  };

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (open) {
      form.reset();
    }
  }, [open, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Invite Candidate</DialogTitle>
          <DialogDescription>
            Send a test invitation to a candidate. They will receive an email with a link to take the test.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Candidate Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter candidate's full name" {...field} />
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
                    <Input placeholder="candidate@example.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="testId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Test</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a test to send" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tests.map((test) => (
                        <SelectItem key={test.id} value={test.id}>
                          {test.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting ? 'Sending...' : 'Send Invitation'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteCandidatesDialog;
