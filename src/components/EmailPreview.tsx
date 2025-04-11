
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { sendEmail } from "@/utils/email";
import emailjs from "emailjs-com";

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
  const [emailjsConfig, setEmailjsConfig] = useState({
    serviceId: localStorage.getItem("emailjs_service_id") || "",
    templateId: localStorage.getItem("emailjs_template_id") || "",
    userId: localStorage.getItem("emailjs_user_id") || "",
  });

  const handleConfigChange = (field: string, value: string) => {
    setEmailjsConfig(prev => {
      const updated = { ...prev, [field]: value };
      localStorage.setItem(`emailjs_${field}`, value);
      return updated;
    });
  };

  const handleSendEmail = async () => {
    if (!recipients.length || !subject || !generatedEmail) {
      toast({
        title: "Missing Fields",
        description: "Please make sure all fields are filled before sending.",
      });
      return;
    }

    if (!emailjsConfig.serviceId || !emailjsConfig.templateId || !emailjsConfig.userId) {
      toast({
        title: "EmailJS Configuration Required",
        description: "Please enter your EmailJS credentials to send emails.",
      });
      return;
    }

    setIsSending(true);

    try {
      // Send email to each recipient
      for (const recipientEmail of recipients) {
        const templateParams = {
          to_email: recipientEmail,
          subject,
          message: generatedEmail,
          from_email: "kriishukla@gmail.com", // Default sender email
        };

        await emailjs.send(
          emailjsConfig.serviceId,
          emailjsConfig.templateId,
          templateParams,
          emailjsConfig.userId
        );
      }

      toast({
        title: "Email sent!",
        description: `Your email was successfully sent to ${recipients.join(", ")}`,
      });
    } catch (error: any) {
      console.error("Error sending email:", error);
      toast({
        title: "Error sending email",
        description: error.message || "Failed to send email. Please check your EmailJS configuration.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-yellow-50 p-4 rounded border border-yellow-200 mb-4">
        <h3 className="font-medium text-sm mb-2">EmailJS Configuration</h3>
        <div className="grid gap-2">
          <div>
            <label className="text-xs">Service ID:</label>
            <Input
              value={emailjsConfig.serviceId}
              onChange={(e) => handleConfigChange("serviceId", e.target.value)}
              placeholder="EmailJS Service ID"
              className="text-sm"
            />
          </div>
          <div>
            <label className="text-xs">Template ID:</label>
            <Input
              value={emailjsConfig.templateId}
              onChange={(e) => handleConfigChange("templateId", e.target.value)}
              placeholder="EmailJS Template ID"
              className="text-sm"
            />
          </div>
          <div>
            <label className="text-xs">User ID (Public Key):</label>
            <Input
              value={emailjsConfig.userId}
              onChange={(e) => handleConfigChange("userId", e.target.value)}
              placeholder="EmailJS User ID / Public Key"
              className="text-sm"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Get your credentials from{" "}
            <a 
              href="https://dashboard.emailjs.com/admin" 
              target="_blank" 
              rel="noreferrer"
              className="text-primary underline"
            >
              EmailJS Dashboard
            </a>
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Recipients</label>
        <div className="bg-gray-100 p-2 rounded text-sm">
          {recipients && recipients.length > 0 ? recipients.join(", ") : "No recipients"}
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

      <Button onClick={handleSendEmail} disabled={isSending} className="w-full">
        {isSending ? "Sending..." : "Send Email"}
      </Button>
    </div>
  );
};

export default EmailPreview;
