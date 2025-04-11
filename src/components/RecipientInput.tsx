
import React, { useState, KeyboardEvent, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { isValidEmail } from "@/utils/email";
import { toast } from "@/components/ui/use-toast";

interface RecipientInputProps {
  recipients: string[];
  setRecipients: React.Dispatch<React.SetStateAction<string[]>>;
}

const RecipientInput: React.FC<RecipientInputProps> = ({ recipients, setRecipients }) => {
  const [inputValue, setInputValue] = useState<string>("");
  
  // Debug log
  useEffect(() => {
    console.log("Recipients in RecipientInput:", recipients);
  }, [recipients]);

  const addRecipient = (email: string) => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) return;
    
    if (!isValidEmail(trimmedEmail)) {
      toast({
        variant: "destructive",
        title: "Invalid Email",
        description: `"${trimmedEmail}" is not a valid email address.`,
      });
      return;
    }

    if (recipients.includes(trimmedEmail)) {
      toast({
        variant: "destructive",
        title: "Duplicate Email",
        description: "This recipient has already been added.",
      });
      return;
    }

    setRecipients(prev => [...prev, trimmedEmail]);
    setInputValue("");
  };

  const removeRecipient = (index: number) => {
    const newRecipients = [...recipients];
    newRecipients.splice(index, 1);
    setRecipients(newRecipients);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Add on Enter or comma
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addRecipient(inputValue);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-10 bg-background">
        {Array.isArray(recipients) && recipients.map((email, index) => (
          <Badge key={index} variant="secondary" className="flex items-center gap-1 px-2 py-1">
            {email}
            <X
              className="h-3 w-3 cursor-pointer hover:text-destructive"
              onClick={() => removeRecipient(index)}
            />
          </Badge>
        ))}
        <Input
          type="email"
          placeholder="Type email and press Enter"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
      <div className="text-xs text-muted-foreground">
        Press Enter or use commas to add multiple recipients
      </div>
    </div>
  );
};

export default RecipientInput;
