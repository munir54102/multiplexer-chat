
export interface ChatMessage {
  id: number;
  text: string;
  sender: "bot" | "user";
}
