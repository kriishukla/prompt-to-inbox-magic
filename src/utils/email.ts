
import { toast } from "@/components/ui/use-toast";

export interface EmailData {
  to: string[];
  subject: string;
  body: string;
}

// Function to validate email address format
export const isValidEmail = (email: string): boolean => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};

// Function to extract subject from generated email
export const extractSubject = (emailContent: string): string => {
  // Try to find "Subject:" line in the generated email
  const subjectMatch = emailContent.match(/^Subject:(.+)$/mi);
  if (subjectMatch && subjectMatch[1]) {
    return subjectMatch[1].trim();
  }
  
  // If no subject line found, extract first line as subject
  const lines = emailContent.split('\n').filter(line => line.trim() !== '');
  if (lines.length > 0) {
    return lines[0].slice(0, 100); // Use first 100 chars of first line as subject
  }
  
  return "Generated Email"; // Fallback subject
};

// Function to clean up email content
export const cleanEmailContent = (emailContent: string): string => {
  // Remove any "Subject:", "To:", "From:" lines that might be in the generated content
  return emailContent
    .replace(/^(Subject|To|From|Cc|Bcc):(.+)$/gmi, '')
    .trim();
};

// Simulate sending email (in a real app, this would connect to a backend service)
export const sendEmail = async (emailData: EmailData): Promise<boolean> => {
  try {
    console.log("Sending email to:", emailData.to);
    console.log("Subject:", emailData.subject);
    console.log("Body:", emailData.body);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show success message
    toast({
      title: "Email Sent Successfully",
      description: `Your email was sent to ${emailData.to.join(", ")}.`,
    });
    
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    toast({
      variant: "destructive",
      title: "Failed to Send Email",
      description: error instanceof Error ? error.message : "An error occurred while sending the email",
    });
    return false;
  }
};
