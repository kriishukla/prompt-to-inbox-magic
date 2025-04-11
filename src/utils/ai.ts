
import { toast } from "@/components/ui/use-toast";

// Key should be provided by user since we're focusing on a minimal frontend implementation
export const generateEmailWithGroq = async (
  prompt: string,
  apiKey: string
): Promise<string> => {
  try {
    // Simple validation
    if (!apiKey) {
      throw new Error("Groq API key is required");
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama3-8b-8192", // Using LLama3 model from Groq
        messages: [
          {
            role: "system",
            content: "You are a professional email writer. Create a well-structured, appropriate email based on the user's request."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to generate email");
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error generating email:", error);
    toast({
      variant: "destructive",
      title: "Email Generation Failed",
      description: error instanceof Error ? error.message : "Failed to generate email",
    });
    return "";
  }
};
