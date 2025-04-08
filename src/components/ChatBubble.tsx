
import { ReactNode } from "react";

interface ChatBubbleProps {
  content: string;
  isAI?: boolean;
  delay?: number;
  style?: "rounded" | "square" | "modern";
  primaryColor?: string;
  avatar?: ReactNode;
}

export default function ChatBubble({ 
  content, 
  isAI = false, 
  delay = 0,
  style = "rounded",
  primaryColor = "#2563eb", // blue-600
  avatar
}: ChatBubbleProps) {
  const getBubbleStyleClass = () => {
    const baseClass = `max-w-[80%] p-3 ${isAI 
      ? 'bg-gray-100 text-gray-800' 
      : 'text-white'
    }`;
      
    const styles = {
      rounded: `${baseClass} rounded-lg`,
      square: `${baseClass} rounded-sm`,
      modern: `${baseClass} ${isAI 
        ? 'rounded-tl-none rounded-tr-lg rounded-br-lg rounded-bl-lg' 
        : 'rounded-tl-lg rounded-tr-none rounded-br-lg rounded-bl-lg'
      }`
    };
    
    return styles[style] || styles.rounded;
  };

  return (
    <div 
      className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-3`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div 
        className={`${getBubbleStyleClass()} animate-chat-bubble`}
        style={{ backgroundColor: !isAI ? primaryColor : undefined }}
      >
        <div className="flex items-start">
          {isAI && avatar && <div className="mr-2 flex-shrink-0">{avatar}</div>}
          <div>{content}</div>
          {!isAI && avatar && <div className="ml-2 flex-shrink-0">{avatar}</div>}
        </div>
      </div>
    </div>
  );
}
