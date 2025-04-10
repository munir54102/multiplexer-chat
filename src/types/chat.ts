
export interface ChatMessage {
  id: number;
  text: string;
  sender: "bot" | "user";
  isAIGenerated?: boolean;
}

export interface AIModelConfig {
  provider: "gemini" | "openai" | "claude";
  apiKey: string;
  model: string;
  temperature: number;
  maxTokens: number;
}
