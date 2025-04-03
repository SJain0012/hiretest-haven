
import React, { useEffect, useState } from 'react';
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
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { mockTests } from '@/data/mockData';

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
  const [tests, setTests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { session } = useAuth();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      testId: '',
    },
  });

  // Fetch tests when dialog opens
  useEffect(() => {
    if (open) {
      const fetchTests = async () => {
        if (session) {
          // TODO: Replace with actual test fetch from Supabase when tests table is available
          // For now, using mockTests
          setTests(mockTests);
        } else {
          setTests(mockTests);
        }
      };

      fetchTests();
      form.reset();
    }
  }, [open, session, form]);

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    
    try {
      const selectedTest = tests.find(test => test.id === values.testId);
      const testName = selectedTest ? selectedTest.name : 'General Assessment';

      if (session) {
        // Insert into Supabase
        const { data, error } = await supabase
          .from('Candidates')
          .insert([
            { 
              Name: values.name,
              Email: values.email,
              Status: 'pending',
              Company: 'XYZ', // Using XYZ as requested
              testName: testName // Note: We need to make sure this column exists
            }
          ])
          .select('*')
          .single();

        if (error) throw error;
        
        // Create a new candidate object to add to the UI
        const newCandidate: Candidate = {
          id: data.id.toString(),
          name: data.Name,
          email: data.Email,
          status: 'pending',
          testName: testName,
          // No completedDate for a new invitation
        };
        
        onInviteSent(newCandidate);
      } else {
        // Demo mode: create a mock candidate
        const mockCandidate: Candidate = {
          id: `mock-${Date.now()}`,
          name: values.name,
          email: values.email,
          status: 'pending',
          testName: testName,
        };
        
        onInviteSent(mockCandidate);
      }
    } catch (error) {
      console.error('Error sending invitation:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Invitation'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteCandidatesDialog;
