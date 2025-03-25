
import { ReactNode } from "react";

interface ChatBubbleProps {
  content: string;
  isAI?: boolean;
  delay?: number;
}

export default function ChatBubble({ content, isAI = false, delay = 0 }: ChatBubbleProps) {
  return (
    <div 
      className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-3`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div 
        className={`max-w-[80%] p-3 rounded-2xl animate-chat-bubble ${
          isAI 
            ? 'bg-gray-100 text-gray-800 rounded-tl-none' 
            : 'bg-primary text-white rounded-tr-none'
        }`}
      >
        {content}
      </div>
    </div>
  );
}
