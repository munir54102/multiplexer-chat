
import React, { useState, useEffect } from "react";
import { Bot, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { ChatMessage } from "@/types/chat";
import ChatMessageList from "@/components/chat/ChatMessageList";
import ChatInput from "@/components/chat/ChatInput";
import { generateResponse } from "@/utils/chatResponseGenerator";

interface ChatInterfaceProps {
  botName: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ botName }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, text: `Hello! I'm ${botName}. How can I help you today?`, sender: "bot" }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const resetConversation = () => {
    setMessages([
      { id: 1, text: `Hello! I'm ${botName}. How can I help you today?`, sender: "bot" }
    ]);
  };

  const handleSendMessage = (text: string) => {
    // Add user message
    const userMessage: ChatMessage = { id: messages.length + 1, text, sender: "user" };
    setMessages([...messages, userMessage]);
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Generate bot response after a delay
    setTimeout(() => {
      setIsTyping(false);
      const botResponse = generateResponse(text, botName);
      const botMessage: ChatMessage = { id: messages.length + 2, text: botResponse, sender: "bot" };
      setMessages(prev => [...prev, botMessage]);
    }, 1500);
  };

  return (
    <>
      <CardContent className="py-2">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Bot className="h-5 w-5 mr-2 text-primary" />
            <span className="font-medium">{botName}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={resetConversation}>
            <RefreshCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
        
        <ChatMessageList messages={messages} isTyping={isTyping} />
      </CardContent>
      <CardFooter className="border-t pt-4">
        <ChatInput onSendMessage={handleSendMessage} />
      </CardFooter>
    </>
  );
};

export default ChatInterface;
