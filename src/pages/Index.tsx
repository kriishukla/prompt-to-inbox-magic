
import React, { useState, useEffect } from "react";
import EmailForm from "@/components/EmailForm";
import EmailPreview from "@/components/EmailPreview";
import { generateEmailWithGroq } from "@/utils/ai";
import { extractSubject, cleanEmailContent } from "@/utils/email";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [recipients, setRecipients] = useState<string[]>([]);
  const [prompt, setPrompt] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("compose");
  const [apiKey, setApiKey] = useState("");

  // Load API key from localStorage if available
  useEffect(() => {
    const savedApiKey = localStorage.getItem("groqApiKey");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  // Save API key to localStorage when it changes
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem("groqApiKey", apiKey);
    }
  }, [apiKey]);

  const handleGenerateEmail = async () => {
    setIsGenerating(true);
    
    try {
      const generatedContent = await generateEmailWithGroq(prompt, apiKey);
      
      if (generatedContent) {
        const subject = extractSubject(generatedContent);
        const cleanedContent = cleanEmailContent(generatedContent);
        
        setGeneratedEmail(cleanedContent);
        setEmailSubject(subject);
        setActiveTab("preview");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">AI Email Generator</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="compose">Compose</TabsTrigger>
          <TabsTrigger value="preview" disabled={!generatedEmail}>Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="compose">
          <EmailForm 
            recipients={recipients}
            setRecipients={setRecipients}
            prompt={prompt}
            setPrompt={setPrompt}
            onGenerate={handleGenerateEmail}
            isGenerating={isGenerating}
            apiKey={apiKey}
            setApiKey={setApiKey}
          />
        </TabsContent>
        
        <TabsContent value="preview">
          <EmailPreview 
            recipients={recipients}
            generatedEmail={generatedEmail}
            setGeneratedEmail={setGeneratedEmail}
            subject={emailSubject}
            setSubject={setEmailSubject}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
