
import React from "react";
import { Bot, User } from "lucide-react";
import { ChatMessage } from "@/types/chat";

interface MessageBubbleProps {
  message: ChatMessage;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  return (
    <div 
      className={`flex ${message.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`
        max-w-[80%] rounded-lg p-3 
        ${message.sender === 'bot' 
          ? 'bg-gray-100 text-gray-800' 
          : 'bg-primary text-white'
        }
      `}>
        <div className="flex items-start">
          {message.sender === 'bot' && <Bot className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />}
          <p>{message.text}</p>
          {message.sender === 'user' && <User className="h-4 w-4 ml-2 mt-1 flex-shrink-0" />}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
