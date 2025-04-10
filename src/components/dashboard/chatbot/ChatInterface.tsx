
import React, { useState, useEffect, useRef } from "react";
import { Bot, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { ChatMessage } from "@/types/chat";
import ChatMessageList from "@/components/chat/ChatMessageList";
import ChatInput from "@/components/chat/ChatInput";
import { generateAIResponse } from "@/services/aiService";

interface ChatInterfaceProps {
  botName: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ botName }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, text: `Hello! I'm ${botName}. How can I help you today?`, sender: "bot", isAIGenerated: false }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Format chat history for AI context
  const formatChatHistory = () => {
    return messages.map(msg => 
      `${msg.sender === 'bot' ? 'Assistant' : 'User'}: ${msg.text}`
    ).join('\n');
  };

  const resetConversation = () => {
    setMessages([
      { id: 1, text: `Hello! I'm ${botName}. How can I help you today?`, sender: "bot", isAIGenerated: false }
    ]);
  };

  const handleSendMessage = async (text: string) => {
    // Add user message
    const userMessage: ChatMessage = { 
      id: messages.length + 1, 
      text, 
      sender: "user" 
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate bot typing
    setIsTyping(true);
    
    try {
      // Get chat history to provide context to the AI
      const chatHistory = formatChatHistory();
      
      // Generate AI response
      const botResponse = await generateAIResponse(text, chatHistory);
      
      // Add bot message
      const botMessage: ChatMessage = { 
        id: messages.length + 2, 
        text: botResponse, 
        sender: "bot",
        isAIGenerated: true
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      // Add fallback error message
      const errorMessage: ChatMessage = {
        id: messages.length + 2,
        text: "Sorry, I encountered an error. Please try again later.",
        sender: "bot",
        isAIGenerated: false
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
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
