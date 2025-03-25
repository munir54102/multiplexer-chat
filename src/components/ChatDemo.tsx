
import { useState, useEffect } from "react";
import ChatBubble from "./ChatBubble";

export default function ChatDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  
  const conversation = [
    { content: "Hello! I'm interested in learning more about your products.", isAI: false },
    { content: "Hi there! I'd be happy to help. What specific products are you interested in?", isAI: true },
    { content: "I'm looking for a solution to automate customer support.", isAI: false },
    { content: "Great choice! Our AI chatbot can handle customer queries 24/7 across multiple platforms. Would you like to know about our pricing plans?", isAI: true },
    { content: "Yes, please tell me about your pricing options.", isAI: false },
    { content: "We offer three plans: Starter ($49/mo), Professional ($99/mo), and Enterprise (custom pricing). Each comes with different features and integration options.", isAI: true }
  ];

  useEffect(() => {
    if (currentStep < conversation.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [currentStep, conversation.length]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 max-w-md mx-auto h-[400px] flex flex-col overflow-hidden">
      <div className="bg-primary text-white p-3 rounded-t-xl">
        <h3 className="font-medium">Customer Support</h3>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4">
        {conversation.slice(0, currentStep + 1).map((message, index) => (
          <ChatBubble
            key={index}
            content={message.content}
            isAI={message.isAI}
            delay={300}
          />
        ))}
      </div>
      
      <div className="border-t p-3 bg-gray-50 rounded-b-xl">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-1 focus:ring-primary"
            disabled
          />
          <button 
            className="bg-primary text-white p-2 rounded-r-lg"
            disabled
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
