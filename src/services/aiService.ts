
import { AIModelConfig } from "@/types/chat";

// Default configuration for Gemini
const defaultConfig: AIModelConfig = {
  provider: "gemini",
  apiKey: "",
  model: "gemini-pro",
  temperature: 0.7,
  maxTokens: 1024
};

// Get stored configuration or use default
export const getAIConfig = (): AIModelConfig => {
  const storedConfig = localStorage.getItem("aiModelConfig");
  return storedConfig ? JSON.parse(storedConfig) : defaultConfig;
};

// Save configuration
export const saveAIConfig = (config: AIModelConfig): void => {
  localStorage.setItem("aiModelConfig", JSON.stringify(config));
};

// Generate response using Gemini AI
export const generateAIResponse = async (userMessage: string, chatHistory: string): Promise<string> => {
  const config = getAIConfig();
  
  // If no API key is configured, use the fallback generator
  if (!config.apiKey) {
    console.warn("No API key configured for AI. Using fallback response generator.");
    // Import dynamically to avoid circular dependencies
    const { generateResponse } = await import("@/utils/chatResponseGenerator");
    return generateResponse(userMessage, "AI Assistant");
  }

  try {
    // For Gemini API
    if (config.provider === "gemini") {
      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + config.apiKey, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `${chatHistory}\n\nUser: ${userMessage}` }]
            }
          ],
          generationConfig: {
            temperature: config.temperature,
            maxOutputTokens: config.maxTokens,
            topP: 0.95,
          },
        }),
      });

      const data = await response.json();
      
      // Check for errors or empty responses
      if (data.error) {
        console.error("Gemini API error:", data.error);
        throw new Error(data.error.message || "Error generating AI response");
      }
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error("Empty response from Gemini API");
      }

      const textResponse = data.candidates[0].content.parts[0].text;
      return textResponse || "I'm sorry, I couldn't generate a response.";
    }
    
    // Fallback for other providers (not implemented yet)
    throw new Error(`AI provider ${config.provider} not implemented yet`);
    
  } catch (error) {
    console.error("Error generating AI response:", error);
    return "I'm sorry, there was an error generating a response. Please try again or contact support.";
  }
};
