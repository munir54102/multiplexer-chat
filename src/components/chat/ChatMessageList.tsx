
import React from "react";
import { ChatMessage } from "@/types/chat";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

interface ChatMessageListProps {
  messages: ChatMessage[];
  isTyping: boolean;
}

const ChatMessageList: React.FC<ChatMessageListProps> = ({ messages, isTyping }) => {
  return (
    <ScrollArea className="h-[320px] pr-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {isTyping && <TypingIndicator />}
      </div>
    </ScrollArea>
  );
};

export default ChatMessageList;
