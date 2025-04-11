
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Send, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { sendEmail } from "@/utils/email";

interface EmailPreviewProps {
  recipients: string[];
  generatedEmail: string;
  setGeneratedEmail: React.Dispatch<React.SetStateAction<string>>;
  subject: string;
  setSubject: React.Dispatch<React.SetStateAction<string>>;
}

const EmailPreview: React.FC<EmailPreviewProps> = ({
  recipients,
  generatedEmail,
  setGeneratedEmail,
  subject,
  setSubject,
}) => {
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (recipients.length === 0) {
      toast({
        variant: "destructive",
        title: "No Recipients",
        description: "Please add at least one recipient.",
      });
      return;
    }

    if (!subject.trim()) {
      toast({
        variant: "destructive",
        title: "Subject Required",
        description: "Please enter a subject for your email.",
      });
      return;
    }

    if (!generatedEmail.trim()) {
      toast({
        variant: "destructive",
        title: "Email Body Required",
        description: "Please generate or write an email body.",
      });
      return;
    }

    setIsSending(true);
    
    try {
      const result = await sendEmail({
        to: recipients,
        subject: subject,
        body: generatedEmail,
      });
      
      // If successful, you could clear form or provide additional feedback
      if (result) {
        console.log("Email sent successfully");
      }
    } finally {
      setIsSending(false);
    }
  };

  if (!generatedEmail) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Preview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="emailSubject">Subject</Label>
          <Input
            id="emailSubject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Email subject"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="emailBody">Email Body</Label>
          <Textarea
            id="emailBody"
            value={generatedEmail}
            onChange={(e) => setGeneratedEmail(e.target.value)}
            placeholder="Email content"
            className="h-64 resize-y font-mono text-sm"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSend} 
          disabled={isSending || recipients.length === 0}
          className="w-full"
        >
          {isSending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Email
              <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EmailPreview;
