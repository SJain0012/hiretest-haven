
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, PlusCircle, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

interface InviteFormProps {
  onInviteSend?: (emails: string[], subject: string, message: string) => Promise<boolean>;
}

const InviteForm: React.FC<InviteFormProps> = ({ onInviteSend }) => {
  const { toast: legacyToast } = useToast();
  const [emails, setEmails] = useState<string[]>(['']);
  const [subject, setSubject] = useState('Invitation to complete a personality test');
  const [message, setMessage] = useState(
    'Hello,\n\nYou have been invited to complete a personality assessment as part of your application process. Please click the link below to begin the assessment.\n\nThank you!'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addEmailField = () => {
    setEmails([...emails, '']);
  };

  const updateEmail = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const removeEmail = (index: number) => {
    if (emails.length > 1) {
      const newEmails = [...emails];
      newEmails.splice(index, 1);
      setEmails(newEmails);
    }
  };

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validEmails = emails.filter(email => email.trim() && validateEmail(email));
    const invalidEmails = emails.filter(email => email.trim() && !validateEmail(email));
    
    if (invalidEmails.length > 0) {
      toast.error(`Invalid email addresses: ${invalidEmails.join(', ')}`);
      return;
    }
    
    if (validEmails.length === 0) {
      toast.error("Please provide at least one valid email address");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // If we have an onInviteSend callback, use it
      if (onInviteSend) {
        const success = await onInviteSend(validEmails, subject, message);
        if (!success) {
          throw new Error('Failed to send invitations');
        }
      } else {
        // Legacy toast for backward compatibility
        legacyToast({
          title: "Invitations Sent",
          description: `Successfully sent ${validEmails.length} invitation${validEmails.length > 1 ? 's' : ''}.`,
        });
      }
      
      // Reset form if successful
      setEmails(['']);
      
    } catch (error) {
      console.error('Error sending invitations:', error);
      toast.error('Failed to send invitations');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Invite Candidates</h2>
        <p className="text-muted-foreground">
          Send test invitations to candidates via email. They will receive a unique link to complete the assessment.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Candidate Email Addresses</Label>
          <div className="space-y-2 mt-2">
            {emails.map((email, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  type="email"
                  placeholder="candidate@example.com"
                  value={email}
                  onChange={(e) => updateEmail(index, e.target.value)}
                  className="flex-1"
                  disabled={isSubmitting}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeEmail(index)}
                  disabled={emails.length === 1 || isSubmitting}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addEmailField}
            className="mt-2"
            disabled={isSubmitting}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Another Email
          </Button>
        </div>
      </div>

      <Separator />
      
      <div className="space-y-4">
        <h3 className="font-medium">Email Details</h3>
        <div className="space-y-2">
          <Label htmlFor="subject">Subject Line</Label>
          <Input
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Email subject"
            disabled={isSubmitting}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter email message"
            className="h-32"
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" className="btn-hover" disabled={isSubmitting}>
          <Mail className="mr-2 h-4 w-4" />
          {isSubmitting ? 'Sending...' : 'Send Invitations'}
        </Button>
      </div>
    </form>
  );
};

export default InviteForm;
