
import { useState } from "react";
import { Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LiveChatDemo = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "bot" }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const botResponses = {
    "pricing": "Our pricing starts at $29/month for the Starter plan. We also offer Professional ($79/month) and Enterprise ($199/month) plans with additional features.",
    "features": "MultiplexAI offers multi-platform integration, AI-powered responses, analytics, live agent takeover, and more!",
    "platforms": "We support WhatsApp, Facebook, Instagram, and website chat integration.",
    "trial": "Yes! We offer a 14-day free trial with no credit card required.",
    "setup": "Getting started is easy! After signing up, our onboarding wizard will guide you through connecting your first platform and training your AI.",
    "support": "We offer email support for all plans, with priority support for Professional and dedicated support managers for Enterprise customers."
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = { id: messages.length + 1, text: inputText, sender: "user" };
    setMessages([...messages, userMessage]);
    setInputText("");
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Generate bot response after a delay
    setTimeout(() => {
      setIsTyping(false);
      
      // Determine response based on user input
      let botResponse = "I'm not sure how to answer that. Please contact our support team for more information.";
      
      const lowercaseInput = inputText.toLowerCase();
      
      for (const [keyword, response] of Object.entries(botResponses)) {
        if (lowercaseInput.includes(keyword)) {
          botResponse = response;
          break;
        }
      }
      
      // If no specific response matched but it seems like a greeting
      if (lowercaseInput.match(/hi|hello|hey|greetings/i) && botResponse.includes("not sure")) {
        botResponse = "Hello there! How can I assist you today? Feel free to ask about our features, pricing, or supported platforms.";
      }
      
      setMessages(prev => [...prev, { id: prev.length + 1, text: botResponse, sender: "bot" }]);
    }, 1500);
  };

  return (
    <div className="border rounded-xl shadow-sm overflow-hidden bg-white flex flex-col h-[500px]">
      <div className="bg-primary p-4 text-white flex items-center">
        <Bot className="h-5 w-5 mr-2" />
        <h3 className="font-medium">MultiplexAI Demo Bot</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ scrollBehavior: 'smooth' }}>
        {messages.map((message) => (
          <div 
            key={message.id} 
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
                {message.sender === 'bot' && <Bot className="h-4 w-4 mr-2 mt-1" />}
                <p>{message.text}</p>
                {message.sender === 'user' && <User className="h-4 w-4 ml-2 mt-1" />}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3 flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
      </div>
      
      <div className="border-t p-4 flex gap-2">
        <Input
          placeholder="Ask about pricing, features, platforms..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1"
        />
        <Button onClick={handleSend}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default LiveChatDemo;
