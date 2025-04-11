import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface EmailPreviewProps {
  recipients: string[];
  generatedEmail: string;
  setGeneratedEmail: (value: string) => void;
  subject: string;
  setSubject: (value: string) => void;
}

const EmailPreview: React.FC<EmailPreviewProps> = ({
  recipients,
  generatedEmail,
  setGeneratedEmail,
  subject,
  setSubject,
}) => {
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);

  const handleSendEmail = async () => {
    if (!recipients.length || !subject || !generatedEmail) {
      toast({
        title: "Missing Fields",
        description: "Please make sure all fields are filled before sending.",
      });
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: recipients,
          subject,
          body: generatedEmail,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Email sent!",
          description: "Your email was successfully delivered.",
        });
      } else {
        toast({
          title: "Error sending email",
          description: data.error || "An unknown error occurred.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Network error",
        description: error.message || "Failed to send email.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Recipients</label>
        <div className="bg-gray-100 p-2 rounded text-sm">
          {recipients.join(", ") || "No recipients"}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Subject</label>
        <Input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Email subject"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email Body</label>
        <Textarea
          rows={10}
          value={generatedEmail}
          onChange={(e) => setGeneratedEmail(e.target.value)}
          placeholder="Generated email content"
        />
      </div>

      <Button onClick={handleSendEmail} disabled={isSending}>
        {isSending ? "Sending..." : "Send Email"}
      </Button>
    </div>
  );
};

export default EmailPreview;
