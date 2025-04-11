
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { generateChatResponse } from "@/utils/chatResponseGenerator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowUpIcon, ThumbsUp, ThumbsDown, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getKnowledgeBase } from "@/utils/knowledgeBase";

const ChatInterface = ({ botName }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({});
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { toast } = useToast();

  useEffect(() => {
    // Add welcome message
    if (messages.length === 0) {
      setMessages([{
        id: "welcome",
        role: "assistant",
        content: `Hello! I'm ${botName}. How can I help you today?`,
        timestamp: new Date()
      }]);
    }
    
    scrollToBottom();
  }, [messages, botName]);
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput("");
    setLoading(true);
    
    // Fetch the knowledge base to use in response generation
    const knowledgeBase = getKnowledgeBase();
    
    try {
      // Wait a moment to simulate processing
      setTimeout(async () => {
        const response = await generateChatResponse(input, knowledgeBase);
        
        const botResponse = {
          id: `bot-${Date.now()}`,
          role: "assistant",
          content: response,
          timestamp: new Date()
        };
        
        setMessages(prevMessages => [...prevMessages, botResponse]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error generating response:", error);
      toast({
        title: "Error",
        description: "Failed to generate a response. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const handleFeedback = (messageId, isPositive) => {
    setFeedback(prev => ({
      ...prev,
      [messageId]: isPositive
    }));
    
    toast({
      title: "Feedback Recorded",
      description: `Thank you for your ${isPositive ? "positive" : "negative"} feedback. This helps improve the AI.`,
    });
  };

  return (
    <Card className="border h-full flex flex-col">
      <CardContent className="p-4 flex flex-col h-full">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  {message.role === "assistant" && (
                    <div className="flex items-center justify-end mt-2 space-x-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className={`h-6 w-6 ${feedback[message.id] === true ? "text-green-500" : ""}`}
                        onClick={() => handleFeedback(message.id, true)}
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className={`h-6 w-6 ${feedback[message.id] === false ? "text-red-500" : ""}`}
                        onClick={() => handleFeedback(message.id, false)}
                      >
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-lg bg-muted flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <Separator className="my-4" />
        
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            disabled={loading}
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={loading || !input.trim()}
          >
            <ArrowUpIcon className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
