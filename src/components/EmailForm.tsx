import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface EmailFormProps {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  onGenerate: () => Promise<void>;
  isGenerating: boolean;
  apiKey: string;
  setApiKey: React.Dispatch<React.SetStateAction<string>>;
}

const EmailForm: React.FC<EmailFormProps> = ({
  prompt,
  setPrompt,
  onGenerate,
  isGenerating,
  apiKey,
  setApiKey,
}) => {
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      toast({
        variant: "destructive",
        title: "API Key Required",
        description: "Please enter your Groq API key to generate an email.",
      });
      return;
    }
    
    if (!prompt.trim()) {
      toast({
        variant: "destructive",
        title: "Prompt Required",
        description: "Please enter a prompt describing the email you want to generate.",
      });
      return;
    }
    
    await onGenerate();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">Groq API Key</Label>
            <Input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Groq API key"
            />
            <p className="text-xs text-muted-foreground">
              Get your API key from{" "}
              <a 
                href="https://console.groq.com/keys" 
                target="_blank" 
                rel="noreferrer"
                className="text-primary underline"
              >
                https://console.groq.com/keys
              </a>
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="prompt">Email Prompt</Label>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you want in your email. Example: Write a polite follow-up email to schedule a meeting with the marketing team."
              className="h-32 resize-y"
            />
          </div>

          <Button type="submit" disabled={isGenerating} className="w-full">
            {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isGenerating ? "Generating..." : "Generate Email"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EmailForm;
